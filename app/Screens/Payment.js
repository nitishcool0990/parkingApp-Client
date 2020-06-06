import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Payment extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/* <View style={ExStyles.headerview}>
                </View> */}

                <View style={styles.headerbar2}>
                    <TouchableOpacity onPress={() => { }}>
                        {/* <FontAwesome name={'chevron-left'} size={25} color={'white'} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Actions.drawerOpen(); }}>
                        <FontAwesome name={'bars'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {/* <Text style={ExStyles.headertext}>
                        Payment
                    </Text> */}
                    {/* 
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
                    </View> */}

                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: '#0099e5',
                        marginHorizontal: 15,
                        marginTop: 10,
                        borderRadius: 5
                    }}
                        onPress={() => {
                            Actions.push('wallet');
                        }}
                    >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white'
                        }}>WALLET</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: '#0099e5',
                        marginHorizontal: 15,
                        marginTop: 10,
                        borderRadius: 5
                    }}
                        onPress={() => {

                        }}
                    >
                        <Text style={{
                            alignSelf: 'center',
                            color: 'white'
                        }}>CREDIT / DEBIT CARD</Text>
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={{ 
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
                </TouchableOpacity> */}
                <TabbarComponent />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerbar2: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200,
        justifyContent: 'space-between'
    },
});

