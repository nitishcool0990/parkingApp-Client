import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ExStyles from '../Utility/Styles';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class NewPaymentMethods extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>

                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={()=>{Actions.pop()}}>
                        <FontAwesome name={'chevron-left'} size={20} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.headertext}>
                    NewPaymentMethods
                    </Text>
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


