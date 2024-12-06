import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Chatbackup = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const { userName, userProfilePic, chatId } = route.params;

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('user-id');
      setUserId(storedUserId);
    };

    fetchUserId();

    // Firestore reference for the current chat
    const messagesRef = firestore().collection('chats').doc(chatId);

    // Fetch existing messages for this specific chat
    messagesRef.onSnapshot(snapshot => {
      const messagesData = snapshot.data()?.messages || [];
      setMessages(messagesData.reverse());
    });

    return () => {
      // Cleanup the listener when the component unmounts
      messagesRef.onSnapshot(() => {});
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (isSending || !userId) return;
  
    setIsSending(true);
  
    try {
      let imageUrl = null;
  
      // If there's an image, upload it first
      if (image) {
        console.log("Uploading image with URI:", image.uri);
  
        // Ensure the image.uri is a valid path before uploading
        const uploadTask = firebase
          .storage()
          .ref()
          .child(`images/${image.fileName}`)
          .putFile(image.uri);
        
        await uploadTask.on(
          'state_changed',
          snapshot => {},
          error => {
            throw new Error('Image upload failed');
          },
          async () => {
            imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
          }
        );
      }
  
      // Create the message object
      const newMessage = {
        text: messageText.trim() || caption,
        type: 'sent',
        image: imageUrl,
        caption: caption,
        senderId: userId,
        receiverId: chatId,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };
  
      // Firestore reference for the current chat
      const messagesRef = firestore().collection('chats').doc(chatId);
  
      // Add the new message to Firestore
      await messagesRef.update({
        messages: firestore.FieldValue.arrayUnion(newMessage),
      });
      setMessageText('');
      setCaption('');
      setImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };
  

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const renderMessage = ({ item }) => (
    <View
      style={[item.senderId === userId ? styles.sentMessage : styles.receivedMessage]}>
      <View
        style={item.senderId === userId ? styles.bubbleSent : styles.bubbleReceived}>
        {item.image ? (
          <View>
            <Image source={{ uri: item.image }} style={styles.imagePreview} />
            {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
          </View>
        ) : (
          <Text style={{ color: item.senderId === userId ? '#000' : '#fff' }}>
            {item.text}
          </Text>
        )}
        <View
          style={item.senderId === userId ? styles.triangleSent : styles.triangleReceived}
        />
        <Text style={styles.timestamp}>
          {moment(item.timestamp?.toDate()).format('h:mm A')}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userName}</Text>
        <Image source={{ uri: userProfilePic }} style={styles.profilePic} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.timestamp.toString()}
        style={styles.messageList}
      />

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#002D93',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profilePic: { width: 40, height: 40, borderRadius: 20 },
  messageList: { flex: 1, paddingTop: 10 },
  sentMessage: { alignSelf: 'flex-end' },
  receivedMessage: { alignSelf: 'flex-start' },
  bubbleSent: {
    backgroundColor: '#00B8F4',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  bubbleReceived: {
    backgroundColor: '#E4E6EB',
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  triangleSent: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: '#00B8F4',
  },
  triangleReceived: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    width: 0,
    height: 0,
    borderRightWidth: 10,
    borderRightColor: '#E4E6EB',
  },
  imagePreview: { width: 200, height: 200, borderRadius: 10 },
  caption: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 5 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  selectedImage: { width: 100, height: 100, marginRight: 10, borderRadius: 10 },
  captionInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});

export default Chatbackup;
	