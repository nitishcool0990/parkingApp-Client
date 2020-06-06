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
                    Actions.login2();
                } else {
                    //alert(JSON.stringify(this.decodeJWTToken(values)));
                    this.findUserByIdFunction(values, '20');
                }
            });

        }, 1000);

    }

    decodeJWTToken = (token) => {
        // var token = 'eyJ0eXAiO.../// jwt token';
        var decoded = jwtDecode(token);
        console.log(decoded);
        return decoded;
    }

    findUserByIdFunction = (token, id) => {
        findUserById(token, id).then((value) => {     
            console.warn(value);
            Actions.home({ 'token': token });
        }).catch((error) => {
            Actions.login2();
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