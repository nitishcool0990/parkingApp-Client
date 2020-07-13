import React from 'react';
import { View, TextInput, TouchableOpacity, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Coordinate } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Actions } from 'react-native-router-flux';

navigator.geolocation = require('@react-native-community/geolocation');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class LocationSelecterMap extends React.Component {

    state = {
        region: {},
        selectedRegision: '',
        latitude: '',
        longitude: ''
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerbar}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={this.state.region}
                    //  onRegionChange={this.onRegionChange}
                    >
                        {/* <Marker
                        draggable
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}
                        showsUserLocation={true}
                        onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Your Location'}
                        description={'This is a description of the marker'}
                        onPress={() => {
                            //Actions.push('parkdetails');
                        }}
                    /> */}

                    </MapView>

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
                    <TextInput
                        placeholder={'Enter Region You want'}
                        style={{
                            padding: 15,
                            flex: 1
                        }}
                        onChangeText={(value) => {
                            this.setState({
                                selectedRegision: value
                            });
                        }}
                        value={this.state.selectedRegision}
                    />

                    <TouchableOpacity onPress={() => {

                    }}>
                        <FontAwesome name={'search'} size={25} style={{ padding: 10 }} />
                    </TouchableOpacity>
                </View> */}

                    <View style={{
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
                            placeholder='Search'
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
                                key: 'AIzaSyBEvdNm2qFkHRcs7WJ9g4EoBv_wA3k3OO4',
                                language: 'en',
                                types: 'geocode'
                            }}
                            onFail={error => console.error(error)}
                            currentLocation={true}
                            currentLocationLabel='Current location'

                        />
                    </View>

                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 100,
                        left: 0,
                        right: 0,
                        backgroundColor: '#0099e5',
                        marginHorizontal: 30,
                        borderRadius: 5,
                        elevation: 3
                    }}
                        onPress={() => {
                            this.props.setSelectedLatLon(this.state.latitude, this.state.longitude);
                            Actions.pop();
                        }}
                    >
                        <Text style={{ padding: 10, textAlign: 'center', color: 'white' }}>Add Location</Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5'
    },
    headerbar: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200
    }
});