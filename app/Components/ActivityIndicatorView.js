import React from 'react';
import {View,Text,ActivityIndicator } from 'react-native';

export default class ActivityIndicatorView extends React.Component {
    render = () => {
        return (
            <View
                style={{
                    paddingVertical: 20,
                    backgroundColor: 'rgba(52, 52, 52, 0.4)',
                    borderColor: '#CED0CE',
                    position: 'absolute',
                    alignItems: 'center',
                    left: '0%',
                    right: '0%',
                    top: '0%',
                    bottom: '0%',
                }}
            >
                <View style={{
                    paddingVertical: 20,
                    borderColor: '#CED0CE',
                    position: 'absolute',
                    alignItems: 'center',
                    left: '35%',
                    right: '35%',
                    top: '50%',
                    bottom: '45%',
                }}>
                    <Text style={{ padding: 5, color: 'white' }}>Loading...</Text>
                    <ActivityIndicator animating size="large" color='#00A497' />
                </View>
            </View>
        );
    }
}