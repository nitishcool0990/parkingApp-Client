import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { findAllVehicles, deleteVehicle_new } from '../Netowrks/server';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Vehicles extends React.Component {

    state = {
        vehiclelist: [
            {
                vehicle_no: '123123123',
                category: 'Car',

            },
            {
                vehicle_no: '123123123',
                category: 'Car',

            },
            {
                vehicle_no: '123123123',
                category: 'Car',

            }
        ],
    }

    componentDidMount = () => {
        this.findAllVehiclesFunction();
    }

    findAllVehiclesFunction = () => {
        this.setState({
            isFetching: true
        }, () => {
            findAllVehicles(this.props.token, this.props.user_id, "", "").then((value) => {
                if (value.status == 1) {
                    this.setState({
                        vehiclelist: value.data,
                        isFetching: false
                    });

                } else {
                    alert("status :" + value.status + "-" + value.message);
                }
            }).catch((error) => {
                alert(error)
            })
        });

    }

    btnView = (name, sub, onPress) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    padding: 25,
                    backgroundColor: '#0099e5',
                    borderRadius: 5,
                    marginVertical: 2,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View>
                    <Text style={{ color: 'white', fontSize: 18 }}>{name}</Text>
                    <Text style={{ color: 'white', fontSize: 14, marginTop: 5 }}>{sub}</Text>
                </View>
                <FontAwesome name={'angle-right'} size={30} color={'white'} />
            </TouchableOpacity>
        );
    }

    deleteVehicle = (id) => {
        Alert.alert(
            'Are you sure to you want to delete this vehicle',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        this.setState({
                            isFetching: true
                        }, () => {
                            deleteVehicle_new(this.props.token, id).then((values) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    if (values.status == 1) {
                                        this.findAllVehiclesFunction();
                                    }
                                });
                            }).catch((error) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    alert(error);
                                });
                            });
                        });
                    }
                }
            ],
            { cancelable: false }
        );

    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                {/* <View style={ExStyles.headerview}>

                </View> */}
                <View style={styles.headerbar}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {/* <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'white'} />
                        </TouchableOpacity>
                    </View> */}
                    {/* <Text style={styles.headertext}>
                        Vehicles
                    </Text> */}

                    <View style={{ marginTop: 10, flex: 1 }}>
                        <FlatList
                            data={this.state.vehiclelist}
                            renderItem={(item) => {
                                return (
                                    <TouchableOpacity style={{
                                        marginTop: 5,
                                        marginHorizontal: 5,
                                        elevation: 4,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}
                                        onPress={() => {
                                            Actions.push('addvehicles', {
                                                'token': this.props.token,
                                                'user_id': this.props.user_id,
                                                load_vehicle: this.findAllVehiclesFunction.bind(this),
                                                'type': 'update',
                                                'data': item.item
                                            })
                                        }}
                                    >
                                        <View>
                                            <View style={{ flexDirection: 'row', padding: 5 }}>
                                                <Text>Vehicle No :</Text>
                                                <Text>{item.item.vehicleNo}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', padding: 5 }}>
                                                <Text>Vehicle Type :</Text>
                                                <Text>{item.item.vehicleType}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {
                                            this.deleteVehicle(item.item.id);
                                        }}>
                                            <FontAwesome name={'trash'} size={30} color={'red'} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 10,
                            padding: 15,
                            margin: 5,
                            backgroundColor: '#08a32c',
                            marginHorizontal: 10,
                            borderRadius: 5,
                            marginBottom: 30
                        }}
                        onPress={() => { Actions.push('addvehicles', { 'token': this.props.token, 'user_id': this.props.user_id, load_vehicle: this.findAllVehiclesFunction.bind(this) }) }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white' }}>ADD Vehicle</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#0099e5',
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
    headertext: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 25,
        color: 'white',
        textShadowRadius: 1,
        textShadowColor: 'white',
        elevation: 4
    }
});


