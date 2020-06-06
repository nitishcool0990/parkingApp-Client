import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ParkDetails extends React.Component {
    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 16, padding: 5 }}>4th flr, 18, Lansdowne House, Mahakavi Bhushan Marg, Colaba, Mumbai</Text>
                    <View style={{ borderTopWidth: 1 }}>

                    </View>
                    <Text style={{ padding: 5, fontWeight: 'bold' }}>Dates of your reservation</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#32a852',
                            margin: 1,
                            borderRadius: 5
                        }}>
                            <Text style={{color:'white'}}>Entrance</Text>
                            <Text>Today 10:00 AM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            flex: 1,
                            backgroundColor: '#32a852',
                            margin: 1,
                            borderRadius: 5
                        }}>
                            <Text style={{color:'white'}}>Entrance</Text>
                            <Text>Today 10:00 AM</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ alignSelf: 'center', padding: 10 }}>Your reservation duration 1 hour</Text>

                    <Image
                        source={{ uri: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/8/24/1282636392594/car-parking-Leeds-001.jpg' }}
                        resizeMode={'contain'}
                        style={{ height: 180 }}
                    />

                    <Text style={{ padding: 5, fontWeight: 'bold' }}>Descrition</Text>

                    <View style={{ alignSelf: 'center', padding: 5 }}>
                        <Text>This parking is located at 18, lansdowne house, Mahkavi Bhaushan Marg, Colaba, Mumbai. All types of vehicles are allowed for parking in out parking</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        elevation: 4
                    }}>
                        <Text>Book your park</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                            <FontAwesome name={'heart'} size={20} style={{ padding: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.push('addreview')}}>
                            <FontAwesome name={'comment'} size={20} style={{ padding: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ 
                            flex: 1, 
                            alignItems: 'center',
                            padding:10,
                            borderBottomLeftRadius:15,
                            margin:1
                             }}>
                            <Text style={{color:'blue'}}>Rs :80.00 / hour</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ 
                            flex: 1, 
                            alignItems: 'center',
                            backgroundColor: '#32a852',
                            padding:10,
                            borderBottomRightRadius:15,
                            margin:1
                             }}>
                            <Text style={{color:'white'}}>Book Now</Text>
                        </TouchableOpacity>
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