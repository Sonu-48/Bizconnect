import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi', type: 'received' },
    { id: '2', text: 'HI', type: 'sent' },
  ]);
  const [messageText, setMessageText] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const navigation = useNavigation();

  // Start Video Call Function
  const handleVideoCall = () => {
    navigation.navigate('VideoCallScreen');
  };

  // Send Message Function
  const sendMessage = () => {
    if (messageText.trim() || image) {
      const newMessage = {
        id: String(messages.length + 1),
        text: messageText.trim() || caption, // If there's no message text, use the caption
        type: 'sent',
        image: image ? image.uri : null, // Include image if selected
        caption: caption,
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText('');
      setCaption('');
      setImage(null); // Clear image and caption after sending
    }
  };

  // Pick an Image from the Library
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const renderMessage = ({ item }) => (
    <View
      style={item.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
    >
      <View
        style={item.type === 'sent' ? styles.bubbleSent : styles.bubbleReceived}
      >
        {item.image ? (
          <View>
            <Image source={{ uri: item.image }} style={styles.imagePreview} />
            {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
          </View>
        ) : (
          <Text style={{ color: item.type === 'sent' ? '#000' : '#fff' }}>
            {item.text}
          </Text>
        )}
        <View
          style={
            item.type === 'sent' ? styles.triangleSent : styles.triangleReceived
          }
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container,{marginLeft:0,marginRight:0}]}>
      {/* Header section */}
      <View
        style={[
          styles.headersection,
          { padding: 10, justifyContent: 'space-between', alignItems: 'center' },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          style={[
            styles.textfield,
            { width: '60%', marginLeft: 20, padding: 5, marginTop: 0, fontSize: 18 },
          ]}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginRight: 25 }}>
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
        <TouchableOpacity onPress={pickImage}>
          <Icon name="camera" size={30} color="#002D93" />
        </TouchableOpacity>
        <TextInput
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message"
          style={styles.textInput}
        />
        <TouchableOpacity onPress={pickImage}>
          <Icon name="add" size={30} color="#002D93" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        {messageText || image ? (
          <TouchableOpacity onPress={sendMessage}>
            <Icon name="send" size={30} color="#002D93" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Icon name="mic" size={30} color="#002D93" />
          </TouchableOpacity>
        )}
      </View>

      {/* Image and Caption Input when Image is Selected */}
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.selectedImage} />
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder="Add a caption"
            style={styles.captionInput}
          />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
