import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

export default class Verification extends React.Component {
    state = {
        verify_no: ''
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Verification
                    </Text>

                    <View style={{ marginTop: 50 }}>
                        <Text style={{textAlign:'center'}}>Please enter are OTP sent no</Text>

                        <TextInput
                            value={this.state.verify_no}
                            style={{ 
                                padding: 15,
                                alignSelf:'center',
                                fontSize:20,
                                borderColor:'#0099e5',
                                borderWidth:1,
                                borderRadius:5,
                                marginVertical:5 
                            }}
                            placeholder={'Enter verify No'}
                            onChangeText={(value) => {
                                this.setState({
                                    verify_no: value
                                });
                            }}
                        />

                        <Text style={{ fontSize: 16,textAlign:'center' }}>01:34</Text>

                        <TouchableOpacity 
                        style={{
                        padding: 10,
                        alignItems: 'center',
                        backgroundColor: '#229c4b',
                        marginHorizontal: 15,
                        borderRadius: 5,
                        marginTop: 15
                    }}>
                            <Text style={{color:'white'}}>RESEND OTP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{
                        padding: 10,
                        alignItems: 'center',
                        backgroundColor: '#0099e5',
                        marginHorizontal: 15,
                        borderRadius: 5,
                        marginTop: 15
                    }}
                    onPress={()=>{Actions.account()}}
                    >
                            <Text style={{color:'white'}}>VERIFY</Text>
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