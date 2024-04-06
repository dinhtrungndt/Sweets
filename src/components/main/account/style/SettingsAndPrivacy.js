const {StyleSheet} = require('react-native')

export const styles = StyleSheet.create({
    btnBack: {
        width: '100%',
        height: 50,
        backgroundColor: '#22b6c0',
        flexDirection: 'row',
        alignItems: 'center',   
    },
    imgBack: {
        // width: 24,
        // height: 24,
        marginLeft: 10,
    },
    txtBack: {
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 10,
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imgLanguage: {
        width: 30,
        height: 30,
        position: 'absolute',
        left: 16,
    },
    imgIcon: {
        position: 'absolute',
        left: 10,
    },
    text2: {
        fontSize: 18,
        color: '#000000',
        marginLeft: 10,
    },
    checkbox: {
        position: 'absolute',
        right: 10,
    },
    btnDark: {
        position: 'absolute',
        right: 10,
    },
    modalContainerLanguage: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
    },
    txt2: {
        color: '#000000',
        fontSize: 18,
        marginLeft: 10,
    },
    detailContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});