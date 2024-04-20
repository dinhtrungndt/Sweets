const { StyleSheet } = require('react-native');

export const styles = StyleSheet.create({
    modalContainerYourself: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    btnBackyourself: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
    },
    body: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    modalContainerCoverImg: {
        position: 'absolute',
        width: '100%',
        height: 240,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        borderTopStartRadius: 30,
        bottom: 0,
    },
    btnShowImg: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingLeft: 16,
        alignItems: 'center',
    },
    btnCancel: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingLeft: 16,
        alignItems: 'center',
    },
    imgAvt: {
        width: 24,
        height: 24,
    },
    txtShowImg: {
        color: '#000000',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 24,
        marginLeft: 16,
    },
    txtCancel: {
        color: '#ff0000',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 24,
        marginLeft: 16,
    },
    modalContainerAvatar: {
        position: 'absolute',
        width: '100%',
        height: 240,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        borderTopStartRadius: 30,
        bottom: 0,
    },
    editFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        padding: 10,
    },
    imgBack: {
        width: 24,
        height: 24,
        marginLeft: 6
    },
    btnMore: {
        position: 'absolute',
        padding: 10,
        left: 339,
    },
    imgMore: {
        width: 24,
        height: 24,
    },
    profileFrame: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFFFFF',
    },
    imgCover: {
        width: '100%',
        height: 210,
        position: 'absolute',
    },
    boderCamera: {
        width: 42,
        height: 42,
        borderRadius: 30,
        backgroundColor: '#bcbcbc',
        position: 'absolute',
        top: 153,
        right: 16,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    iconCamera: {
    },
    imgAvatar: {
        width: 120,
        height: 120,
        borderRadius: 100,
        position: 'absolute',
        top: 150,
        alignSelf: 'center',
    },
    boderCameraAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#bcbcbc',
        position: 'absolute',
        top: 225,
        left: 234,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    textName: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 270,
        color: '#000000',
        textAlign: 'center',
    },
    containerFriends: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        marginTop: 10,
    },
    txtFriendsNumber: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 18,
        color: '#000000',
        marginLeft: '5%',
    },
    txtFriends: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontSize: 14,
        alignSelf: 'center',
        marginLeft: 5,
    },
    btnIntroduce: {
        width: '90%',
        height: 40,
        backgroundColor: '#22b6c0',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        flexDirection: 'row'
    },
    textIntroduce: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        alignSelf: 'center',
    },
    btnEditProfile: {
        width: '90%',
        height: 40,
        backgroundColor: '#ccd3d7',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 10,
    },
    imgEdit: {
        width: 21,
        height: 21,
        alignSelf: 'center',
        left: -3
    },
    txtEdit: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
    },
});