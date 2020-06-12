import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Parking extends React.Component {
    state = {
        parking_array: [
            {
                park_name: 'A',
            },
            {
                park_name: 'B',
            },
            {
                park_name: 'C',
            }
        ],
    };

    render() {
        return (
            <SafeAreaView style={styles.safe}>
                {/* <View style={ExStyles.headerview}>
                </View> */}
                <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                <View style={{ flex: 1,backgroundColor:'white'}}>
                    {/* <Text style={ExStyles.headertext}>
                        Parking
                    </Text> */}

                    <FlatList
                        data={this.state.parking_array}
                        renderItem={(value) => {
                            return (
                                <TouchableOpacity style={{
                                    marginTop: 5
                                }}
                                    onPress={() => {Actions.push('mypark')}}>
                                    <Text style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                    }}>{value.item.park_name}</Text>
                                    <Image source={{
                                        uri: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/8/24/1282636392594/car-parking-Leeds-001.jpg'
                                    }}
                                        resizeMode={'contain'}
                                        style={{ height: 180 }} />
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => item.key}
                    />

                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 15,
                        borderRadius: 50,
                        width: 55,
                        height: 55,
                        elevation: 4,
                        backgroundColor: '#0099e5',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    onPress={()=>{
                        Actions.push('addvehiclepark',{'user_id':this.props.user_id,'token':this.props.token});
                    }}
                    >
                        <FontAwesome name={'plus'} size={20} />
                    </TouchableOpacity>
                </View>
                {/* <TabbarComponent /> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0099e5',
    },
    scene: {
        flex: 1,
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
});