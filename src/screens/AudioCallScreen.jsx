import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_AUDIO_CALL_CONFIG, ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { ZegoConfig } from './utils/Keys';

const AudioCallScreen = ({ route, navigation }) => {
  const [identity, setIdentity] = useState(null);
  const [otherIdentity, setOtherIdentity] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isInRoom, setIsInRoom] = useState(false);

  const { appID, appSign } = ZegoConfig;

  // Function to generate a unique call ID
  const generateCallID = (identity, otherIdentity) => {
    const ids = [identity, otherIdentity];
    ids.sort();
    return ids.join('-');
  };

  // Generate callID if both identities are available
  const callID = identity && otherIdentity ? generateCallID(identity, otherIdentity) : null;

  // useEffect hook to initialize parameters from route
  useEffect(() => {
    if (route.params) {
      const { identity, otherIdentity, userName } = route.params;
      if (identity && otherIdentity && userName) {
        setIdentity(identity);
        console.log("userID", identity);
        setOtherIdentity(otherIdentity);
        setUserName(userName);
      } else {
        console.error('Route params are missing values.');
      }
    } else {
      console.error('Route params are undefined.');
    }
  }, [route.params]);

  // Callback functions
  const handleOnCallEnd = (callID, reason, duration) => {
    console.log('Call ended:', reason);
    navigation.navigate('Chat');
  };

  const handleOnError = (error) => {
    console.error('Zego error:', error);
  };

  const handleRoomJoinStatus = (status) => {
    if (status) {
      setIsInRoom(true);
      console.log('User successfully joined the room.');
    } else {
      setIsInRoom(false);
      console.log('User has not joined the room yet.');
    }
  };

  // Loading state until parameters are available
  if (!identity || !otherIdentity || !userName) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {callID && (
        <ZegoUIKitPrebuiltCall
          appID={appID}
          appSign={appSign}
          userID={identity}
          userName={userName}
          callID={callID}
          config={{
            ...ONE_ON_ONE_VOICE_CALL_CONFIG,
            onCallEnd: handleOnCallEnd,
            onError: handleOnError,
            onJoinRoom: () => handleRoomJoinStatus(true),
            onLeaveRoom: () => handleRoomJoinStatus(false),
            audioOnly: true,
            isCameraOn: false,
            isMicrophoneOn: true,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
});

export default AudioCallScreen;
