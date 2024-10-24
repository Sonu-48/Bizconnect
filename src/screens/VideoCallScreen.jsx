// VideoCallScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VideoCallScreen = () => {
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Video Call Screen</Text>
      {/* Your video call implementation goes here */}
      <View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});

export default VideoCallScreen;
