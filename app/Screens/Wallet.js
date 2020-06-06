import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity,TextInput, FlatList, ScrollView, Dimensions, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Wallet extends React.Component {

    state = {
        amountList: [
            { amount: 50 },
            { amount: 100 },
            { amount: 150 },
            { amount: 200 },
            { amount: 500 },
            { amount: 1000 }
        ],
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                  <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                {/* <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Text style={{alignSelf:'center',padding:10}}>Select top up amount</Text>
                
                <View style={{flexDirection:'row',marginHorizontal:20}}>

                </View>
                </ScrollView> */}
                <View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    padding: 5
                }}>
                    <View>
                        <FlatList
                            data={this.state.amountList}
                            numColumns={2}
                            renderItem={(value) => {
                                return (
                                    <TouchableOpacity style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        margin: 5,
                                        borderColor:'#0099e5'
                                    }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            padding: 20,
                                            fontSize:20
                                        }}>Rs :{value.item.amount}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                <Text style={{ alignSelf: 'center',marginTop:10 }}>Your Top Up Amount</Text>
                <TextInput placeholder={'0.00'} style={{
                    borderWidth:1,
                    borderRadius:5,
                    marginVertical:5,
                    marginHorizontal:30,
                    textAlign:'center',
                    fontSize:20
                    }} />
                <Text style={{ alignSelf: 'center',marginTop:10 }}>Coupon Code</Text>
                <TextInput placeholder={'0.00'} style={{
                    borderWidth:1,
                    borderRadius:5,
                    marginVertical:5,
                    marginHorizontal:30,
                    textAlign:'center',
                    fontSize:20
                    }} /> 

                 <TouchableOpacity style={{
                     backgroundColor:'#0099e5',
                     marginVertical:5,
                    marginHorizontal:30,
                    borderRadius:5
                     }}>
                <Text style={{
                    alignSelf:'center',
                    padding:10,
                    color:'white'
                    }}>TOP UP MY WALLET</Text>     
                </TouchableOpacity>      
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5'
    },
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
});