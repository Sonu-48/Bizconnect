import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar from 'react-native-user-avatar';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {userName, userProfilePic, chatId} = route.params;
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFilePath, setAudioFilePath] = useState('');
  const receiverId = chatId;

  const conversationId = [currentUserId, receiverId].sort().join('_');

  // Audio recorder player setup
  const audioRecorderPlayer = new AudioRecorderPlayer();

  // Fetch current user ID from AsyncStorage
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('user-id');
        setCurrentUserId(userId);
      } catch (error) {
        console.error('Failed to fetch user ID', error);
      }
    };
    fetchCurrentUserId();
  }, []);

  // Fetch chat messages when currentUserId is set
  useEffect(() => {
    if (currentUserId && receiverId) {
      const unsubscribe = firestore()
        .collection('messages')
        .where('conversationId', '==', conversationId)
        .orderBy('timestamp', 'asc')
        .onSnapshot(
          querySnapshot => {
            const messages = [];
            querySnapshot.forEach(doc => {
              messages.push({id: doc.id, ...doc.data()});
            });
            setChatMessages(messages);
          },
          error => {
            console.error('Error fetching messages:', error);
          },
        );
      return () => unsubscribe();
    }
  }, [currentUserId, receiverId]);

  // Handle sending text messages
  const handleSendMessage = async () => {
    if (inputMessage.trim() && currentUserId) {
      const newMessage = {
        senderId: currentUserId,
        receiverId: receiverId,
        message: inputMessage.trim(),
        timestamp: firestore.FieldValue.serverTimestamp(),
        conversationId,
        participants: [currentUserId, receiverId],
      };
      // Optimistically update UI by adding the message instantly
      setChatMessages(prevMessages => [
        ...prevMessages,
        {...newMessage, id: Date.now().toString()},
      ]);
      setInputMessage('');

      // Add message to Firestore
      try {
        await firestore().collection('messages').add(newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        setChatMessages(prevMessages =>
          prevMessages.filter(msg => msg.id !== newMessage.id),
        );
      }
    }
  };

  // Handle sending audio message
  const handleSendAudio = async audioPath => {
    const newMessage = {
      senderId: currentUserId,
      receiverId: receiverId,
      message: '',
      audioUri: audioPath,
      timestamp: firestore.FieldValue.serverTimestamp(),
      conversationId: chatId,
      participants: [currentUserId, receiverId],
    };

    // Optimistically update UI by adding the audio message instantly
    setChatMessages(prevMessages => [
      ...prevMessages,
      {...newMessage, id: Date.now().toString()},
    ]);

    try {
      await firestore().collection('messages').add(newMessage);
    } catch (error) {
      console.error('Error sending audio:', error);
      // Rollback the optimistic update if Firestore fails
      setChatMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== newMessage.id),
      );
    }
  };

  // Request microphone permission (for Android)
  const requestMicrophonePermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
      if (result === RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (error) {
      console.error('Permission request failed', error);
    }
  };

  useEffect(() => {
    requestMicrophonePermission();
    console.log('AudioRecorderPlayer initialized:', audioRecorderPlayer);
  }, [audioRecorderPlayer]);

  // Start or stop recording
  const toggleRecording = async () => {
    try {
      const permissionResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

      if (permissionResult !== RESULTS.GRANTED) {
        console.log('Microphone permission denied');
        return;
      }

      if (audioRecorderPlayer) {
        if (isRecording) {
          const result = await audioRecorderPlayer.stopRecorder();
          setAudioFilePath(result);
          setIsRecording(false);
          handleSendAudio(result);
        } else {
          const path = `${AudioRecorderPlayer.getRecordingPath()}audio_${Date.now()}.aac`;
          console.log('Recording audio to path:', path);
          await audioRecorderPlayer.startRecorder(path);
          setIsRecording(true);
        }
      } else {
        console.error('Audio Recorder Player is not initialized.');
      }
    } catch (error) {
      console.error('Error during recording:', error);
    }
  };

  // Handle sending image
  const handleSendImage = async (assets) => {
    const newMessage = {
      senderId: currentUserId,
      receiverId: receiverId,
      message: '',
      imageUri: assets[0].uri,
      timestamp: firestore.FieldValue.serverTimestamp(),
      conversationId: chatId,
      participants: [currentUserId, receiverId],
    };

    // Optimistically update UI by adding the image message instantly
    setChatMessages(prevMessages => [
      ...prevMessages,
      {...newMessage, id: Date.now().toString()},
    ]);

    try {
      await firestore().collection('messages').add(newMessage);
    } catch (error) {
      console.error('Error sending image:', error);
      // Rollback the optimistic update if Firestore fails
      setChatMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== newMessage.id),
      );
    }
  };

  // Open camera to capture image
  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });
    if (result.assets) {
      handleSendImage(result.assets);
    }
  };

  // Open gallery to select images
  const openGallery = async () => {
    const result = await launchImageLibrary({
      selectionLimit: 4,
      mediaType: 'photo',
    });
    if (result.assets) {
      handleSendImage(result.assets);
    }
  };

  // Delete selected message
  const handleDeleteMessage = async () => {
    if (selectedMessage) {
      try {
        await firestore()
          .collection('messages')
          .doc(selectedMessage.id)
          .delete();
        setChatMessages(prevMessages =>
          prevMessages.filter(msg => msg.id !== selectedMessage.id),
        );
        setSelectedMessage(null);
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const renderChatMessage = ({item}) => {
    return (
      <TouchableOpacity
        style={[styles.chatBubble, item.senderId === currentUserId ? styles.senderBubble : styles.receiverBubble]}
        onLongPress={() => setSelectedMessage(item)}
      >
        {item.audioUri ? (
          <TouchableOpacity onPress={() => audioRecorderPlayer.startPlayer(item.audioUri)}>
            <Text style={styles.chatText}>Audio Message</Text>
          </TouchableOpacity>
        ) : item.imageUri ? (
          <Image source={{uri: item.imageUri}} style={styles.chatImage} />
        ) : (
          <Text style={styles.chatText}>{item.message}</Text>
        )}
        {selectedMessage?.id === item.id && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteMessage}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Fix for keyExtractor: Safely check timestamp before calling toMillis()
  const keyExtractor = item => {
    if (item.timestamp && item.timestamp.toMillis) {
      return item.timestamp.toMillis().toString();
    }
    return item.messageId?.toString() || Math.random().toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{userName}</Text>
        {userProfilePic ? (
          <Image source={{uri: userProfilePic}} style={styles.profilePic} />
        ) : (
          <UserAvatar size={50} name={userName || 'Default Name'} />
        )}
      </View>

      <FlatList
        data={chatMessages}
        renderItem={renderChatMessage}
        keyExtractor={keyExtractor}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={openCamera}>
          <Image
            source={require('../assets/camera-icon.png')}
            style={{width: 30}}
          />
        </TouchableOpacity>
        <View style={styles.inputWithSend}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={inputMessage}
            onChangeText={text => setInputMessage(text)}
          />
          <TouchableOpacity
            onPress={inputMessage.trim() ? handleSendMessage : toggleRecording}
            style={styles.sendButton}>
            {inputMessage.trim() ? (
              <Ionicons name="send" size={25} color="#007AFF" />
            ) : (
              <Image source={require('../assets/microphone.png')} style={{width: 25}} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={openGallery}>
          <Image source={require('../assets/add-icon.png')} style={{width: 25}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f4f4f4'},
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
  profilePic: {width: 40, height: 40, borderRadius: 20},
  chatArea: {flex: 1},
  chatContent: {padding: 10},
  chatBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  senderBubble: {alignSelf: 'flex-end', backgroundColor: '#00B8F4'},
  receiverBubble: {alignSelf: 'flex-start', backgroundColor: '#E4E6EB'},
  chatText: {fontSize: 16, color: '#000'},
  chatImage: {width: 200, height: 200, borderRadius: 10},
  inputWithSend: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {position: 'absolute', right: 10, alignSelf: 'center'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
});
export default ChatScreen;
