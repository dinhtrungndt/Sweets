const {StyleSheet} = require('react-native');

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containner: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    containerText: {
        width: 126,
        height: 195,
        marginTop: 6,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        // backgroundColor: '#000000',
    },
    txtContent: {
        width: 112.5,
        height: 45,
        backgroundColor: '#22b6c0',
        borderRadius: 15,
        fontSize: 12,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    posts: {
        width: 126,
        height: 195,
        marginLeft: 6,
        marginTop: 6,
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
});