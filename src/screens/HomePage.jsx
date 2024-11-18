import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles/Styles';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const navigation = useNavigation();

  // get token from AsyncStorage
  const [token, setToken] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('token').then(value => {
      if (value !== null) {
        setToken(value);
        console.log('token', value);
      }
    });
  }, []);

  // Exit function from Home
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Do you want to exit the app',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Ok', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
      return true;
    };

    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.headersection}>
        {/* <Text style={styles.h5}>Bizconnect</Text> */}
        <Image
          source={require('../assets/logo.png')}
          style={{width: 200, height: 70, marginLeft: 10}}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('Review')}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/reviews.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Reviews</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/webchat.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Web Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapper}>
          <TouchableOpacity style={{flex: 1}}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/social.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Social</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/video-conference.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Video Conference</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.wrapper}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('Chat')}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/messaging.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Messaging</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/invoice.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>
                Payments & Invoice
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}
        {/* <View style={styles.wrapper}>
          <TouchableOpacity style={{flex:1}}>
            <LinearGradient
            colors={['#00008B', '#ADD8E6']}
            style={styles.linearGradient}>
            <Image source={require('../assets/doller.png')} />
            <Text style={[styles.h5,{marginTop:10}]}>Sales</Text>
          </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1}}>
          <LinearGradient
            colors={['#00008B', '#ADD8E6']}
            style={styles.linearGradient}>
            <Image source={require('../assets/video.png')} />
            <Text style={[styles.h5,{marginTop:10}]}>Video Chat</Text>
          </LinearGradient>
          </TouchableOpacity>
        </View> */}
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('Invoices')}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/invoices.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Invoices</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}}>
            <LinearGradient
              colors={['#00008B', '#ADD8E6']}
              style={styles.linearGradient}>
              <Image source={require('../assets/doller.png')} />
              <Text style={[styles.h5, {marginTop: 10}]}>Insights</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default HomePage;
