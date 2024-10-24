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
import { useNavigation } from '@react-navigation/native';
import { UserChatData } from './UserChatData';

const ChatInbox = () => {
  const navigation = useNavigation();

  const renderChatData = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
      <View style={styles.chatinboxwrapper}>
        <Image source={item.image} style={{ width: 50, height: 50 }} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: '500' }}>
            {item.name}
          </Text>
          <Text style={{ textAlign: 'center' }}>{item.message}</Text>
        </View>
        <View>
          <Text>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={[styles.headersection, { paddingTop: 20, paddingBottom: 20 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 10,
            width: 50,
            height: 50,
            top: 27,
          }}
        >
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          style={[
            styles.textfield,
            { width: '60%', marginLeft: 20, padding: 5, marginTop: 0 },
          ]}
        />
      </View>
      <FlatList
        data={UserChatData}
        renderItem={renderChatData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    </>
  );
};

export default ChatInbox;
