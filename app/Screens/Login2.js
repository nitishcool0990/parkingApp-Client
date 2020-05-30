import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { authonticate } from '../Netowrks/server';
import { storeData } from '../AsyncStorage/AsyncStorage';

export default class Login2 extends React.Component {
    state = {
        username: '',
        password: '',
        vcodeviewer: '',
        dataArray: ''
    };

    authonticateFunction = () => {
        authonticate(this.state.username, this.state.password)
            .then(values => {
                console.log('#### authonticate :' + JSON.stringify(values.data));
                if(values.data!=undefined){
                    this.setState({
                        dataArray: values.data
                    }, () => {
                        storeData('token', values.data.token);
                        Actions.home();
                    });
                }
            })
            .catch(error => {
                console.log('Api call authonticate error:' + error.message);
                this.setState({ isFetching: false });
            });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Login
                    </Text>

                    <View style={{ marginTop: 50 }}>
                        <TextInput
                            value={this.state.username}
                            style={{
                                padding: 15,
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                width: '92%'
                            }}
                            placeholder={'User Name'}
                            onChangeText={(value) => {
                                this.setState({
                                    username: value
                                });
                            }}
                        />

                        <TextInput
                            value={this.state.password}
                            style={{
                                padding: 15,
                                marginTop: 10,
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                width: '92%'
                            }}
                            placeholder={'Password'}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value
                                });
                            }}
                        />


                        <TouchableOpacity
                            style={{
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: '#0099e5',
                                marginHorizontal: 15,
                                borderRadius: 5,
                                marginTop: 15
                            }}
                            onPress={() => {

                                this.authonticateFunction();
                            }}
                        >
                            <Text style={{ color: 'white' }}>{(this.state.vcodeviewer == true) ? 'Verify' : 'Login'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginVertical: 10
                            }}
                            onPress={() => {
                                Actions.register();
                            }}>
                            <Text style={{ textAlign: 'center' }}>I dont'n have an account</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});