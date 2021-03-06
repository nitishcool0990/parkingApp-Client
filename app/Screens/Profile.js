import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert, TextInput, ImageBackground, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionSheet from 'react-native-actionsheet';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';
import { createNewUser, findUserProfile, updateUser, CreateProfile, UpdateProfile, ViewProfile } from '../Netowrks/server';
import { removeValue, getData } from '../AsyncStorage/AsyncStorage';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Profile extends React.Component {

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
        ref_code: '',
        check: 'car',
        status: 0,
    }

    componentDidMount = () => {
        getData('token', (value) => {
            if (value != undefined) {
                this.setState({
                    status: 1
                }, () => {
                    this.getUserdetails();
                });
            } else {
                this.setState({
                    status: 0
                });
            }
        });

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
        } 
        // else if (this.state.checkbox) {
        //     alert('Accept terms and conditions');
        // } 
        else {
            var status = 'ACTIVE';
            var userType = '';
            if(this.state.check=='car'){
            userType='USER'
            }else{
                userType='AGENT'
            }
            this.setState({
                isFetching: true,
            }, () => {
                CreateProfile(this.state.mobile_number, this.state.password, this.state.email, this.state.first_name, this.state.last_name, userType).then((data) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        Actions.push('login2');
                    });

                }).catch((error) => {
                    alert(JSON.stringify(error));
                })
            });

        }
    }



    updateFunction = () => {
        if (this.state.first_name == '') {
            alert('Enter fisrt name');
        } else if (this.state.last_name == '') {
            alert('Enter last name');
        } else if (this.state.email == '') {
            alert('Enter email');
        } else {
            var status = 'ACTIVE';
            var userType = '';
            if(this.state.check=='car'){
            userType='USER'
            }else{
                userType='AGENT'
            }
            this.setState({
                isFetching: true,
            }, () => {
                UpdateProfile(
                    this.props.token,
                    this.state.first_name,
                    this.state.last_name,
                    this.state.email,
                ).then((data) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        if (data.status == 1) {
                            alert(data.message);
                        } else {

                        }
                    });

                }).catch((error) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        alert(JSON.stringify(error));
                    });
                })
            })
        }
    }

    getUserdetails = () => {
        this.setState({
            isFetching: true
        }, () => {
            ViewProfile(this.props.token)
                .then(values => {
                    console.log('#### findUserProfile :' + JSON.stringify(values.data));
                    if (values.data != undefined) {
                        this.setState({
                            dataArray: values.data,
                            first_name: values.data.firstName,
                            last_name: values.data.lastName,
                            email: values.data.email,
                            mobile_number: values.data.mobileNo,
                            city: values.data.city,
                            id: values.data.id,
                            isFetching: false
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        isFetching: true
                    },()=>{
                        console.log('Api call findUserProfile error:' + error.message);
                    });
                });
        });

    }

    textFieldComponent = (fieldname, val, reg) => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingVertical: 5 }}>
                        {fieldname}
                    </Text>
                    {(reg == true) ?
                        <MaterialIcons name={'star'} color={'red'} />
                        :
                        null
                    }
                </View>

                <TextInput
                    value={this.state[val]}
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        borderColor: '#0099e5',
                        borderWidth: 1,
                        marginTop: 5
                    }}
                    // placeholder={'Name'}
                    onChangeText={(value) => {
                        this.setState({
                            [val]: value
                        });
                    }}
                />
            </View>
        );
    }

    checkBox = (reg) => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingVertical: 5 }}>
                        User type
                </Text>
                    {(reg == true) ?
                        <MaterialIcons name={'star'} color={'red'} />
                        :
                        null
                    }
                </View>
                {(this.state.check == 'car') ?
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingVertical: 15
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            onPress={() => {
                                this.setState({
                                    check: 'car'
                                });
                            }}
                        >
                            <MaterialIcons
                                name={'radio-button-checked'}
                                style={{ marginHorizontal: 10 }}
                                size={25}
                            />
                            <Text>Car Owner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            onPress={() => {
                                this.setState({
                                    check: 'park'
                                });
                            }}
                        >
                            <MaterialIcons
                                name={'radio-button-unchecked'}
                                style={{ marginHorizontal: 10 }}
                                size={25}
                            />
                            <Text>Park Owner</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingVertical: 15
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            onPress={() => {
                                this.setState({
                                    check: 'car'
                                });
                            }}
                        >
                            <MaterialIcons
                                name={'radio-button-unchecked'}
                                style={{ marginHorizontal: 10 }}
                                size={25}
                            />
                            <Text>Car Owner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                            onPress={() => {
                                this.setState({
                                    check: 'park'
                                });
                            }}
                        >
                            <MaterialIcons
                                name={'radio-button-checked'}
                                style={{ marginHorizontal: 10 }}
                                size={25}
                            />
                            <Text>Park Owner</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.headertext}>
                        Profile
                    </Text> */}

                    <ScrollView style={{ marginTop: 10 }}>
                        <View style={{ marginHorizontal: 20 }}>

                            {this.textFieldComponent('First name', 'first_name', true)}

                            {this.textFieldComponent('Last name', 'last_name', true)}

                            {this.textFieldComponent('Email', 'email')}

                            {this.textFieldComponent('Mobile number', 'mobile_number')}

                            {this.textFieldComponent('Password', 'password', true)}

                            {this.checkBox(true)}

                            {this.textFieldComponent('City', 'city')}

                            {this.textFieldComponent('Referal code', 'ref_code', true)}


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

                            {(this.state.status == 0) ?
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
                                :
                                <TouchableOpacity
                                    style={{
                                        marginTop: 10,
                                        padding: 15,
                                        margin: 5,
                                        backgroundColor: '#0099e5',
                                        borderRadius: 5
                                    }}
                                    onPress={() => { this.updateFunction() }}>
                                    <Text style={{ textAlign: 'center', color: 'white' }}>UPDATE</Text>
                                </TouchableOpacity>
                            }

                        </View>
                    </ScrollView>
                </View>
                {(this.state.isFetching == true) ?
                    <ActivityIndicatorView />
                    :
                    null
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    safe: {
        flex: 1,
        backgroundColor: '#0099e5'
    }
});


