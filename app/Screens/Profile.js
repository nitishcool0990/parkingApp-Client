import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert, TextInput, ImageBackground } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { createNewUser } from '../Netowrks/server';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Account extends React.Component {

    state = {
        country_code: 'IN +91',
        countrycodes: ['IN +91', 'SL +94', 'cancel'],
        checkbox: false,
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        city: '',
        password: '',

    }

    registerFunction = () => {
        if (this.state.first_name == '') {
            alert('Enter fisrt name');
        } else if (this.state.last_name == '') {
            alert('Enter last name');
        } else if (this.state.email == '') {
            alert('Enter email');
        } else if (this.state.mobile_number == '') {
            alert('Enter mobile number');
        } else if (this.state.city == '') {
            alert('Enter city');
        } else if (this.state.password == '') {
            alert('Enter password');
        } else {
            var status = 'ACTIVE';
            var userType = 'ADMIN';
            createNewUser(this.state.mobile_number, this.state.first_name, this.state.last_name, this.state.email, this.state.city, this.state.password, status, userType).then((data) => {
                alert(JSON.stringify(data));
            }).catch((error) => {
                alert(JSON.stringify(error));
            })
        }
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>

                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headertext}>
                        Profile
                    </Text>

                    <View style={{ marginTop: 50, marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('../Images/profile.png')}
                            resizeMode={'contain'}
                            style={{ width: 100, height: 100, alignSelf: 'center' }}
                        >
                        </ImageBackground>

                        <TextInput
                            value={this.state.first_name}
                            style={{ padding: 15, borderRadius: 5, borderColor: '#0099e5', borderWidth: 1, marginTop: 2 }}
                            placeholder={'Name'}
                            onChangeText={(value) => {
                                this.setState({
                                    first_name: value
                                });
                            }}
                        />

                        <TextInput
                            value={this.state.last_name}
                            style={{ padding: 15, borderRadius: 5, borderColor: '#0099e5', borderWidth: 1, marginTop: 2 }}
                            placeholder={'Suname(s)'}
                            onChangeText={(value) => {
                                this.setState({
                                    last_name: value
                                });
                            }}
                        />

                        <TextInput
                            value={this.state.email}
                            style={{ padding: 15, borderRadius: 5, borderColor: '#0099e5', borderWidth: 1, marginTop: 2 }}
                            placeholder={'Email'}
                            onChangeText={(value) => {
                                this.setState({
                                    email: value
                                });
                            }}
                        />

                        <View style={{
                            padding: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 0,
                            borderRadius: 5,
                            borderColor: '#0099e5',
                            borderWidth: 1,
                            marginTop: 2
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

                        <TextInput
                            value={this.state.city}
                            style={{ padding: 15, borderRadius: 5, borderColor: '#0099e5', borderWidth: 1, marginTop: 2 }}
                            placeholder={'City or residence'}
                            onChangeText={(value) => {
                                this.setState({
                                    city: value
                                });
                            }}
                        />

                        <TextInput
                            value={this.state.password}
                            style={{ padding: 15, borderRadius: 5, borderColor: '#0099e5', borderWidth: 1, marginTop: 2 }}
                            placeholder={'Password'}
                            onChangeText={(value) => {
                                this.setState({
                                    password: value
                                });
                            }}
                        />

                        <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 10 }}>
                            <View>
                                {(this.state.checkbox == true) ?
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            checkbox: false
                                        });
                                    }}>
                                        <MaterialIcons name='check-box' size={20} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            checkbox: true
                                        });
                                    }}>
                                        <MaterialIcons name='check-box-outline-blank' size={20} />
                                    </TouchableOpacity>
                                }
                            </View>
                            <Text> I accept to receive notifications from companies related to different sections by any means and suited to my profile.</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                padding: 15,
                                margin: 5,
                                backgroundColor: '#0099e5',
                                borderRadius: 5
                            }}
                            onPress={() => { this.registerFunction() }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginTop: 10,
                                padding: 15,
                                margin: 5,
                                backgroundColor: '#0099e5',
                                borderRadius: 5
                            }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>LOG OUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerbar: {
        flexDirection: 'row',
        marginTop: 5,
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


