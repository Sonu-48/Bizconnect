import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  PermissionsAndroid
} from 'react-native';
import styles from './styles/Styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  //handleSubmit function
  const handleSubmit = values => {
    console.log('Form submitted', values);
    navigation.navigate('Home');
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '681904798882-r41s7mipcih0gdmsau2ds4c21pq4p476.apps.googleusercontent.com',
    });
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // signwithGoogle function
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      console.log('infoo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        Alert.alert('Error', error.message);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1,}} style={{padding:0,margin:0}}>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={{ flex: 1, width: '100%', height: '100%' }}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => handleSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.container}>
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={styles.h1}>Login</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <View style={[styles.textfield_wrapper, {marginTop: 30}]}>
                  <Text style={[styles.text, {paddingLeft: 8, fontSize: 15}]}>
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
                  <Text style={[styles.text, {paddingLeft: 8, fontSize: 15}]}>
                    Password
                  </Text>
                  <View
                    style={[
                      styles.textfield,
                      {flexDirection: 'row', alignItems: 'center'},
                    ]}>
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#000"
                      style={[
                        styles.textfield,
                        {flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0},
                      ]}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={{marginRight: 10}}>
                      <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errortext}>{errors.password}</Text>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      value={isChecked}
                      onValueChange={toggleCheckbox}
                      style={{marginRight: 8}}
                      tintColors={{true: 'green', false: '#ffff'}}
                    />
                    <Text style={[styles.text, {marginTop: 0}]}>
                      Remember Me
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={[styles.text, {marginTop: 0}]}>
                      Forgotten Password ?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center', marginTop: 60}}>
                  <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btntext}>Login</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop:20}}>
                  <Text style={[styles.h3,{textAlign:'center'}]}>or</Text>
                  <TouchableOpacity style={styles.btnview2} onPress={signIn}>
                    <Image source={require('../assets/google.png')} style={{height:40,width:40,resizeMode:"contain"}}/>
                    <Text style={{ color: '#000000',alignSelf:'center',fontWeight:'regular',fontSize:18,marginRight:40 }}>Continue with google</Text>
                </TouchableOpacity>
                </View>
                <View >
                  <Image source={require('../assets/logo.png')} style={{width:250,height:100,resizeMode:'cover'}}/>
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
