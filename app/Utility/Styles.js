import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ExStyles=StyleSheet.create({
    headerview: {
        position: 'absolute',
        borderRadius: 255,
        left: -windowWidth * 1.45 / 6.5,
        marginTop: -windowWidth - 20,
        width: windowWidth * 1.45,
        height: windowWidth * 1.45,
        backgroundColor: '#0099e5',
        alignItems: 'center',
        elevation: 4,
    },
    headertext: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 25,
        color: 'white',
        textShadowRadius: 1,
        textShadowColor: 'white',
        elevation: 4
    }
});

export default ExStyles;