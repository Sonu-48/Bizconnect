import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getUser} from '../redux/GetUserSlice';

// Add a fallback image URL or an asset image
const defaultImage = require('../assets/user-image.png');

const ChatInbox = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.getuser.getuser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const renderChatData = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
      <View style={styles.chatinboxwrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.profile_pic ? (
            <Image
              source={{uri: item.profile_pic}}
              style={{width: 50, height: 50, borderRadius: 25}}
            />
          ) : (
            <AntDesign name="user" size={40} color="#000" />
          )}
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontWeight: '500',
              paddingLeft: 20,
            }}>
            {item.full_name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={[styles.headersection, {paddingTop: 20, paddingBottom: 20}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 10,
            width: 50,
            height: 50,
            top: 27,
          }}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          style={[
            styles.textfield,
            {width: '60%', marginLeft: 20, padding: 5, marginTop: 0},
          ]}
        />
      </View>

      {userData && userData.length > 0 ? (
        <FlatList
          data={userData}
          renderItem={renderChatData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.scrollContainer}
        />
      ) : (
        <View>
          <Text style={styles.noDataText}>No users available</Text>
        </View>
      )}
    </>
  );
};

export default ChatInbox;
