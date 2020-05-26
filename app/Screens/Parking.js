import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text } from 'react-native';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';

export default class Parking extends React.Component {
    state = {

    };

    render() {
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

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});