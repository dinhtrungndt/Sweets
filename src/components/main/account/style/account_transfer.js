const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    btnBack: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#22b6c0',
    },
    imgBack: {
        // width: 24,
        // height: 24,
        marginLeft: 10,
    },
    txt1: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 18,
        marginLeft: 10,
    },
    body: {
        width: '100%',
        height: 45,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt2: {
        color: '#000000',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 16,
    },
    bodyAccount: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFFFFF',
    },
    AccountFrame:{
        width: '100%',
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    imgAccount: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 15,
    },
    txt3: {
        color: '#000000',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 18,
        marginLeft: 15,
    },
    txt4: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 14,
        position: 'absolute',
        right: 15,
    },
    btnBottomSheet: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnCancel:{
        width: 135,
        height: 45,
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    btnOk: {
        width: 135,
        height: 45,
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    }
})

