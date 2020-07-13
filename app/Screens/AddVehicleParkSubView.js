import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { createNewLocation, addparkingLocationInSystem, getVehicleTypeList } from '../Netowrks/server';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FlatList } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-actionsheet';
import { getData } from '../AsyncStorage/AsyncStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class AddVehicleParkSubView extends React.Component {

    state = {
        tableHead: ['Hours', 'Charge'],
        tableData: [
        ],
        flatListData: [],
        parkingChargesDtos: [],
        modalVisible: false,
        capacity: '',
        selected_vehicle_type: '- select vehicle type -',
        selected_vehicle_type_id: '- select vehicle type id -',
        vehicle_type: ['BIKE', 'CAR', 'VAN', 'cancel'],
        vehicle_type_id: [],
        hours: '',
        charge: '',
        chagers_type:['PERHOUR','SLOTS','cancel'],
        selected_charges_type: '- select charges type -',
    }

    componentDidMount = () => {
        getData('token', (values) => {
            if (values == null) {
                Actions.login2();
            } else {
                var data = JSON.parse(values);
                this.setState({
                    token: data.token,
                }, () => {
                    this.getVehicleTypeListFunction();
                    if (this.props.type == 'update') {
                        this.setState({
                            vehicle_number: this.props.data.vehicleNo,
                            selected_vehicle_type: this.props.data.vehicleType,
                            selected_vehicle_type_id: this.props.data.id,
                            checkbox: this.props.data.isDefault,
                            id: this.props.data.id
                        });
                    }
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
        const d = {
            "images": [
                {}
            ],
            "parkingLoc": {
                "parkName": this.state.parking_name,
                "parkAddress": this.state.parking_address,
                "latitude": this.state.latitude,
                "longitude": this.state.longitude,
                "parkRegion": this.state.parking_region,
                "openTime": this.state.openingtime,
                "closeTime": this.state.closingtime,
                "description": this.state.parking_description,
                "parkingTypeId": 2,
                "parkingDetailsDtos": this.state.flatListData
            }
        }
        //   alert(JSON.stringify(d.parkingLoc));
        addparkingLocationInSystem(this.props.token, [], d.parkingLoc);
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
                        marginTop: 5,
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

    addVehiclesToFlatList = (vehicle_type, capacity, monthlyRate, nightCharges, chargesType, chargesForOneHour) => {
        var array = this.state.flatListData.slice();

        var narray =
        {
            "vehicleTypeId": Number(vehicle_type),
            "capacity": Number(capacity),
            "monthlyRate": Number(monthlyRate),
            "nightCharges": Number(nightCharges),
            "chargesType": chargesType,
            "parkingChargesDtos": this.state.parkingChargesDtos
        }
        array.push(narray);
        this.setState({
            flatListData: array
        }, () => {
            Actions.pop({ data: this.state.flatListData });
        });
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    showActionSheet2 = () => {
        this.ActionSheet2.show()
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
                this.setState({
                    isFetching:false
                },()=>{
                    console.warn(error);
                });
            });
        });

    }

    vehicleHourlyChagersModel = () => {
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
                                <Text>Add Charges</Text>
                            </View>

                            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                                {this.textFieldComponent('Hour', 'hours', true)}
                                {this.textFieldComponent('Charge', 'charge', true)}
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
                                        this.addVehiclesToTable(this.state.hours, this.state.charge);
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

    addVehiclesToTable = (hours, charge) => {
        var array = this.state.tableData.slice();
        var array2 = this.state.parkingChargesDtos.slice();
        var narray = [hours, charge];

        var dd = {
            "hours": Number(hours),
            "charges": Number(charge)
        }

        array.push(narray);
        array2.push(dd);
        this.setState({
            tableData: array,
            parkingChargesDtos:array2
        });
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerbar}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={{ marginHorizontal: 10, marginBottom: 10, marginTop: 5 }}>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingVertical: 5 }}>
                                    Vehicle type
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
                            >{this.state.selected_vehicle_type}</Text>

                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={'Select vehicle type ?'}
                                options={this.state.vehicle_type}
                                cancelButtonIndex={this.state.vehicle_type.length}
                                destructiveButtonIndex={this.state.vehicle_type.length - 1}
                                onPress={(index) => {
                                    if (index != this.state.vehicle_type.length - 1) {
                                        this.setState({
                                            selected_vehicle_type: this.state.vehicle_type[index],
                                            selected_vehicle_type_id: this.state.vehicle_type_id[index]
                                        });
                                    } else {
                                        this.setState({
                                            selected_vehicle_type: '- select vehicle type -',
                                            selected_vehicle_type_id: 0,
                                        });
                                    }

                                }}
                            />
                        </View>

                        {this.textFieldComponent('Capacity', 'capacity', true)}
                        {this.textFieldComponent('Monthly rate', 'monthlyRate', true)}
                        {this.textFieldComponent('Night charges', 'nightCharges', true)}

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ paddingVertical: 5 }}>
                                    Charges type
                                </Text>
                                <MaterialIcons name={'star'} color={'red'} />
                            </View>

                            <Text
                                onPress={this.showActionSheet2}
                                style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    borderColor: '#0099e5',
                                    borderWidth: 1,
                                    marginTop: 5
                                }}
                            >{this.state.selected_charges_type}</Text>

                            <ActionSheet
                                ref={o => this.ActionSheet2 = o}
                                title={'Select vehicle type ?'}
                                options={this.state.chagers_type}
                                cancelButtonIndex={this.state.chagers_type.length}
                                destructiveButtonIndex={this.state.chagers_type.length - 1}
                                onPress={(index) => {
                                    if (index != this.state.chagers_type.length - 1) {
                                        this.setState({
                                            selected_charges_type: this.state.chagers_type[index],
                                        });
                                    } else {
                                        this.setState({
                                            selected_charges_type: '- select charges type -',
                            
                                        });
                                    }

                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: "space-between",
                            marginTop: 10
                        }}>
                            <Text style={{ padding: 5 }}>Add Charge per Hourly</Text>
                            <TouchableOpacity style={{
                                backgroundColor: '#0099e5',
                                borderRadius: 5
                            }}
                                onPress={() => {
                                    this.setModalVisible(true);
                                }}
                            >
                                <FontAwesome name={'plus'} size={16} style={{ marginHorizontal: 20, marginVertical: 5 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                                <Rows data={this.state.tableData} textStyle={styles.text} />
                            </Table>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <TouchableOpacity
                            onPress={() => {
                                Actions.pop();
                            }} style={{
                                padding: 10,
                                borderRadius: 5,
                                backgroundColor: '#0093de',
                                // borderWidth: 1, 
                                width: '45%',
                                marginHorizontal: 5,
                                alignItems: 'center'
                            }}>
                            <Text>Cancle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.addVehiclesToFlatList(this.state.selected_vehicle_type_id, this.state.capacity, this.state.monthlyRate, this.state.nightCharges, this.state.selected_charges_type, this.state.parkingChargesDtos);
                                Actions.pop();
                            }} style={{
                                padding: 10,
                                borderRadius: 5,
                                backgroundColor: '#0093de',
                                // borderTopWidth: 1, 
                                width: '45%',
                                marginHorizontal: 5,
                                alignItems: 'center'
                            }}>
                            <Text>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {this.vehicleHourlyChagersModel()}
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