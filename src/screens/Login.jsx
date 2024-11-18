import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Base_url } from '../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles/Styles';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo,setUserInfo]= useState(null)
  const navigation = useNavigation();

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const res = await axios({
        method: 'post',
        url: Base_url.login,
        data: {
          email: values.email,
          password: values.password,
        },
      });

      // Clear the form fields after submission
      resetForm();

      await AsyncStorage.setItem('email', values.email);

      if (res.data.success === true) {
        const token = res.data.data.token;
        const screen = res.data.screen;
        console.log('Screen from response:', screen);

        // If "Remember Me" is checked, store the credentials or token
        if (isChecked) {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('email', values.email);
          await AsyncStorage.setItem('password', values.password);
        } else {
          // If not checked, remove credentials from AsyncStorage
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('password');
        }

        Alert.alert(res.data.message);

        // Navigate based on the screen value from API response
        if (screen === "login") {
          navigation.navigate('Home');
        } else if (screen === "otp") {
          navigation.navigate('OtpScreen');
        } else {
          Alert.alert('Error', 'Invalid screen value.');
        }
      }
      else if(res.data.success=== false){
        Alert.alert(res.data.message);
      }
        else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login.');
      console.log(error);
    } finally {
      setLoading(false); // Hide loading indicator after API call completes
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
        webClientId: "811814618197-6q4jdsds0cjpi6gs5nj8ofl3oavo1jdr.apps.googleusercontent.com"
    });
}, []);
  // login with googleSignin
  const signIn = async () => {
    try {
      // Check for Google Play Services availability
      await GoogleSignin.hasPlayServices();
  
      // Attempt to sign in
      const userInfo = await GoogleSignin.signIn();
  
      // Update the state with the user info
      setUserInfo(userInfo);
  
      console.log('User Info:', userInfo);
  
      // You can also navigate or handle what to do after the user is signed in
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      // Handle specific errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-In Cancelled', 'You have cancelled the sign-in process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-In In Progress', 'Sign-In is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Error', 'Google Play services are not available or outdated');
      } else {
        // Other errors
        Alert.alert('Error', error.message || 'Something went wrong during sign-in');
      }
    }
  };



// const signIn = async () => {
//     try {
//         await GoogleSignin.hasPlayServices();
//         const usrInfo = await GoogleSignin.signIn();

//         console.log('User Info:', usrInfo);

        
//         dispatch(setUser({
//             id: usrInfo?.data?.user?.id,
//             email: usrInfo?.data?.user?.email,
//             name: usrInfo?.data?.user?.name,
//             photo: usrInfo?.data?.user?.photo
//         }));

       
//         navigation.navigate('BottomTab');
//     } catch (error) {
//         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             Alert.alert('Login cancelled', 'User cancelled the Google login process');
//         } else if (error.code === statusCodes.IN_PROGRESS) {
//             Alert.alert('Login in progress', 'Google login is already in progress');
//         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             Alert.alert('Error', 'Play services are not available on this device');
//         } else {
//             Alert.alert('Error', error.message);
//         }
//     }
// };
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ padding: 0, margin: 0 }}>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={{ flex: 1, width: '100%', height: '100%' }}
      >
        <Formik
          initialValues={{
            email: '', 
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <View style={styles.container}>
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.h1}>Login</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <View style={[styles.textfield_wrapper, { marginTop: 30 }]}>
                  <Text style={[styles.text, { paddingLeft: 8, fontSize: 15 }]}>
                    Email
                  </Text>
                  <TextInput
                    placeholder="Email"
                    style={styles.textfield}
                    placeholderTextColor="#000"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errortext}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.textfield_wrapper}>
                  <Text style={[styles.text, { paddingLeft: 8, fontSize: 15 }]}>
                    Password
                  </Text>
                  <View style={[styles.textfield, { flexDirection: 'row', alignItems: 'center' }]}>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#000"
                      style={[styles.textfield, { flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0 }]}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{ marginRight: 10 }}
                    >
                      <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={30} />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errortext}>{errors.password}</Text>
                  )}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                      value={isChecked}
                      onValueChange={toggleCheckbox}
                      style={{ marginRight: 8 }}
                      tintColors={{ true: 'green', false: '#ffff' }}
                    />
                    <Text style={[styles.text, { marginTop: 0 }]}>
                      Remember Me
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 60 }}>
                  <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text style={styles.btntext}>Login</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20 }}>
                  <Text style={[styles.h3, { textAlign: 'center' }]}>or</Text>
                  <TouchableOpacity style={styles.btnview2} onPress={signIn}>
                    <Image
                      source={require('../assets/google.png')}
                      style={{ height: 40, width: 40, resizeMode: 'contain' }}
                    />
                    <Text
                      style={{
                        color: '#000000',
                        alignSelf: 'center',
                        fontWeight: 'regular',
                        fontSize: 18,
                        marginRight: 40,
                      }}
                    >
                      Continue with Google
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image
                    source={require('../assets/logo.png')}
                    style={{ width: 250, height: 100, resizeMode: 'cover' }}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ImageBackground>
    </ScrollView>
  );
};

export default Login;
