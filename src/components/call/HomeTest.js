import { StyleSheet, Text, View,Button,TextInput } from 'react-native'
import React,{useContext,useState} from 'react'
import { MyContext } from './UseContextTemp';

const HomeTest = ({ navigation }) => {
  const [user, setuser] = useState('');
  const {setName} = useContext(MyContext);
  const EnterName = ({navigation}) => {
    setName(user);
    navigation.navigate('VideoCallPage');
  }
  
  return (
    <View>

      <Text>HomeTest</Text>
      <TextInput
        placeholder="Enter your name"
        value={user}
        onChangeText={(text) => setuser(text)}
      />
      <Button title="VideoCallPage" onPress={() => EnterName({navigation})} />
    </View>
  )
}

export default HomeTest

const styles = StyleSheet.create({})