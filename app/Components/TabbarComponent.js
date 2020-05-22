import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export default class TabbarComponent extends Component {


    Map = () => {
        Actions.home();
    }

    Booking = () => {
        Actions.booking();
    }

    Parking = () => {
        Actions.parking();
    }

    Favourite = () => {
        Actions.favourite();
    }

    Payment = () => {
        Actions.payment();
    }

    render() {
        return (
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.Map()}>
                    <MaterialIcons name="map" size={25} color="#E5E5E5" />
                    <Text style={styles.tabTitle}>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.Booking()}>
                    <FontAwesome name="tag" size={25} color="#E5E5E5" />
                    <Text style={styles.tabTitle}>Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.Parking()}>
                    <MaterialIcons name="place" size={25} color="#E5E5E5" />
                    <Text style={styles.tabTitle}>Parking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.Favourite()}>
                    <MaterialIcons name="whatshot" size={25} color="#E5E5E5" />
                    <Text style={styles.tabTitle}>Favourite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => this.Payment()}>
                    <MaterialIcons name="money-off" size={25} color="#E5E5E5" />
                    <Text style={styles.tabTitle}>Payment</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBar: {
        // backgroundColor: 'white',
        backgroundColor: '#0099e5',
        height: 60,
        borderTopWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabTitle: {
        fontSize: 11,
        // color: '#3c3c3c',
        color: '#FFFFFF',
        paddingTop: 4
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});