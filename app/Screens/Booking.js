import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Booking extends React.Component {

    state = {
        bookingarray: [
            {
                booking_id: '01',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
            },
            {
                booking_id: '01',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
            }
        ],
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Booking
                    </Text>

                    <View style={{ marginTop: 40,flex:1 }}>
                        <FlatList
                            data={this.state.bookingarray}
                            renderItem={(item) => {
                                return (
                                    <View style={{ 
                                        marginTop: 10, 
                                        marginHorizontal: 10,
                                        
                                         }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Booking No : </Text>
                                            <Text style={styles.textpadding}>{item.item.booking_id}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Vehicle Park : </Text>
                                            <Text style={styles.textpadding}>{item.item.vehiclepark}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Vehicle No : </Text>
                                            <Text style={styles.textpadding}>{item.item.vehicle_no}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Date : </Text>
                                            <Text style={styles.textpadding}>{item.item.date}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Time : </Text>
                                            <Text style={styles.textpadding}>{item.item.time}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{padding:15,backgroundColor:'#08a32c',margin:5,borderRadius:5}}>
                        <Text style={{textAlign:'center',color:'white'}}>Add Booking</Text>
                    </TouchableOpacity>
                </View>
                <TabbarComponent />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    textpadding: {
        padding: 2
    }
});



