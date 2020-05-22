import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class Intro extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerview}>
                </View>
                <Text style={styles.headertext}>
                    Intro
                    </Text>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerview: {
        position: 'absolute',
        borderRadius: 255,
        left: -96,
        marginTop: -450,
        width: 600,
        height: 600,
        backgroundColor: '#4287f5'
    },
    headertext: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 25,
        color: 'white',
        textShadowRadius: 1,
        textShadowColor: 'white',
        elevation: 4
    }

});