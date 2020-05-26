import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Account extends React.Component {

    state = {
        visible:''
    }

    btnView = (name,sub) => {
        return (
            <TouchableOpacity
                onPress={() => { 
                    this.setState({
                    visible: name
                })}}
                style={{
                    padding: 25,
                    backgroundColor: '#0099e5',
                    borderRadius: 5,
                    marginVertical: 2,
                    marginHorizontal: 10,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}
            >
                <View>
                <Text style={{ color: 'white', fontSize: 18 }}>{name}</Text>
                <Text style={{ color: 'white', fontSize: 14,marginTop:5 }}>{sub}</Text>
                </View>
                <FontAwesome name={'angle-right'} size={30} color={'white'}/>
            </TouchableOpacity>
        );
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
                        Account
                    </Text>

                    <View style={{ marginTop: 50 }}>
                        {this.btnView('Porfile','Edit my persional infomation')}
                        {this.btnView('Vehicles','0 register vehicles')}
                        {this.btnView('Fines', 'Fine(s) still cancellable' )}
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


