import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class AddVehiclepark extends React.Component {

    state = {
        vehicle_number: '',
        tableHead: ['Vehicle types', 'Capacity', 'Charge'],
        tableData: [
            ['Car', '10', '50'],
            ['Van', '20', '25'],
            ['SUV', '3', '80'],
        ]
    }

    textFieldComponent = (fieldname, val, reg) => {
        return (
            <View style={{ marginTop: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ paddingVertical: 5 }}>
                        {fieldname}
                    </Text>
                    {(reg == true) ?
                        <MaterialIcons name={'star'} color={'red'} />
                        :
                        null
                    }
                </View>

                <TextInput
                    value={this.state[val]}
                    style={{
                        padding: 10,
                        borderRadius: 5,
                        borderColor: '#0099e5',
                        borderWidth: 1,
                        marginTop: 5
                    }}
                    // placeholder={'Name'}
                    onChangeText={(value) => {
                        this.setState({
                            [val]: value
                        });
                    }}
                />
            </View>
        );
    }

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>

                    {this.textFieldComponent('Parking name', 'parking_name', true)}
                    {this.textFieldComponent('Parking address', 'parking_address', true)}

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        marginTop: 5
                    }}>
                        <Text style={{ padding: 5 }}>Vehicle types & capacities</Text>
                        <TouchableOpacity style={{ backgroundColor: '#0099e5', borderRadius: 5 }}>
                            <FontAwesome name={'plus'} size={16} style={{ marginHorizontal: 20, marginVertical: 5 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 5 }}>
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={this.state.tableData} textStyle={styles.text} />
                        </Table>
                    </View>

                    <Text style={{ paddingVertical: 10 }}>Parking image</Text>

                    <TouchableOpacity
                        onPress={() => { }}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                            source={require('../Images/Placeholder.jpg')}
                            resizeMode={'contain'}
                            style={{ width: 250, height: 150 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        padding:10,
                        backgroundColor:'#0099e5',
                        borderRadius:5,
                        marginBottom:20
                        }}>
                        <Text style={{alignSelf:'center',color:'white'}}>SAVE MY PARKING SPACE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5'
    },
    headerbar: {
        flexDirection: 'row',
        backgroundColor: '#0099e5',
        padding: 5,
        width: windowWidth,
        paddingHorizontal: 20,
        alignItems: 'center',
        elevation: 4,
        zIndex: 200
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});