import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, Modal, ScrollView, FlatList, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { getParkingDetailsbyParkingLocationId, deleteParkingByParkingLocationId, updateParkingreviewsByReview, getparkingReviewsByLocationId } from '../Netowrks/server';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';
import { getData } from '../AsyncStorage/AsyncStorage';
import { Rating, AirbnbRating } from 'react-native-ratings';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class MyPark extends React.Component {

    state = {
        park_locaion_data: [],
        reviewdata: [
            {
                "reviewId": 2,
                "rating": 4,
                "comment": "Secure       Parking",
                "parkingLocId": 5,
                "reviewerName": "Tripti",
                "reply": "thanks",
                "createDate": "2020-06-14T00:13:24"
            }
        ],
        modalVisible: false,
        comment: '',
        rate: ''

    }

    componentDidMount = () => {
        getData('token', (values) => {
            if (values == null) {
                Actions.login2();
            } else {
                var data = JSON.parse(values);
                this.setState({
                    token: data.token,
                }, () => {
                    this.setState({
                        isFetching: true
                    });
                    getParkingDetailsbyParkingLocationId(data.token, this.props.parkingLocid)
                        .then((value) => {
                            this.setState({
                                isFetching: false,
                                park_locaion_data: value.data
                            }, () => {
                                console.warn(JSON.stringify(value));
                            });
                        })
                        .catch((error) => {
                            this.setState({
                                isFetching: false
                            }, () => {
                                console.warn(error);
                            });
                        });

                    getparkingReviewsByLocationId(data.token, this.props.parkingLocid)
                        .then((value) => {
                            this.setState({
                                isFetching: false,
                                //  reviewdata: value.data
                            }, () => {
                                console.warn(JSON.stringify(value));
                            });
                        })
                        .catch((error) => {
                            this.setState({
                                isFetching: false
                            }, () => {
                                console.warn(error);
                            });
                        });
                });
            }
        });
    }

    deletePark = (parkingLocid) => {
        Alert.alert(
            'Are you sure you want to delete this park ?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        deleteParkingByParkingLocationId(this.state.token, parkingLocid)
                            .then((value) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    this.props.getAllParkingsLocationofAgentFunction(this.state.token);
                                    Actions.pop();
                                });
                            })
                            .catch((error) => {
                                this.setState({
                                    isFetching: false
                                }, () => {
                                    console.warn(error);
                                });
                            });
                    }
                }
            ],
            { cancelable: false }
        );

    }

    addNewRatingModel = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View
                    style={{
                        backgroundColor: '#00000080',
                        opacity: 50,
                        flex: 1,
                        paddingHorizontal: 30,
                        paddingVertical: 50,
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            // alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View style={{ alignItems: 'center' }}>
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 5,
                                    backgroundColor: '#0099e5',
                                    width: '100%',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ color: 'white' }}>Rate Park</Text>
                            </View>


                            <AirbnbRating
                                defaultRating={this.state.rate}
                                onFinishRating={values => this.ratingCompleted(values)}
                            />

                        </View>
                        <View style={{ width: '100%', padding: 10 }}>
                            <TextInput
                                value={this.state.comment}
                                multiline={true}
                                style={{
                                    padding: 10,
                                    alignSelf: 'center',
                                    borderRadius: 5,
                                    borderColor: '#0099e5',
                                    borderWidth: 1,
                                    width: '92%',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    minHeight: 100,
                                    maxHeight: 500

                                }}
                                placeholder={'Enter comment'}
                                onChangeText={(value) => {
                                    this.setState({
                                        comment: value
                                    });
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateParkReviewMethod(
                                    this.state.token,
                                    this.state.reviewId,
                                    this.state.rate,
                                    this.state.comment,
                                    this.state.parkingLocId,
                                    this.state.reply
                                );
                            }}
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                borderColor: '#0099e5',
                                borderTopWidth: 1,
                                width: '100%',
                                alignItems: 'center',
                            }}>
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.isFetching1 ? (
                        <ActivityIndicator
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            animating
                            size="large"
                            color="#85185b"
                        />
                    ) : null}
                </View>
            </Modal>
        );
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    ratingCompleted(rating) {
        this.setState({ rate: rating }, () => { this.rateParkMethod() });
        console.log('Rating is: ' + rating);
    }

    updateParkReviewMethod = (Token, reviewId, rating, comment, parkingLocId, reply) => {
        this.setState({ isFetching: true }, () => {
            updateParkingreviewsByReview(Token, reviewId, rating, comment, parkingLocId, reply)
                .then((value) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        if (value.status == 1) {
                            Alert.alert(
                                'Parking Review update successfully',
                                '',
                                [
                                    { text: 'OK', onPress: () => this.setModalVisible(false) }
                                ],
                                { cancelable: false }
                            );
                        } else {
                            alert(JSON.stringify(value));
                            this.setModalVisible(false)
                        }

                    });
                })
                .catch((error) => {
                    this.setState({
                        isFetching: false
                    }, () => {
                        this.setModalVisible(false);
                        console.warn(error);
                    });
                });

        });
    };

    render = () => {
        return (
            <SafeAreaView style={styles.safe}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={styles.headerbar}>
                        <TouchableOpacity onPress={() => { Actions.pop() }}>
                            <FontAwesome name={'chevron-left'} size={20} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'center', padding: 5 }}>{this.props.parkName}</Text>
                        <Image
                            source={{ uri: 'https://www.abc.net.au/news/image/5391246-3x2-700x467.jpg' }}
                            resizeMode={'contain'}
                            style={{ width: 280, height: 200, alignSelf: "center" }}
                        />

                        <View>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center' }}>{this.props.parkRegion}</Text>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center' }}>{this.props.parkAddress}</Text>
                            <Text style={{ paddingHorizontal: 10, paddingVertical: 5, textAlign: 'center' }}>{this.props.description}</Text>
                        </View>

                        <View style={{ padding: 10 }}>

                            <FlatList
                                data={this.state.park_locaion_data}
                                renderItem={(value) => {
                                    return (
                                        <View style={{ marginTop: 5, borderWidth: 0.5, padding: 5, borderRadius: 5, borderColor: '#0099e5' }}>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                <Text style={{ flex: 1 }}>Vehicle Name</Text>
                                                <Text style={{ flex: 1, textAlign: 'center' }}>:</Text>
                                                <Text style={{ flex: 1, textAlign: 'right' }}>{value.item.vehicleName}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                <Text style={{ flex: 1 }}>Capacity</Text>
                                                <Text style={{ flex: 1, textAlign: 'center' }}>:</Text>
                                                <Text style={{ flex: 1, textAlign: 'right' }}>{value.item.capacity}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                <Text style={{ flex: 1 }}>Monthly Rate</Text>
                                                <Text style={{ flex: 1, textAlign: 'center' }}>:</Text>
                                                <Text style={{ flex: 1, textAlign: 'right' }}>{value.item.monthlyRate}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                <Text style={{ flex: 1 }}>Night Charges</Text>
                                                <Text style={{ flex: 1, textAlign: 'center' }}>:</Text>
                                                <Text style={{ flex: 1, textAlign: 'right' }}>{value.item.nightCharges}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", padding: 5 }}>
                                                <Text style={{ flex: 1 }}>Charges Type</Text>
                                                <Text style={{ flex: 1, textAlign: 'center' }}>:</Text>
                                                <Text style={{ flex: 1, textAlign: 'right' }}>{value.item.chargesType}</Text>
                                            </View>

                                            <View style={{ marginTop: 5, borderColor: '#0099e5', borderTopWidth: 1 }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginHorizontal: 50
                                                }}>
                                                    <Text style={{ textAlign: 'center' }}>Hours</Text>
                                                    <Text style={{ textAlign: 'center' }}>Charges</Text>
                                                </View>
                                                {value.item.parkingChargesDtos.map((value) => {
                                                    return (
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            marginHorizontal: 70,
                                                            marginVertical: 5
                                                        }}>
                                                            <Text style={{ textAlign: 'center' }}>{value.hours}</Text>
                                                            <Text style={{ textAlign: 'center' }}>{value.charges}</Text>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        </View>

                        {(this.state.reviewdata.length != 0) ?
                            <View>
                                <Text style={{ padding: 5, marginHorizontal: 10 }}>Reviews</Text>

                                <FlatList
                                    data={this.state.reviewdata}
                                    renderItem={(value) => {
                                        return (
                                            <View style={{
                                                padding: 5,
                                                marginHorizontal: 10,
                                                borderColor: '#eb4034',
                                                borderWidth: 0.5,
                                                borderRadius: 5,
                                            }}>

                                                <Text style={{ padding: 5 }}>Reviewer name : {value.item.reviewerName}</Text>
                                                <Text style={{ padding: 5 }}>{value.item.rating}</Text>
                                                <Text style={{ padding: 5 }}>{value.item.comment}</Text>
                                                <Text style={{ padding: 5, textAlign: 'right' }}>{value.item.createDate}</Text>

                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            comment: value.item.comment,
                                                            rate: value.item.rating,
                                                            reviewId: value.item.reviewId,
                                                            parkingLocId: value.item.parkingLocId,
                                                            reply: value.item.reply,

                                                        }, () => {
                                                            this.setModalVisible(true)
                                                        });
                                                    }}
                                                    style={{ position: 'absolute', right: 10, top: 10 }}
                                                >
                                                    <FontAwesome name={'edit'} size={30} color={'#0099e5'} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            :
                            null

                        }

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#32a852',
                                marginLeft: 20,
                                marginRight: 5,
                                borderRadius: 5,
                                padding: 8,
                                marginTop: 5,
                                flex: 1
                            }} onPress={() => {
                                Actions.push('arrivedvehiclelist', { 'token': this.state.token, 'parkingLocid': this.props.parkingLocid, 'type': 'arrived' });
                            }}>
                                <Text style={{ textAlign: 'center', color: 'white' }}>Arrived Vehicle List </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: '#0099e5',
                                marginRight: 20,
                                marginLeft: 5,
                                borderRadius: 5,
                                padding: 8,
                                marginTop: 5,
                                flex: 1
                            }}
                                onPress={() => {
                                    Actions.push('arrivedvehiclelist', { 'token': this.state.token, 'parkingLocid': this.props.parkingLocid, 'type': 'upcomming' });
                                }}
                            >
                                <Text style={{ textAlign: 'center', color: 'white' }}>Upcoming Vehicle List </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{
                            backgroundColor: '#eb4034',
                            marginHorizontal: 20,
                            borderRadius: 5,
                            padding: 8,
                            marginTop: 5
                        }}
                            onPress={() => {
                                this.deletePark(this.props.parkingLocid);
                            }}
                        >
                            <Text style={{ textAlign: 'center', color: 'white' }}>Remove park</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                {this.addNewRatingModel()}
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