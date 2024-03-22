import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        backgroundColor: '#22b6c0',



        elevation: 65,
    },
    wrapContent2: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    friendItem: {
        padding: 15,
    },
    avatar: {
        width: 20,
        height: 20,
    },
    avatar2: {
        width: 140,
        height: 140,
    },
    avatar3: {
        width: 55,
        height:55,
        margin:10,
        alignSelf:'center'

    },
    txtContent1: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    Calendar: {
        margin: 10,
        borderRadius: 10,

    },
    wrapInfoUser: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    txtTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        margin: 5,
        borderBottomWidth:0.5,
        padding:5,
        borderColor:'#22b6c0',
        color:'#22b6c0'
    },
    txtContentInfoUser2: {
        fontWeight:'bold',
        fontSize:16,
        marginHorizontal:15,
        marginVertical:17
    }

});

export default styles;
