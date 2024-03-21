import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7,
        backgroundColor: '#BDD8FD',



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
        margin: 5
    },
    txtContentInfoUser: {
        fontSize: 15,

        margin: 5
    }

});

export default styles;
