const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    body:{
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
    },
    btnBackyourself:{
        width: '100%',
        height: 50,
        backgroundColor: '#22b6c0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgAvt:{
        width: 24,
        height: 24,
        marginLeft: 10,
    },
    txtShowImg:{
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 10,
    },
    txt1:{
        color: '#000000',
        fontSize: 18,
        marginLeft: 15,
        marginTop: 10,
    },
    errorText:{
        color: 'red',
        marginLeft: 15,
        marginTop: 5,
    },
    title:{
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        marginTop: 10,
    },
    input:{
        width: '92.5%',
        height: 60,
        marginLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#bcbcbc',
    },
    btnUpdate:{
        width: '50%',
        height: 45,
        backgroundColor: '#22b6c0',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
    }
});