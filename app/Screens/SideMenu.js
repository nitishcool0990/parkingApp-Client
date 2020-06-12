import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { removeValue, getData } from '../AsyncStorage/AsyncStorage';

var jwtDecode = require('jwt-decode');

export default class SideMenu extends React.Component {
    render = () => {
       var user_id="";
       var token="";
        getData('token', (value) => {
           var data= JSON.parse(value);
         user_id = data.user_id;
         token = data.token;
        });
        return (
            <SafeAreaView style={styles.safe}>
                <ScrollView>
                    <Image
                        source={require('../Images/default.png')}
                        style={{
                            width: 150,
                            height: 150,
                            marginTop: 20,
                            alignSelf: 'center'
                        }} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Account Balance</Text>
                        <Text style={{ fontSize: 18, paddingVertical: 5 }}>Rs : 500 </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('profile', {'user_id':user_id,'token':token});
                            Actions.drawerClose();
                        }}
                    >
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('vehicles', {'user_id':user_id,'token':token});
                            Actions.drawerClose();
                        }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>My Vehicle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('favourite');
                            Actions.drawerClose();
                        }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>My Favourite</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('wallet');
                            Actions.drawerClose();
                        }}
                    >
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>Wallet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('booking');
                            Actions.drawerClose();
                        }}
                    >
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>My Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 5, paddingVertical: 10, flexDirection: 'row' }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>Book My Spot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            Actions.push('parking',{'user_id':user_id,'token':token});
                            Actions.drawerClose();
                        }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>My Dashboard (for agent)</Text>
                    </TouchableOpacity>
                    <View style={{ height: 50 }}>

                    </View>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            alert('Help');
                        }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginTop: 5,
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            removeValue('token', () => {
                                Actions.login2();
                            });
                        }}>
                        <FontAwesome name={'circle'} size={18} style={{ marginHorizontal: 5 }} />
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1
    }
});