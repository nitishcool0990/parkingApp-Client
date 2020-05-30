import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getData } from '../AsyncStorage/AsyncStorage';
import {findUserById} from '../Netowrks/server';

export default class SplashScreen extends React.Component {

    componentDidMount = () => {
        setTimeout(() => {
            getData('token', (values) => {
                this.findUserByIdFunction(values,'20');   
            });
        }, 3000);
    }
    
    findUserByIdFunction = (token,id) => {
        findUserById(token,id).then((value) => {
            console.warn(value);
            
          Actions.home({'token':token});
        });
      }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, color: '#eb4034' }}>VPark</Text>
            </SafeAreaView>
        );
    }
}