import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { authonticate } from '../Netowrks/server';
import { storeData } from '../AsyncStorage/AsyncStorage';

var jwtDecode = require('jwt-decode');

export default class Login2 extends React.Component {
    state = {
        username: '',
        password: '',
        vcodeviewer: '',
        dataArray: ''
    };

    decodeJWTToken = (token, then) => {
        var decoded = jwtDecode(token);
        // console.log("## :"+JSON.stringify(decoded.user_id));
        then(decoded);
    }

    authonticateFunction = () => {
        authonticate(this.state.username, this.state.password)
            .then(values => {
                console.log('#### authonticate :' + JSON.stringify(values));
                if (values.status == 3) {
                    if (values.data != undefined) {
                        this.setState({
                            dataArray: values.data
                        }, () => {
                            this.decodeJWTToken(values.data.token, (value) => {

                                const data={
                                    token:values.data.token,
                                    user_id:String(value.user_id)
                                }
                                storeData('token', JSON.stringify(data));
                                Actions.home();
                            });        
                        });
                    }
                } else {
                    alert(values.status + '-' + values.error);
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

                <View style={{ flex: 1 }}>
                    <Image
                        source={require('../Images/default.png')}
                        style={{
                            width: 250,
                            height: 200,
                            marginTop: 20,
                            alignSelf: 'center'
                        }} />

                    <Text style={{ fontSize: 20, alignSelf: 'center' }}>Login to VPark</Text>
                    <View style={{ marginTop: 30 }}>
                        <TextInput
                            value={this.state.username}
                            style={{
                                padding: 10,
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                width: '92%',
                                textAlign: 'center',
                                fontSize: 18
                            }}
                            placeholder={'Mobile number'}
                            onChangeText={(value) => {
                                this.setState({
                                    username: value
                                });
                            }}
                        />

                        <TextInput
                            value={this.state.password}
                            style={{
                                padding: 10,
                                marginTop: 10,
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                width: '92%',
                                textAlign: 'center',
                                fontSize: 18
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
                                // Actions.home();
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>{(this.state.vcodeviewer == true) ? 'Verify' : 'Login'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginVertical: 10,
                            }}
                            onPress={() => {
                                Actions.register();
                            }}>
                            <Text style={{ textAlign: 'center', fontSize: 18 }}>I dont'n have an account</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginVertical: 10,
                            position: 'absolute',
                            bottom: 10,
                            alignSelf: 'center'
                        }}
                        onPress={() => {
                            Actions.register();
                        }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>Reset password</Text>
                    </TouchableOpacity>
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