import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Booking extends React.Component {

    state = {
        bookingarray: [
            {
                booking_id: '01',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
                amount: '150',
                status: 'Active',
            },
            {
                booking_id: '02',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
                amount: '250',
                status: 'Cancel',
            },
            {
                booking_id: '03',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
                amount: '150',
                status: 'Complete',
            },
            {
                booking_id: '04',
                vehiclepark: 'abc',
                vehicle_no: 'ABD123123',
                date: '2020-03-05',
                time: '12:34 PM',
                amount: '250',
                status: 'Complete',
            }
        ],
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                {/* <View style={ExStyles.headerview}>
                </View> */}
                <View style={styles.headerbar2}>
                    <TouchableOpacity onPress={() => { }}>
                        {/* <FontAwesome name={'chevron-left'} size={25} color={'white'} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Actions.drawerOpen(); }}>
                        <FontAwesome name={'bars'} size={30} color={'white'} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    {/* <Text style={ExStyles.headertext}>
                        Booking
                    </Text> */}

                    <View style={{ marginTop: 10, flex: 1 }}>
                        <FlatList
                            data={this.state.bookingarray}
                            renderItem={(item) => {
                               var color="";
                               if(item.item.status=="Active"){
                                color="green"
                               }else if(item.item.status=="Cancel"){
                                color="red"
                               }else {
                                color="blue"
                               }

                                return (
                                    <View style={{
                                        marginTop: 10,
                                        marginHorizontal: 10,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: color
                                    }}>
                                        <View style={{ flexDirection: 'row',backgroundColor:color }}>
                                            <Text style={{padding:2,color:'white'}}>Vehicle Park : </Text>
                                            <Text style={{padding:2,color:'white'}}>{item.item.vehiclepark}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Booking No : </Text>
                                            <Text style={styles.textpadding}>{item.item.booking_id}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Vehicle No : </Text>
                                            <Text style={styles.textpadding}>{item.item.vehicle_no}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textpadding}>Total Charge : </Text>
                                            <Text style={styles.textpadding}>{item.item.amount}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                            <Text style={styles.textpadding}>{item.item.date}</Text>
                                            <Text style={styles.textpadding}>{item.item.time}</Text>
                                        </View>

                                        <View style={{ position: 'absolute', right: 5 }}>
                                            <Text style={{color:'white'}}>2 Hours</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <TouchableOpacity style={{ padding: 15, backgroundColor: '#08a32c', margin: 5, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: 'white' }}>Add Booking</Text>
                    </TouchableOpacity>
                </View>
                <TabbarComponent />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5'
    },
    textpadding: {
        padding: 2
    },
    headerbar2: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200,
        justifyContent: 'space-between'
    },
});



