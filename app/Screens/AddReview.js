import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions,TextInput, FlatList, Modal } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Rating, AirbnbRating } from 'react-native-ratings';

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
        modalVisible: false,
        isFetching1: false,
        comment:''
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
                        <View style={{width:'100%',padding:10}}>
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
                                minHeight:100,
                                maxHeight:500
                                
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
                                this.setModalVisible(!this.state.modalVisible);
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

    rateParkMethod = () => {
        this.setState({ isFetching1: true }, () => {
            //   rateTeacher(this.props.user_id, this.props.teacher_id, this.state.rate, this.props.type).then(values => {
            //     if(values.status==1){
            //       this.setState({rate:values.data.teacher_rate,isFetching1: false,modalVisible: false});
            //     }else{
            //       this.setState({isFetching1: false,modalVisible: false});
            //     }
            //   });
            this.setState({
                isFetching1: false
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
                    <View style={{ flex: 1, marginHorizontal: 10 }}>
                        <FlatList
                            data={this.state.review_list}
                            renderItem={(valus) => {
                                return (
                                    <View style={{
                                        padding: 5,
                                        marginBottom: 5,
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: 'gray',

                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text>{valus.item.customer_name}</Text>
                                            <Text>({valus.item.rating}/5)</Text>
                                        </View>
                                        <Text>{valus.item.message}</Text>
                                        <View style={{ flexDirection: 'row' }}>
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
                        }}
                            onPress={() => { this.setModalVisible(true) }}
                        >
                            <Text style={{ color: 'white' }}>Rate this parking</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.addNewRatingModel()}
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