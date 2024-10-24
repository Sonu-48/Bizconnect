import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        source={require('../assets/profile-image.png')}
        resizeMethod="cover"
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 400,
        }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.h3}>Profile</Text>
            <Image
              source={require('../assets/user2.png')}
              style={{width: 120, height: 120, marginTop: 30, marginBottom: 10}}
            />
            <Text style={styles.h3}>Nick Jones</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
       <View style={{marginTop:40}}>
       <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10,alignItems:'center'}}>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../assets/settings.png')}/>
            <Text style={[styles.h3,{color:'#000000',marginLeft:10}]}>Settings</Text>
          </View>
          <View>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10,alignItems:'center',marginTop:20}}>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../assets/support.png')}/>
            <Text style={[styles.h3,{color:'#000000',marginLeft:10}]}>Support</Text>
          </View>
          <View>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#000000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10,paddingBottom:10,alignItems:'center',marginTop:20}}>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Image source={require('../assets/up-down.png')}/>
            <Text style={[styles.h3,{color:'#000000',marginLeft:10}]}>Feedback</Text>
          </View>
          <View>
          <MaterialIcons name="arrow-forward-ios" size={30} color="#000000" />
          </View>
        </TouchableOpacity>
       </View>
      </View>
    </>
  );
};
export default ProfileScreen;
