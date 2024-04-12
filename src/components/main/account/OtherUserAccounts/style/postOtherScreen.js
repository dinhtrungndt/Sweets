const { StyleSheet } = require('react-native');

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
    container_avatar_name: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 16,
        marginBottom: 10,
    },
    container_avatar_name2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    postContainer: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    container_avatar_name: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        position: 'absolute',
        left: 45,
        top: 0
    },
    time: {
        position: 'absolute',
        left: 45,
        top: 18
    },
    postContent: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 16,
    },
    postImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    container_media: {},
    swiper: {
        height: 375,
    },
    imageCountContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    imageCountText: {
        color: '#FFF',
        fontSize: 12,
    },
    postAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
        paddingBottom: 6,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    postActionItem: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    postActionIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    postActionText: {
        fontSize: 16,
    },
    text_like_post: {
        marginLeft: 5,
    },
    posts: {
      width: '100%',
      height: 350,
    },
});
    