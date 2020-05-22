import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Dimensions, FlatList, TextInput, Image, TouchableOpacity, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker, Coordinate } from 'react-native-maps';
import TabbarComponent from '../Components/TabbarComponent';


export default class Home extends React.Component {

    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        selectedLocation: '',
        modalVisible: false,
        vehiclelist: [
            {
                name: 'car'
            },
            {
                name: 'van'
            }, {
                name: 'bus'
            }]
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }

    toggleModal = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
                <View style={styles.headerview}>
                    <Text style={styles.headertext}>
                        Vpark
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', top: 50, paddingHorizontal: 20, alignItems: 'center' }}>
                    <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: 'white' }}>Welcome Mr. ABC</Text>
                    <TouchableOpacity>
                        <Image source={require('../Images/profile.png')} resizeMode={'center'} style={{ width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    position: 'absolute',
                    width: '90%',
                    height: 80,
                    backgroundColor: 'white',
                    bottom: 120,
                    left: '5%',
                    right: '5%',
                    elevation: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 15,
                    borderRadius: 40,
                    backgroundColor: '#0099e5'
                }}>
                    <TouchableOpacity>
                        <FontAwesome name='search' size={40} color={'white'} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder={'Select Location'}
                        placeholderTextColor={'white'}
                        value={this.state.selectedLocation}
                        onChangeText={(value) => {
                            this.setState({
                                selectedLocation: value
                            });
                        }}
                        style={{
                            //textAlign: 'center', 
                            marginLeft: 10,
                            flex: 1,
                            fontSize: 20
                        }}
                    />
                    <TouchableOpacity onPress={() => { this.toggleModal(true) }}>
                        <Image
                            source={require('../Images/btn_car.png')}
                            resizeMode={'center'}
                            style={{
                                width: 60,
                                height: 60,
                                elevation: 4,
                                backgroundColor: 'white',
                                borderRadius: 60
                            }} />
                    </TouchableOpacity>
                </View>

                <TabbarComponent />

                <Modal
                    animationType="fade" //slide
                    //transparent={false}
                    visible={this.state.modalVisible} //
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                    }}
                    transparent={true}
                >
                    <View style={{
                        backgroundColor: '#00000080',
                        opacity: 50,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 5,
                            width: '90%',
                            height: '80%',
                            alignItems: 'center',
                        }}>

                            <View style={{marginTop:10}}>
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={this.state.vehiclelist}
                                    numColumns={2}
                                    renderItem={(value) => {
                                        return (
                                            <TouchableOpacity style={{
                                                height: 100,
                                                elevation: 4,
                                                backgroundColor: '#0099e5',
                                                width: 170,
                                                margin: 1,
                                                borderRadius:5,
                                                alignItems:'center'
                                            }}>
                                                <Text style={{textAlign:'center',padding:5}}>{value.item.name}</Text>
                                                <Image 
                                                source={require('../Images/btn_car.png')}
                                                resizeMode={'center'}
                                                style={{width:90,height:90}}/>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(value) => {

                                    }}
                                />
                                <TouchableOpacity
                                onPress={() => { this.toggleModal(false) }}
                                style={{ marginBottom: 25 }}
                            >
                                <Text style={{textAlign:'center'}}>Cancel</Text>
                            </TouchableOpacity>
                            </View>     
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerview: {
        position: 'absolute',
        borderRadius: 255,
        left: -96,
        marginTop: -450,
        width: 600,
        height: 600,
        backgroundColor: '#0099e5',
        alignItems: 'center',
        elevation: 4
    },
    headertext: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 15,
        fontSize: 25,
        color: 'white',
        textShadowRadius: 1,
        textShadowColor: 'white',
        elevation: 4
    }

});