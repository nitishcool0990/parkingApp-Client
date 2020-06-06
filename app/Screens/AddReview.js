import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AddReview extends React.Component {

    state = {
        review_list: [
            {
                customer_name: 'A',
                rating: '4',
                message: '',
                date: '2020-05-20',
                time: '10:25 AM'
            },
            {
                customer_name: 'B',
                rating: '4',
                message: '',
                date: '2020-05-22',
                time: '11:00 PM'
            },
            {
                customer_name: 'C',
                rating: '4',
                message: '',
                date: '2020-05-21',
                time: '10:28 PM'
            }
        ],
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
                        <FlatList
                            data={this.state.review_list}
                            renderItem={(valus) => {
                                return (
                                    <View style={{
                                        padding:5,
                                        marginBottom:5,
                                        borderBottomWidth:0.5,
                                        borderBottomColor:'gray',

                                        }}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text>{valus.item.customer_name}</Text>
                                            <Text>({valus.item.rating}/5)</Text>
                                        </View>
                                        <Text>{valus.item.message}</Text>
                                        <View style={{flexDirection:'row'}}>
                                        <Text>{valus.item.date}  </Text>
                                        <Text>{valus.item.time}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 10,
                            borderBottomLeftRadius: 15,
                            margin: 1
                        }}>
                            <Text style={{ color: 'blue', fontSize: 10 }}>Total Rating</Text>
                            <Text style={{ color: 'blue' }}>4.3 / 5.0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex: 1,
                            alignItems: 'center',
                            backgroundColor: '#32a852',
                            padding: 10,
                            borderBottomRightRadius: 15,
                            margin: 1,
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'white' }}>Rate this parking</Text>
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