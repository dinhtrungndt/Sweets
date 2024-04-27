const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    txt1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginLeft: 16,
        marginTop: 16,
    },
    containner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
    },
    posts: {
        width: 123,
        height: 123,
        marginLeft: 6,
    },
    containnerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    imgModal: {
        width: '100%',
        height: '100%',
    },
    txtModal: {
        color: '#FFFFFF',
        fontSize: 20,
    },
})