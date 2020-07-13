import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getAllParkingsLocationofAgent } from '../Netowrks/server';
import { getData } from '../AsyncStorage/AsyncStorage';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Parking extends React.Component {
    state = {
        parking_array: [],
        parking_type:[],
    };

    componentDidMount = () => {
        getData('token', (values) => {
            if (values == null) {
                Actions.replace('login2');
            } else {
                var data = JSON.parse(values);
                this.setState({
                    isFetching: true
                });
                getAllParkingsLocationofAgent(data.token)
                    .then((getAllParkingsLocationofAgentdata) => {
                        this.setState({
                            isFetching: false,
                            parking_array: getAllParkingsLocationofAgentdata.data
                        });
                    }).catch((error) => {
                       this.setState({
                           isFetching:false
                       },()=>{
                        console.warn(error);
                    });
                    }); 
            }
        });
    }

    getAllParkingsLocationofAgentFunction = (token) => {
        getAllParkingsLocationofAgent(token)
            .then((value) => {
                this.setState({
                    isFetching: false,
                    parking_array: value.data
                });
            }).catch((error) => {
                this.setState({
                    isFetching:false
                },()=>{
                    console.warn(error);
                });
            });
    }

    

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
                <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                                    onPress={() => {
                                        Actions.push('mypark',
                                            {
                                                'parkingLocid': value.item.parkingLocid,
                                                'parkName': value.item.parkName,
                                                'parkRegion': value.item.parkRegion,
                                                'parkAddress': value.item.parkAddress,
                                                'description': value.item.description,
                                                getAllParkingsLocationofAgentFunction:this.getAllParkingsLocationofAgentFunction.bind(this)
                                            })
                                    }}>
                                    <Text style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        fontWeight: 'bold'
                                    }}>{value.item.parkName}</Text>
                                    <Image source={{
                                        uri: 'https://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/8/24/1282636392594/car-parking-Leeds-001.jpg'
                                    }}
                                        resizeMode={'contain'}
                                        style={{ height: 180, borderRadius: 5 }} />
                                    <Text style={{ textAlign: 'center', padding: 5 }}>{value.item.parkRegion}</Text>
                                    <Text style={{ textAlign: 'center', padding: 5 }}>{value.item.parkAddress}</Text>
                                    <Text style={{ textAlign: 'center', padding: 5 }}>{value.item.description}</Text>
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
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => {
                            Actions.push('addvehiclepark', { 'user_id': this.props.user_id, 'token': this.props.token,getAllParkingsLocationofAgentFunction:this.getAllParkingsLocationofAgentFunction.bind(this) });
                        }}
                    >
                        <FontAwesome name={'plus'} size={20} />
                    </TouchableOpacity>
                </View>
                {(this.state.isFetching == true) ?
                    <ActivityIndicatorView />
                    :
                    null
                }
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