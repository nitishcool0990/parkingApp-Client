import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

export default class Verification extends React.Component {
    state = {
        verify_no: ''
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={ExStyles.headerview}>
                </View> */}
                <View style={{ flex: 1 }}>
                    {/* <Text style={ExStyles.headertext}>
                        Verification
                    </Text> */}

                    <Image
                        source={require('../Images/default.png')}
                        style={{
                            width: 250,
                            height: 200,
                            marginTop: 20,
                            alignSelf: 'center'
                        }} />

                    <View style={{ marginTop: 20 }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20
                        }}>Please enter are OTP sent no</Text>

                        <Text style={{
                            textAlign: 'center',
                            fontSize: 20,
                            marginTop: 10
                        }}>+91 xxx xxx xxx</Text>

                        <TextInput
                            value={this.state.verify_no}
                            style={{
                                padding: 15,
                                fontSize: 20,
                                marginTop: 20,
                                borderColor: '#0099e5',
                                borderWidth: 1,
                                borderRadius: 5,
                                marginVertical: 5,
                                marginHorizontal: 30,
                                textAlign:'center'
                            }}
                            placeholder={'Enter verify No'}
                            onChangeText={(value) => {
                                this.setState({
                                    verify_no: value
                                });
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                padding: 10,
                                backgroundColor: '#0099e5',
                                marginHorizontal: 30,
                                borderRadius: 5,
                                marginTop: 15
                            }}
                            onPress={() => { Actions.profile() }}
                        >
                            <Text style={{ color: 'white',textAlign:'center',fontSize:20 }}>VERIFY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                padding: 10,
                                alignItems: 'center',
                                marginHorizontal: 15,
                                borderRadius: 5,
                                marginTop: 15
                            }}>
                            <Text style={{ alignSelf:'center',fontSize:20}}>RESEND OTP</Text>
                        </TouchableOpacity>



                    </View>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});