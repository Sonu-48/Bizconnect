import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {id: '1', text: 'Hi', type: 'received'},
    {id: '2', text: 'HI', type: 'sent'},
  ]);
  const navigation = useNavigation();

  const [messageText, setMessageText] = useState('');
  

  // StartVideoCall Function
  const handleVideoCall= ()=>{
    navigation.navigate('VideoCallScreen');
  }

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {id: String(prevMessages.length + 1), text: messageText, type: 'sent'},
      ]);
      setMessageText('');
    }
  };

  const renderMessage = ({item}) => (
    
    <View
      style={
        item.type === 'sent' ? styles.sentMessage : styles.receivedMessage
      }>
      <View style={item.type === 'sent' ? styles.bubbleSent : styles.bubbleReceived}>
      <Text style={{ color: item.type === 'sent' ? '#000' : '#fff' }}>{item.text}</Text>
        <View
          style={item.type === 'sent' ? styles.triangleSent : styles.triangleReceived}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View
        style={[
          styles.headersection,
          {padding: 10, justifyContent: 'space-between', alignItems: 'center'},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          style={[
            styles.textfield,
            {width: '60%', marginLeft: 20, padding: 5, marginTop: 0, fontSize: 18},
          ]}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={{marginRight: 25}}>
            <Icon name="call-outline" size={25} color="#ffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVideoCall}>
            <Icon name="videocam-outline" size={25} color="#ffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
      />

      {/* Input Field with Conditional Icons */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon name="camera" size={30} color="#002D93" />
        </TouchableOpacity>
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message"
          style={styles.textInput}
        />
        <TouchableOpacity>
          <Icon name="add" size={30} color="#002D93" style={{marginRight: 10}} />
        </TouchableOpacity>
        {messageText ? (
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" size={30} color="#002D93" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon name="mic" size={30} color="#002D93" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headersection: {
    backgroundColor: '#00008B',
    width: '100%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  textfield: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  messageList: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 10,
    color:'#000',
    maxWidth: '75%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 10,
    maxWidth: '75%',
  },
  bubbleSent: {
    backgroundColor: '#ADD8E6',
    padding: 15,
    borderRadius: 10,
    position: 'relative',
  },
  bubbleReceived: {
    backgroundColor: '#002D93',
    padding: 15,
    borderRadius: 10,
    position: 'relative',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  triangleSent: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ADD8E6',
    position: 'absolute',
    bottom: -15,
    right: 20,
  },
  triangleReceived: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#002D93',
    position: 'absolute',
    bottom: -15,
    left: 7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    marginHorizontal: 10,
  },
});


export default ChatScreen;
