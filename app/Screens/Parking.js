import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';

export default class Parking extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Parking
                    </Text>
                </View>

                <TabbarComponent />
            </SafeAreaView>
        );
    }
}

