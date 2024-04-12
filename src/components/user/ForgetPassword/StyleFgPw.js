const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
    },
    imgBack: {
        marginTop: 10,
        marginLeft: 15,
    },
    viewlogo: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        // width: '70%',
        // height: '90%',
    },
    viewif: {
        width: '100%',
        height: '10%',
        marginTop: 15,
        marginLeft: 15,
    },
    txt1: {
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
    },
    txt2: {
        marginTop: 3,
        fontSize: 20,
        color: '#444444',
    },
    viewinput: {
        position: 'absolute',
        flexDirection: 'row',
        width: 'auto',
        height: 70,
        // justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 20,
        top: 225,
        right: 15,
        left: 15,
      },
    input: {
        flex: 1,
        height: 70,
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#000000',
        fontSize: 18,
    },
    button: {
        position: 'absolute',
        width: 'auto',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3cc8bf',
        borderRadius: 30,
        top: 315,
        left: 15,
        right: 15,
    },
    txt3: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});