import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, FlatList, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getAlltheArrivedVehicleList, getAlltheUpcomingVehicleList, CheckIn, CheckOut } from '../Netowrks/server';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';
import { getData } from '../AsyncStorage/AsyncStorage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ArrivedVehicleList extends React.Component {

    state = {
        vehicle_list: [
            {
                "bookingId": 1, "vehicleTypeId": 1,
                "vehicleName": "CAR",
                "vehicleNo": "DL-900",
                "mobileNo": "7838898654",
                "outTime": "17:00",
                "arrivalTime": "15:00"
            }
        ],
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
                    this.setState({
                        isFetching: true
                    });
                    if (this.props.type == 'arrived') {
                        getAlltheArrivedVehicleList(data.token, this.props.parkingLocid)
                            .then((value) => {
                                this.setState({
                                    isFetching: false,
                                    //  vehicle_list: value.data
                                }, () => {
                                    console.warn(JSON.stringify(value));
                                });
                            })
                            .catch((error) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    console.warn(error);
                                });
                            })
                    } else {
                        getAlltheUpcomingVehicleList(data.token, this.props.parkingLocid)
                            .then((value) => {
                                this.setState({
                                    isFetching: false,
                                    //  vehicle_list: value.data
                                }, () => {
                                    console.warn(JSON.stringify(value));
                                });
                            })
                            .catch((error) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    console.warn(error);
                                });
                            })
                    }
                });
            }
        });
    }

    CheckInFunction = (token, bookingId, locationId, vehicleTypeId) => {
        this.setState({
            isFetching: true
        }, () => {
            CheckIn(token, bookingId, locationId, vehicleTypeId)
                .then((values) => {
                    this.setState({
                        isFetching: false
                    });
                })
                .catch((error) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        console.warn(error);
                    });
                });
        });

    }

    CheckOutFunction = (token, bookingId, locationId, vehicleTypeId) => {
        this.setState({
            isFetching: true
        }, () => {
            CheckOut(token, bookingId, locationId, vehicleTypeId)
                .then((values) => {
                    this.setState({
                        isFetching: false
                    });
                })
                .catch((error) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        console.warn(error);
                    });
                });
        });

    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                        <Text style={{marginHorizontal:10}}>{(this.props.type == 'arrived') ? 'Arrived Vehicles' : 'Upcomeing Vehicles'}</Text>
                    </View>

                    <View style={{ padding: 10 }}>

                        <FlatList
                            data={this.state.vehicle_list}
                            renderItem={(value) => {
                                return (
                                    <View style={{
                                        marginTop: 5,
                                        borderWidth: 0.5,
                                        padding: 5,
                                        borderRadius: 5,
                                        borderColor: '#0099e5',
                                        flexDirection: 'row'
                                    }}>

                                        <View style={{ flex: 1 }}>
                                            <Text>Booking Id : {value.item.bookingId}</Text>
                                            <Text>Vehicle Name : {value.item.vehicleName}</Text>
                                            <Text>Vehicle No : {value.item.vehicleNo}</Text>
                                            <Text>Mobile No : {value.item.mobileNo}</Text>
                                            <Text>Arrival Time : {value.item.arrivalTime}</Text>
                                            <Text>Out Time : {value.item.outTime}</Text>
                                        </View>

                                        {(this.props.type == 'arrived') ?
                                            <TouchableOpacity onPress={() => { this.CheckInFunction(this.state.token, value.item.bookingId, this.props.parkingLocid, value.item.vehicleName) }}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 5
                                                }}>
                                                <FontAwesome name={'sign-in'} size={50} color={'black'} />
                                                <Text>Check Out</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { this.CheckInFunction(this.state.token, value.item.bookingId, this.props.parkingLocid, value.item.vehicleName) }}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 5,
                                                }}>
                                                <FontAwesome name={'sign-out'} size={50} color={'black'} />
                                                <Text>Check in</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                );
                            }}
                        />
                    </View>

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
    }, headerbar: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200
    },
});