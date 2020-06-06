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

export default class AddVehicle extends React.Component {

    state = {
        country_code: '- select vehicle type -',
        countrycodes: ['Bike','Car', 'Van', 'cancel'],
        checkbox: false,
        first_name: '',
        last_name: '',
        email: '',
        mobile_number: '',
        city: '',
        password: '',
        ref_code: '',
        check: 'car',

    }

    registerFunction = () => {
        // if (this.state.first_name == '') {
        //     alert('Enter fisrt name');
        // } else if (this.state.last_name == '') {
        //     alert('Enter last name');
        // } else if (this.state.email == '') {
        //     alert('Enter email');
        // } else if (this.state.mobile_number == '') {
        //     alert('Enter mobile number');
        // } else if (this.state.city == '') {
        //     alert('Enter city');
        // } else if (this.state.password == '') {
        //     alert('Enter password');
        // } else {
        //     var status = 'ACTIVE';
        //     var userType = 'ADMIN';
        //     createNewUser(this.state.mobile_number, this.state.first_name, this.state.last_name, this.state.email, this.state.city, this.state.password, status, userType).then((data) => {
        //         alert(JSON.stringify(data));
        //     }).catch((error) => {
        //         alert(JSON.stringify(error));
        //     })
        // }
        Actions.login2();
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

    showActionSheet = () => {
        this.ActionSheet.show()
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

                    <View style={{ marginTop: 10, marginHorizontal: 20 }}>

                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ paddingVertical: 5 }}>
                                    Vehicle type
                                </Text>
                                <MaterialIcons name={'star'} color={'red'} />
                            </View>

                            <Text
                                onPress={this.showActionSheet}
                                style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    borderColor: '#0099e5',
                                    borderWidth: 1,
                                    marginTop: 5
                                }}
                            >{this.state.country_code}</Text>

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
                                    }else{
                                        this.setState({
                                            country_code: '- select vehicle type -'
                                        });
                                    }

                                }}
                            />
                        </View>

                        {this.textFieldComponent('Vehicle number', 'vehicle_number', true)}

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
                            <Text> Is default.</Text>
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
                            <Text style={{ textAlign: 'center', color: 'white' }}>SAVE VEHICLE</Text>
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


