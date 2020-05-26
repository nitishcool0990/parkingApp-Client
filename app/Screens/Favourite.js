import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TabbarComponent from '../Components/TabbarComponent';
import ExStyles from '../Utility/Styles';

export default class Favourite extends React.Component {

    state = {
        favouritearry: [
            {
                "park_name": 'ANC Park',
                "location": 'Kandy'
            },
            {
                "park_name": 'WCD Park',
                "location": 'Kandy'
            },
            {
                "park_name": 'KKY park',
                "location": 'Kandy'
            }
        ]
    }

    render = () => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={ExStyles.headerview}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={ExStyles.headertext}>
                        Favourite
                    </Text>
                    <View style={{ marginTop: 45 }}>
                        <FlatList
                            data={this.state.favouritearry}
                            renderItem={(item) => {
                                return (
                                    <View style={{ marginTop: 5, marginHorizontal: 5 }}>
                                        <View style={{flexDirection:'row'}}>
                                        <Text style={styles.textpadding}> Park name :</Text>
                                        <Text style={styles.textpadding}>{item.item.park_name}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                        <Text style={styles.textpadding}>City :</Text>
                                        <Text style={styles.textpadding}>{item.item.location}</Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{ padding: 15, backgroundColor: '#08a32c', margin: 5, borderRadius: 5 }}>
                    <Text style={{ textAlign: 'center', color: 'white' }}>Add Favourite</Text>
                </TouchableOpacity>
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

