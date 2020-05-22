import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends React.Component {

    componentDidMount=()=>{
        Actions.intro();
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
                <Text style={{fontSize:30,color:'#eb4034'}}>VPark</Text>
            </SafeAreaView>
        );
    }
}