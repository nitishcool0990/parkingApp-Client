import * as React from 'react';
import { View, StyleSheet, Dimensions, Image, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { ForgetPassword } from '../Netowrks/server';
import { getData } from '../AsyncStorage/AsyncStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ResetPassword extends React.Component {
    state = {
        mobileNo: '',
        password: '',
        resetpassword: '',
        vcodeviewer: '',
        dataArray: ''
    };

    componentDidMount = () => {
        getData('token', (values) => {
            if (values == null) {
                Actions.replace('login2');
            } else {
                var data = JSON.parse(values);
                this.setState({
                    mobileNo: data.mobile,
                });
            }
        });
    }

    resetPasswordFunction = () => {
        this.setState({
            isFetching: true
        }, () => {
            ForgetPassword(this.state.mobileNo, this.state.password, this.state.resetpassword)
                .then(values => {
                    console.log('#### ForgetPassword :' + JSON.stringify(values));

                })
                .catch(error => {
                    console.log('Api call ForgetPassword error:' + error.message);
                    this.setState({ isFetching: false });
                });
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerbar}>
                    <TouchableOpacity onPress={() => { Actions.pop() }}>
                        <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Image
                        source={require('../Images/default.png')}
                        style={{
                            width: 250,
                            height: 200,
                            marginTop: 20,
                            alignSelf: 'center'
                        }} />

                    <Text style={{ fontSize: 20, alignSelf: 'center' }}>Reset Password</Text>
                    <View style={{ marginTop: 30 }}>
                        <TextInput
                            value={this.state.mobileNo}
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
                                    mobileNo: value
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

                        <TextInput
                            value={this.state.resetpassword}
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
                            placeholder={'New Password'}
                            onChangeText={(value) => {
                                this.setState({
                                    resetpassword: value
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

                                this.resetPasswordFunction();
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 18 }}>{'Reset Password'}</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5',
    },
    headerbar: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200
    },
    headertext: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 25,
        color: 'white',
        textShadowRadius: 1,
        textShadowColor: 'white',
        elevation: 4
    }
});