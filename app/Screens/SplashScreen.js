import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getData } from '../AsyncStorage/AsyncStorage';
import { findUserById } from '../Netowrks/server';

var jwtDecode = require('jwt-decode');

export default class SplashScreen extends React.Component {

    componentDidMount = () => {
        setTimeout(() => {
            getData('token', (values) => {
                if (values == null) {
                    Actions.replace('login2');
                } else {
                    var data = JSON.parse(values);
                    this.findUserByIdFunction(data.token, data.user_id);
                }
            });
        }, 1000);
    }

    findUserByIdFunction = (token, id) => {
        findUserById(token, id).then((value) => {
            console.warn(value);
            Actions.main({currenttoken: token });
        }).catch((error) => {
            console.warn(error);
            Actions.replace('login2');
        });
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../Images/default.png')}
                    style={{
                        width: 350,
                        height: 350,
                        alignSelf: 'center'
                    }} />
            </SafeAreaView>
        );
    }
}