import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import { createNewLocation } from '../Netowrks/server';

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
        parking_name: '',
        parking_region: '',
        parking_address: '',
        latitude: '',
        longitude: '',
        modalVisible: false,
        vehicle_type: '',
        capacity: '',
        charge: '',
        imageUri: '',
        imgSource: '',
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

    addVehiclesToTable = (vehicle_type, capacity, charge) => {
        var array = this.state.tableData.slice();
        var narray = [vehicle_type, capacity, charge];
        array.push(narray);
        this.setState({
            tableData: array
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
                                        this.addVehiclesToTable(this.state.vehicle_type, this.state.capacity, this.state.charge);
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

                    <TouchableOpacity style={{
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
                    </TouchableOpacity>

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
                                this.setModalVisible(true);
                            }}
                        >
                            <FontAwesome name={'plus'} size={16} style={{ marginHorizontal: 20, marginVertical: 5 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                        </Table>
                    </View>

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
                            this.createNewLocationFunction();
                        }}
                    >
                        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>SAVE MY PARKING SPACE</Text>
                    </TouchableOpacity>

                    {this.vehicleTypeAndCapacityModel()}
                </ScrollView>
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