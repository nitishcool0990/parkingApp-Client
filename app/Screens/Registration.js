import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Actions } from 'react-native-router-flux';
import ExStyles from '../Utility/Styles';

export default class Registration extends React.Component {

    state = {
        mobile_number: '',
        country_code: 'IN +91',
        countrycodes: ['IN +91', 'SL +94', 'cancel']
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1, padding: 5 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Registration
                    </Text>

                    <View style={{
                    padding: 5,
                    marginTop: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 20
                }}>
                    <View>
                        <Text onPress={this.showActionSheet}>{this.state.country_code}</Text>
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
                        style={{ padding: 15 }}
                        placeholder={'Enter mobile number'}
                        onChangeText={(value) => {
                            this.setState({
                                mobile_number: value
                            });
                        }}
                    />
                </View>
                <View style={{ marginHorizontal: 15, padding: 5 }}>
                    <Text>By Proceeding with creating an account you agree to the Vpark.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue' }}>Terms & Conditions </Text>
                        </TouchableOpacity>
                        <Text>and </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'blue' }}>Privacy Policy </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        padding: 10,
                        alignItems: 'center',
                        backgroundColor: '#4287f5',
                        marginHorizontal: 15,
                        borderRadius: 5,
                        marginTop: 15
                    }}
                    onPress={() => {
                        Actions.verification();
                    }}
                >
                    <Text style={{ color: 'white' }}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={{
                    marginVertical:10
                }}
                onPress={()=>{
                    Actions.login();
                }}>
                    <Text style={{textAlign:'center'}}>I already have an account</Text>
                </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}