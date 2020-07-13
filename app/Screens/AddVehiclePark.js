import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { createNewLocation, addparkingLocationInSystem, getAllParkingTypeList } from '../Netowrks/server';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import { getData } from '../AsyncStorage/AsyncStorage';
import ActionSheet from 'react-native-actionsheet';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class AddVehiclepark extends React.Component {

    state = {
        tableHead: ['Vehicle types', 'Capacity', 'Charge'],
        tableData: [
        ],
        flatListData: [],
        parkingChargesDtos: [],
        parking_name: '',
        parking_region: '',
        parking_address: '',
        parking_description: '',
        latitude: '',
        longitude: '',
        modalVisible: false,
        vehicle_type: '',
        capacity: '',
        charge: '',
        imageUri: '',
        imgSource: '',
        openingtime: 'Select time',
        closingtime: 'Select time',
        isDatePickerVisible: false,
        picker_status: '1',
        parking_type_name: [],
        parking_type_id: [],
        selected_park_type: '- select vehicle type -',
        selected_park_type_id: ''
    }

    componentDidMount = () => {
        getData('token', (values) => {
            if (values == null) {
                Actions.replace('login2');
            } else {
                var data = JSON.parse(values);
                this.setState({
                    isFetching: true,
                    token:data.token
                });
                getAllParkingTypeList(data.token).then((getAllParkingTypeListdata) => {
                    if (getAllParkingTypeListdata.status == 1) {

                        var parking_type_name = [];
                        var parking_type_id = [];

                        getAllParkingTypeListdata.data.map((val) => {
                            parking_type_name.push(val.parkingType);
                            parking_type_id.push(val.id);
                        });

                        parking_type_name.push('cancel');
                        parking_type_id.push(0);

                        this.setState({
                            parking_type_name: parking_type_name,
                            parking_type_id: parking_type_id,
                            isFetching: false
                        });
                    }
                }).catch((error) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        console.warn(error);
                    });
                });
            }
        });

    }

    setSelectedLatLon = (lat, lng) => {
        this.setState({
            latitude: lat,
            longitude: lng
        });
    }

    createNewLocationFunction = () => {
        createNewLocation(
            this.props.token,
            this.props.user_id,
            this.state.latitude,
            this.state.longitude,
            this.state.parking_address,
            this.state.parking_name,
            this.state.parking_region).then((value) => {
                alert(value);
            }).catch((error) => {
                console.log(error);
            });
    }

    addparkingLocationInSystemFunction = () => {
        if (this.state.parking_name=='') {
alert('Enter park name');
        } else if(this.state.parking_region==''){
            alert('Enter park region');
        }else if(this.state.parking_address==''){
            alert('Enter park address');
        }else if(this.state.selected_park_type_id==''){
            alert('Enter park type');
        }else if(this.state.longitude==''){
            alert('Enter park location');
        }else if(this.state.longitude==''){
            alert('Enter park locaion');
        }else {
            const d = {
                "images": [],
                "parkingLoc": {
                    "parkName": this.state.parking_name,
                    "parkAddress": this.state.parking_address,
                    "latitude": this.state.latitude,
                    "longitude": this.state.longitude,
                    "parkRegion": this.state.parking_region,
                    "openTime": this.state.openingtime,
                    "closeTime": this.state.closingtime,
                    "description": this.state.parking_description,
                    "parkingTypeId": Number(this.state.selected_park_type_id),
                    "parkingDetailsDtos": this.state.flatListData
                }
            }
            this.setState({
                isFetching: true
            }, () => {
                addparkingLocationInSystem(this.props.token,d.images, d.parkingLoc, (value) => {
                    this.setState({
                        isFetching: false
                    },()=>{
                       this.props.getAllParkingsLocationofAgentFunction(this.props.token)
                       Actions.pop();
                    });
                },(error)=>{
                    this.setState({
                        isFetching: false
                    },()=>{
                        console.warn('error', error);
                    });
                });
            });
        }
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    textFieldComponent = (fieldname, val, reg) => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingVertical: 5 }}>
                        {fieldname}
                    </Text>
                    {(reg == true) ?
                        <MaterialIcons name={'star'} color={'red'} />
                        :
                        null
                    }
                </View>

                <TextInput
                    value={this.state[val]}
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        borderColor: '#0099e5',
                        borderWidth: 1,
                        marginTop: 5
                    }}
                    // placeholder={'Name'}
                    onChangeText={(value) => {
                        this.setState({
                            [val]: value
                        });
                    }}
                />
            </View>
        );
    }

    textFieldComponent2 = (fieldname, val, reg, then) => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingVertical: 5 }}>
                        {fieldname}
                    </Text>
                    {(reg == true) ?
                        <MaterialIcons name={'star'} color={'red'} />
                        :
                        null
                    }
                </View>

                <TouchableOpacity onPress={then}>
                    <Text
                        value={this.state[val]}
                        style={{
                            padding: 10,
                            borderRadius: 5,
                            borderColor: '#0099e5',
                            borderWidth: 1,
                            marginTop: 5,
                            flex: 1
                        }}
                    >
                        {val}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    // addVehiclesToTable = (vehicle_type, capacity, charge) => {
    //     var array = this.state.tableData.slice();
    //     var narray = [vehicle_type, capacity, charge];
    //     array.push(narray);
    //     this.setState({
    //         tableData: array
    //     });
    // }

    addVehiclesToFlatList = (vehicle_type, capacity, monthlyRate, nightCharges, chargesType, chargesForOneHour) => {
        var array = this.state.flatListData.slice();

        var narray =
        {
            "vehicleTypeId": (vehicle_type != undefined) ? Number(vehicle_type) : '',
            "capacity": (capacity != undefined) ? Number(capacity) : '',
            "monthlyRate": (monthlyRate != undefined) ? Number(monthlyRate) : '',
            "nightCharges": (nightCharges != undefined) ? Number(nightCharges) : '',
            "chargesType": (chargesType != undefined) ? chargesType : '',
            "parkingChargesDtos": (chargesForOneHour != undefined) ? chargesForOneHour : []
        }
        array.push(narray);
        this.setState({
            flatListData: array
        });

    }

    vehicleTypeAndCapacityModel = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    backgroundColor: '#00000080',
                    opacity: 50,
                    flex: 1,
                    paddingHorizontal: 30,
                    paddingVertical: 50,
                    justifyContent: 'center'
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        // alignItems: 'center',
                        //justifyContent: 'center',
                    }}>

                        <View>
                            <View style={{ padding: 10, borderRadius: 5, backgroundColor: '#0093de', width: '100%', alignItems: 'center' }}>
                                <Text>Add Vehicle</Text>
                            </View>

                            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                {this.textFieldComponent('Vehicle type', 'vehicle_type', true)}
                                {this.textFieldComponent('Capacity', 'capacity', true)}
                                {this.textFieldComponent('Monthly rate', 'monthlyRate', true)}
                                {this.textFieldComponent('Night charges', 'nightCharges', true)}
                                {this.textFieldComponent('Charges type', 'chargesType', true)}
                                {this.textFieldComponent('Charges for 1 hour ', 'chargesForOneHour', true)}
                            </View>

                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }} style={{ padding: 10, borderRadius: 5, borderColor: '#0093de', borderTopWidth: 1, width: '45%', alignItems: 'center' }}>
                                    <Text>Cancle</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        this.addVehiclesToFlatList(this.state.vehicle_type, this.state.capacity, this.state.monthlyRate, this.state.nightCharges, this.state.chargesType, this.state.chargesForOneHour);
                                    }} style={{ padding: 10, borderRadius: 5, borderColor: '#0093de', borderTopWidth: 1, width: '45%', alignItems: 'center' }}>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View>

                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('You cancelled image picker 😟');
            } else if (response.error) {
                alert('And error occured: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    imgSource: source,
                    imageUri: response.uri
                });
            }
        });
    };

    showTimeOpenPicker = () => {
        this.setDatePickerVisibility(true, '1');
    };

    showTimeClosePicker = () => {
        this.setDatePickerVisibility(true, '0');
    };

    hideDatePicker = () => {
        this.setDatePickerVisibility(false);
    };

    setDatePickerVisibility = (value, status) => {
        this.setState({
            isDatePickerVisible: value,
            picker_status: status
        });
    }

    handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        if (this.state.picker_status == 1) {
            this.setState({
                openingtime: date.getHours() + ":" + date.getMinutes()
            });
        } else {
            this.setState({
                closingtime: date.getHours() + ":" + date.getMinutes()
            });
        }

        this.hideDatePicker();
    };

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerbar}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>

                    {this.textFieldComponent('Parking name', 'parking_name', true)}
                    {this.textFieldComponent('Region', 'parking_region', true)}
                    {this.textFieldComponent('Parking address', 'parking_address', true)}

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingVertical: 5 }}>
                                Park Type
                                </Text>
                            <MaterialIcons name={'star'} color={'red'} />
                        </View>

                        <Text
                            onPress={this.showActionSheet}
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                marginTop: 5
                            }}
                        >{this.state.selected_park_type}</Text>

                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Select Parking Type ?'}
                            options={this.state.parking_type_name}
                            cancelButtonIndex={this.state.parking_type_name.length}
                            destructiveButtonIndex={this.state.parking_type_name.length - 1}
                            onPress={(index) => {
                                if (index != this.state.parking_type_name.length - 1) {
                                    this.setState({
                                        selected_park_type: this.state.parking_type_name[index],
                                        selected_park_type_id: this.state.parking_type_id[index]
                                    });
                                } else {
                                    this.setState({
                                        selected_park_type: '- select vehicle type -',
                                        selected_park_type_id: 0,
                                    });
                                }

                            }}
                        />
                    </View>

                    {/* <TouchableOpacity style={{
                        backgroundColor: '#0099e5',
                        borderRadius: 5,
                        marginVertical: 10
                    }}
                        onPress={() => { Actions.push('locationselectmap', { setSelectedLatLon: this.setSelectedLatLon.bind(this) }) }}
                    >
                        <Text style={{
                            padding: 10,
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>Select park location on Map</Text>
                    </TouchableOpacity> */}


                    {this.textFieldComponent('Latitude', 'latitude', false)}
                    {this.textFieldComponent('Longitude', 'longitude', false)}

                    {this.textFieldComponent('Description', 'parking_description', false)}

                    {this.textFieldComponent2('Opening Time', this.state.openingtime, false, () => {
                        this.showTimeOpenPicker();
                    })}

                    {this.textFieldComponent2('Closing Time', this.state.closingtime, false, () => {
                        this.showTimeClosePicker();
                    })}

                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible}
                        mode={'time'}
                        locale={'es-ES'}
                        onConfirm={(val) => this.handleConfirm(val)}
                        onCancel={() => { this.hideDatePicker() }}
                    />

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        marginTop: 5
                    }}>
                        <Text style={{ padding: 5 }}>Vehicle types & capacities</Text>
                        <TouchableOpacity style={{
                            backgroundColor: '#0099e5',
                            borderRadius: 5
                        }}
                            onPress={() => {
                                // this.setModalVisible(true);
                                Actions.push('addvehicleparksubview', { 'addVehiclesToFlatList': this.addVehiclesToFlatList.bind(this) });
                            }}
                        >
                            <FontAwesome name={'plus'} size={16} style={{ marginHorizontal: 20, marginVertical: 5 }} />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 5 }}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                        </Table>
                    </View> */}

                    <FlatList
                        data={this.state.flatListData}
                        renderItem={(value) => {
                            return (
                                <View style={{ padding: 5, borderBottomWidth: 0.5, borderColor: '#0099e5' }}>
                                    <Text>Vehicle type : {value.item.vehicleTypeId}</Text>
                                    <Text>Capacity : {value.item.capacity}</Text>
                                    <Text>Monthly Rate : {value.item.monthlyRate}</Text>
                                    <Text>Night Charges : {value.item.nightCharges}</Text>
                                    <Text>Charges Type :{value.item.chargesType}</Text>
                                    <Text>Charges for 1 hour :{value.item.parkingChargesDtos[0].charges}</Text>
                                </View>
                            );
                        }}
                    />

                    <Text style={{ paddingVertical: 10 }}>Parking image</Text>

                    <TouchableOpacity
                        onPress={() => {
                            this.pickImage();
                        }}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        {(this.state.imgSource != '') ?
                            <ImageBackground
                                style={{ height: 180, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                                source={this.state.imgSource}
                                imageStyle={{ borderRadius: 5 }}
                            >
                                <Text style={{ padding: 5, color: 'white' }}>Select Park Image</Text>
                                <FontAwesome name='image' size={40} color='#fff' />
                            </ImageBackground>
                            :
                            <ImageBackground
                                style={{ height: 180, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                                source={require('../Images/Placeholder.jpg')}
                                resizeMode={'contain'}
                                imageStyle={{ borderRadius: 5 }}
                            >
                            </ImageBackground>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: '#0099e5',
                        borderRadius: 5,
                        marginBottom: 20,
                        marginTop: 10
                    }}
                        onPress={() => {
                            //this.createNewLocationFunction();
                            this.addparkingLocationInSystemFunction();
                        }}
                    >
                        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>SAVE MY PARKING SPACE</Text>
                    </TouchableOpacity>

                    {this.vehicleTypeAndCapacityModel()}
                </ScrollView>
                {(this.state.isFetching == true) ?
                    <ActivityIndicatorView />
                    :
                    null
                }
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
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});