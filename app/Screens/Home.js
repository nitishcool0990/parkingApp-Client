import React from 'react';
import { Platform, SafeAreaView, View, StyleSheet, Text, Dimensions, FlatList, TextInput, Image, TouchableOpacity, Modal, Linking } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, Coordinate } from 'react-native-maps';
import TabbarComponent from '../Components/TabbarComponent';
import Geolocation from 'react-native-geolocation-service';
import { getVehicleTypeList, searchParkLocation } from '../Netowrks/server';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';
import { getData } from '../AsyncStorage/AsyncStorage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Home extends React.Component {

  state = {
    // region: {
    //   latitude: 37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // },
    region: {},
    selectedLocation: '',
    modalVisible: false,
    vehiclelist: [
      {
        name: 'car'
      },
      {
        name: 'van'
      },
      {
        name: 'bus'
      }],
    token: '',
    locationList: [],
    vehicle_type: [],
    vehicle_type_id: [],
    selectedVehicleId: '',
    selectedLat: '3.7.88',
    selectedLon: '1.2.33'
  }

  onRegionChange = (region) => {
    this.setState({ region });
  }

  toggleModal = (visible) => {
    this.setState({ modalVisible: visible });
  }

  getCurrentLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.warn(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => { } },
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ loading: true }, () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({ location: position, loading: false });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error, loading: false });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
        },
      );
    });
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        (position) => {
          this.setState({ location: position });
          console.log(position);
        },
        (error) => {
          this.setState({ location: error });
          console.log(error);
        },
        {
          enableHighAccuracy: this.state.highAccuracy,
          distanceFilter: 50,
          interval: 5000,
          fastestInterval: 2000,
          forceRequestLocation: this.state.forceLocation,
          showLocationDialog: this.state.showLocationDialog,
          useSignificantChanges: this.state.significantChanges,
        },
      );
    });
  };

  removeLocationUpdates = () => {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.setState({ updatesEnabled: false });
    }
  };

  searchLocation = () => {
    searchParkLocation(this.state.token, this.state.selectedLat, this.state.selectedLon, this.state.selectedVehicleId).then((value) => {

      // var region = {
      //   latitude: value.data[0].latitude,
      //   longitude: value.data[0].longitude,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // }

      // this.setState({
      //   locationList: value.data,
      //   region: region
      // });
    });
  }

  getVehicleTypeListFunction = () => {
    this.setState({
      isFetching: true
    }, () => {
      getVehicleTypeList(this.state.token).then((values) => {
        if (values.status == 1) {

          var vehicle_type_name = [];
          var vehicle_type_id = [];

          values.data.map((val) => {
            vehicle_type_name.push(val.vehicleName);
            vehicle_type_id.push(val.id);
          });

          vehicle_type_name.push('cancel');
          vehicle_type_id.push(0);

          this.setState({
            vehicle_type: vehicle_type_name,
            vehicle_type_id: vehicle_type_id,
            isFetching: false
          });
        }
      }).catch((error) => {
        alert(error);
      });
    });

  }

  setAccuracy = (value) => this.setState({ highAccuracy: value });
  setSignificantChange = (value) =>
    this.setState({ significantChanges: value });
  setLocationDialog = (value) => this.setState({ showLocationDialog: value });
  setForceLocation = (value) => this.setState({ forceLocation: value });

  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.warn(position.coords);

        var location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }

        this.setState({
          region: location
        });
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    getData('token', (values) => {
      if (values == null) {
        Actions.login2();
      } else {
        var data = JSON.parse(values);
        this.setState({
          token: data.token,
        }, () => {
          this.getVehicleTypeListFunction();
        });

      }
    });

  }

  render = () => {
    return (
      <SafeAreaView style={styles.safe}>
        {/* <View style={styles.headerview}>
          <Text style={styles.headertext}>
            Vpark
                    </Text>
        </View> */}
        {/* <View style={styles.headerbar}>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white' }}>Welcome Mr. ABC</Text>
          <TouchableOpacity onPress={() => { Actions.push('account') }}>
            <Image
              source={require('../Images/profile.png')}
              resizeMode={'contain'}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
        </View> */}

        <View style={styles.headerbar2}>
          <TouchableOpacity onPress={() => { }}>
            {/* <FontAwesome name={'chevron-left'} size={25} color={'white'} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.drawerOpen(); }}>
            <FontAwesome name={'bars'} size={30} color={'white'} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{
            padding: 10,
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#32a852',
            marginHorizontal: 2,
            elevation: 3
          }}>
            <Text style={{ color: 'white' }}>Daily</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            padding: 10,
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#32a852',
            marginHorizontal: 2,
            elevation: 3
          }}>
            <Text style={{ color: 'white' }}>Monthly</Text>
          </TouchableOpacity>
        </View>

        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
        //  onRegionChange={this.onRegionChange}
        >
          <Marker
            draggable
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude,
            }}
            showsUserLocation={true}
            onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
            title={'Your Location'}
            description={'This is a description of the marker'}
            onPress={() => {
              //Actions.push('parkdetails');
            }}
          />

          {
            (this.state.locationList.length != 0) ?
              (this.state.locationList.map((value) => {
                console.warn(JSON.stringify(value));
                return (
                  <Marker
                    draggable
                    coordinate={{
                      latitude: value.latitude,
                      longitude: value.longitude,
                    }}
                    showsUserLocation={true}
                    onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                    title={value.parkName}
                    description={value.parkAddress}
                    onPress={() => {
                      Actions.push('parkdetails', {});
                    }}
                  />
                );
              }
              ))
              :
              null
          }

        </MapView>
        {/* <View style={styles.searchbox}>
          <TouchableOpacity>
            <FontAwesome name='search' size={35} color={'white'} />
          </TouchableOpacity>
          <TextInput
            placeholder={'Select Location'}
            placeholderTextColor={'white'}
            value={this.state.selectedLocation}
            onChangeText={(value) => {
              this.setState({
                selectedLocation: value
              });
            }}
            style={styles.searchtextinput}
          />
          <TouchableOpacity
            onPress={() => { this.toggleModal(true) }}
            style={styles.vehiclebtntouchable}
          >
            <Image
              source={require('../Images/btn_car.png')}
              resizeMode={'center'}
              style={styles.vehiclebtn} />
          </TouchableOpacity>
        </View> */}

        {/* <View style={{
          backgroundColor: "white",
          position: 'absolute',
          top: 100,
          left: 0,
          right: 0,
          elevation: 3,
          marginHorizontal: 20,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <GooglePlacesAutocomplete
            placeholder='Search Location'
            // minLength={2} // minimum length of text to search
            //autoFocus={false}
            fetchDetails={true}
            listViewDisplayed='auto'
            keyboardShouldPersistTaps={'always'}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log(data, details);
              console.warn("1 " + JSON.stringify(data))
              console.warn("2 " + JSON.stringify(details.geometry.location))

              var location = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }

              this.setState({
                region: location,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              });
            }}
            query={{
              key:'AIzaSyBEvdNm2qFkHRcs7WJ9g4EoBv_wA3k3OO4',
              language: 'en',
              types: 'geocode'
            }}
            onFail={error => console.error(error)}
            currentLocation={true}
            currentLocationLabel='Current location'

          />
        </View> */}

        <View style={styles.searchbox2}>
          <Text style={{
            color: 'black',
            fontSize: 18,
            padding: 5
          }}>Where do you need to park ?</Text>

          <View style={{
            marginHorizontal: 20,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: 'black',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10
          }}>
            <TouchableOpacity onPress={() => { this.searchLocation(this.state.selectedLocation) }}>
              <FontAwesome name='search' size={35} color={'balck'} />
            </TouchableOpacity>

            {/* <TextInput
              placeholder={'Select Location'}
              placeholderTextColor={'balck'}
              value={this.state.selectedLocation}
              onChangeText={(value) => {
                this.setState({
                  selectedLocation: value
                });
              }}
              style={styles.searchtextinput}
            /> */}
            <GooglePlacesAutocomplete
            placeholder='Search Location'
            // minLength={2} // minimum length of text to search
            //autoFocus={false}
            fetchDetails={true}
            listViewDisplayed='auto'
            keyboardShouldPersistTaps={'always'}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log(data, details);
              console.warn("1 " + JSON.stringify(data))
              console.warn("2 " + JSON.stringify(details.geometry.location))

              var location = {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }

              this.setState({
                region: location,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              });
            }}
            query={{
              key:'AIzaSyBEvdNm2qFkHRcs7WJ9g4EoBv_wA3k3OO4',
              language: 'en',
              types: 'geocode'
            }}
            onFail={error => console.error(error)}
            currentLocation={true}
            currentLocationLabel='Current location'
            styles={{
              textInputContainer: {
                backgroundColor: 'rgba(0,0,0,0)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: '#5d5d5d',
                fontSize: 16,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />

            <TouchableOpacity
              onPress={() => { this.toggleModal(true) }}
              style={styles.vehiclebtntouchable}
            >
              <Image
                source={require('../Images/btn_car.png')}
                resizeMode={'center'}
                style={styles.vehiclebtn} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{
              alignItems: 'center',
              flex: 1,
              padding: 5,
              borderColor: 'black',
              borderWidth: 0.2
            }}>
              <Text style={{ fontWeight: 'bold' }}>Entrance</Text>
              <Text style={{ color: 'blue' }}>Today 10:00 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              alignItems: 'center',
              flex: 1,
              padding: 5,
              borderColor: 'black',
              borderWidth: 0.2
            }}>
              <Text style={{ fontWeight: 'bold' }}>Exit</Text>
              <Text style={{ color: 'blue' }}>Today 11:00 AM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TabbarComponent />

        <Modal
          animationType="fade" //slide
          //transparent={false}
          visible={this.state.modalVisible} //
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}
          transparent={true}
        >
          <View style={{
            backgroundColor: '#00000080',
            opacity: 50,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              width: '90%',
              height: '80%',
              alignItems: 'center',
            }}>

              <View style={{ marginTop: 10 }}>
                <FlatList
                  style={{ flex: 1 }}
                  data={this.state.vehicle_type}
                  numColumns={2}
                  renderItem={(value) => {
                    return (
                      <TouchableOpacity style={{
                        height: 100,
                        elevation: 4,
                        backgroundColor: '#0099e5',
                        width: windowWidth * 0.4,
                        margin: 1,
                        borderRadius: 5,
                        alignItems: 'center'
                      }} onPress={() => {
                        this.setState({
                          selectedVehicle: value.item,
                          selectedVehicleId: this.state.vehicle_type_id[value.index]
                        }, () => {
                          this.toggleModal(false)
                        });
                      }}>
                        <Text style={{ textAlign: 'center', padding: 5 }}>{value.item}</Text>
                        <Image
                          source={require('../Images/btn_car.png')}
                          resizeMode={'center'}
                          style={{ width: 90, height: 90 }} />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(value) => {

                  }}
                />
                <TouchableOpacity
                  onPress={() => { this.toggleModal(false) }}
                  style={{ marginBottom: 25 }}
                >
                  <Text style={{ textAlign: 'center' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerview: {
    position: 'absolute',
    borderRadius: 255,
    left: -windowWidth * 1.45 / 6.5,
    marginTop: -windowWidth - 30,
    width: windowWidth * 1.45,
    height: windowWidth * 1.45,
    backgroundColor: '#0099e5',
    alignItems: 'center',
    elevation: 4,
    zIndex: 100
  },
  headertext: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 15,
    fontSize: 25,
    color: 'white',
    textShadowRadius: 1,
    textShadowColor: 'white',
    elevation: 4
  },
  headerbar: {
    flexDirection: 'row',
    marginTop: 5,
    width: windowWidth,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    zIndex: 200
  },
  headerbar2: {
    flexDirection: 'row',
    backgroundColor: '#0099e5',
    padding: 5,
    width: windowWidth,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 4,
    zIndex: 200,
    justifyContent: 'space-between'
  },
  searchbox: {
    position: 'absolute',
    width: '90%',
    height: windowHeight * 0.112,
    backgroundColor: 'white',
    bottom: windowHeight * 0.12,
    left: '5%',
    right: '5%',
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 50,
    backgroundColor: '#0099e5'
  },
  searchbox2: {
    backgroundColor: 'white'
  },
  vehiclebtn: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    elevation: 4,
    //backgroundColor: 'white',
    borderRadius: 60
  },
  vehiclebtntouchable: {
    backgroundColor: 'white',
    borderRadius: 50
  },
  searchtextinput: {
    //textAlign: 'center', 
    marginLeft: 10,
    flex: 1,
    fontSize: 20,
    padding: 5
  },
  safe: {
    flex: 1,
    backgroundColor: '#0099e5'
  }
});