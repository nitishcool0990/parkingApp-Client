import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class MyPark extends React.Component {

    state = {

    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center' }}>{this.props.park_name}</Text>
                        <Image
                            source={{ uri: 'https://www.abc.net.au/news/image/5391246-3x2-700x467.jpg' }}
                            resizeMode={'contain'}
                            style={{ width: 280, height: 200, alignSelf: "center" }}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>Parking details</Text>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}> 2020-06-05</Text>
                        </View>

                        <View style={{padding:10}}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{flex:1}}>Active Parking</Text>
                                <Text style={{flex:1,textAlign:'center'}}>:</Text>
                                <Text style={{flex:1,textAlign:'right'}}>15</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{flex:1}}>Active Parking</Text>
                                <Text style={{flex:1,textAlign:'center'}}>:</Text>
                                <Text style={{flex:1,textAlign:'right'}}>2</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{flex:1}}>Active Parking</Text>
                                <Text style={{flex:1,textAlign:'center'}}>:</Text>
                                <Text style={{flex:1,textAlign:'right'}}>10</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={{alignSelf:'center'}}>Total income : Rs 350</Text>
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5',
    }, headerbar: {
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