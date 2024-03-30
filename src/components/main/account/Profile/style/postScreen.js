const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        color: '#000000',
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 10,
        // margin: 10,
    },
    imgIcon: {
        width: 30,
        height: 30,
    },
    text2: {
        fontSize: 18,
        marginLeft: 10,
    },
    text3: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 6,
        color: '#000000',
    },
    BtnEditDetail: {
        backgroundColor: '#cfe2f3',
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    text4: {
        fontSize: 18,
        color: '#0b5394',
    },
});