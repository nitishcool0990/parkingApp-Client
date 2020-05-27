import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

export default class Parking extends React.Component {
    state = {
        mobile_number: '',
        vcodeviewer: ''
    };

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
                            value={this.state.mobile_number}
                            style={{
                                padding: 15,
                                alignSelf: 'center',
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                width:'92%'
                            }}
                            placeholder={'Enter mobile number'}
                            onChangeText={(value) => {
                                this.setState({
                                    mobile_number: value
                                });
                            }}
                        />

                        {(this.state.vcodeviewer) ?
                            <View 
                            style={{ 
                                marginTop: 10,
                                padding:5,
                                borderColor:'#0099e5',
                                borderWidth:1,
                                marginHorizontal:5,
                                borderRadius:5
                                 }}>
                                <Text style={{ textAlign: 'center' }}>Please enter are OTP sent no</Text>

                                <TextInput
                                    value={this.state.verify_no}
                                    style={{
                                        padding: 15,
                                        alignSelf: 'center',
                                        fontSize: 20,
                                        borderColor: '#0099e5',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        marginVertical: 5
                                    }}
                                    placeholder={'Enter verify No'}
                                    onChangeText={(value) => {
                                        this.setState({
                                            verify_no: value
                                        });
                                    }}
                                />

                                <Text style={{ fontSize: 16, textAlign: 'center' }}>01:34</Text>

                                <TouchableOpacity
                                    style={{
                                        padding: 10,
                                        alignItems: 'center',
                                        backgroundColor: '#229c4b',
                                        marginHorizontal: 15,
                                        borderRadius: 5,
                                        marginTop: 15
                                    }}>
                                    <Text style={{ color: 'white' }}>RESEND OTP</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                        }

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
                                if (this.state.vcodeviewer == false) {
                                    this.setState({
                                        vcodeviewer: true,
                                    })
                                } else {
                                    this.setState({
                                        vcodeviewer: false,
                                    }, () => {

                                    })
                                }
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