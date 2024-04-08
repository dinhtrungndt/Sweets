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
        width: "75",
        height:75,
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
      
        padding:5,
        borderColor:'#22b6c0',
        color:'#22b6c0'
    },
    
    txtTitle1: {
        fontSize: 15,
       
        margin: 7,
      
        padding:5,
        borderColor:'#22b6c0',
        color:'#22b6c0'
    },
    txtContentInfoUser2: {
        fontWeight:'bold',
        fontSize:15,
        marginHorizontal:15,
        marginVertical:17,
      
    },
    
    txtContentInfoUser3: {
        fontWeight:'bold',
        fontSize:16,
        marginHorizontal:15,
       
    },
    imvCheck:{
        borderColor:'#22b6c0',
        borderWidth:1,
        fontSize:13,
        fontWeight:'bold',
        backgroundColor:'#F0F8FF',
        height:30,
        marginVertical:17,
        borderRadius:10,
        padding:6
    },
    wrapDay:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:6,
        backgroundColor:'#DCDCDC',
        borderColor: '#22b6c0',
       
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputWish: {
        backgroundColor: '#f2f2f2',
        padding: 7,
        borderRadius: 8,
       
        width: 200, 
      }
      

});

export default styles;
