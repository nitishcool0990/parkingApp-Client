import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { findAllVehicles } from '../Netowrks/server';

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
        findAllVehicles(this.props.token,this.props.user_id,"","").then((value) => {
            alert(JSON.stringify(value));
            if (value.status == 1) {
                alert(value)
            } else {
                alert("status :" + value.status + "-" + value.message);
            }
        }).catch((error) => {
            alert(error)
        })
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
                                    <View style={{ marginTop: 5, marginHorizontal: 5 }}>
                                        <View style={{ flexDirection: 'row', padding: 5 }}>
                                            <Text>Vehicle No :</Text>
                                            <Text>{item.item.vehicle_no}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', padding: 5 }}>
                                            <Text>Vehicle No :</Text>
                                            <Text>{item.item.category}</Text>
                                        </View>
                                    </View>
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
                        onPress={() => { Actions.push('addvehicles',{'token':this.props.token,'user_id':this.props.user_id}) }}
                    >
                        <Text style={{ textAlign: 'center', color: 'white' }}>ADD Vehicle</Text>
                    </TouchableOpacity>
                </View>
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


