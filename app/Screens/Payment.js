import React from 'react';
import { SafeAreaView, View, StyleSheet, Text,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

export default class Payment extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Payment
                    </Text>

                    <View style={{
                        marginHorizontal: 30,
                        padding: 20,
                        marginTop: 45,
                        flexDirection: 'row',
                        elevation: 4,
                        justifyContent: 'space-around',
                        borderWidth: 0.5,
                        borderRadius: 10,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name="account-balance-wallet" size={35} color="black" />
                            <Text style={{ marginLeft: 5 }}>Wallet $ 00</Text>
                        </View>
                        <TouchableOpacity>
                            <FontAwesome name="more-vert" size={35} color="black" />
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={{ 
                    position: 'absolute', 
                    borderRadius: 50, 
                    bottom: 125, 
                    right: 30,
                    padding:15,
                    backgroundColor:'#fcba03'
                     }}
                     onPress={()=>{Actions.push('newpaymentmethods')}}
                     >
                    <FontAwesome name="add" size={35} color={'white'} />
                </TouchableOpacity>
                <TabbarComponent />
            </SafeAreaView>
        );
    }
}

