import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Actions } from 'react-native-router-flux';
import ExStyles from '../Utility/Styles';
import { Signup } from '../Netowrks/server';

export default class Registration extends React.Component {

    state = {
        mobile_number: '',
        country_code: '+91',
        countrycodes: ['+91', '+94', 'cancel']
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    SignupFunction = () => {
        if (this.state.mobile_number == '') {
            alert('Enter mobile number');
        } else {
            Signup(this.state.mobile_number).then((values) => {
                if (values.status == 1) {
                    Actions.replace('verification',{'mobile_number':this.state.mobile_number});
                }else{
                    alert(values.message);
                }
            }).catch((error) => {
                alert(error);
            });
        }
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1, padding: 5 }}>
                {/* <View style={ExStyles.headerview}>
                </View> */}
                <View style={{ flex: 1 }}>
                    {/* <Text style={ExStyles.headertext}>
                        Registration
                    </Text> */}

                    <Image
                        source={require('../Images/default.png')}
                        style={{
                            width: 250,
                            height: 200,
                            marginTop: 20,
                            alignSelf: 'center'
                        }} />

                    <Text style={{ fontSize: 30, alignSelf: 'center' }}>Welcome to Vpark</Text>

                    <Text style={{ fontSize: 20, alignSelf: 'center', marginTop: 15 }}>Enter your number to get start</Text>

                    <View style={{
                        padding: 5,
                        // marginTop: 100,
                        flexDirection: 'row',
                        marginHorizontal: 30,
                        marginTop: 20
                    }}>

                        <View>
                            <TouchableOpacity onPress={this.showActionSheet}>
                            <Text
                                style={{
                                    fontSize: 22,
                                    borderWidth: 1,
                                    padding: 10
                                }}
                            >{this.state.country_code}</Text>
                            </TouchableOpacity>
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                title={'Select country code ?'}
                                options={this.state.countrycodes}
                                cancelButtonIndex={this.state.countrycodes.length}
                                destructiveButtonIndex={this.state.countrycodes.length - 1}
                                onPress={(index) => {
                                    if (index != this.state.countrycodes.length - 1) {
                                        this.setState({
                                            country_code: this.state.countrycodes[index]
                                        });
                                    }

                                }}
                            />
                        </View>
                        <TextInput
                            value={this.state.mobile_number}
                            style={{
                                fontSize: 22,
                                borderWidth: 1,
                                padding: 8,
                                marginLeft: 5,
                                flex: 1,
                            }}
                            placeholder={'Enter mobile number'}
                            onChangeText={(value) => {
                                this.setState({
                                    mobile_number: value
                                });
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            padding: 10,
                            alignItems: 'center',
                            backgroundColor: '#4287f5',
                            marginHorizontal: 30,
                            borderRadius: 5,
                            marginTop: 15,
                        }}
                        onPress={() => {
                            this.SignupFunction();
                        }}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>SEND MY OTP</Text>
                    </TouchableOpacity>

                    <View style={{
                        marginHorizontal: 15,
                        padding: 5,
                        marginTop: 10,
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 16 }}>By Proceeding i agree to Vpark</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16 }}> and </Text>
                            <TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </SafeAreaView>
        );
    }
}