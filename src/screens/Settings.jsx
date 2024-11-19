import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_url} from '../ApiUrl';
import {useNavigation} from '@react-navigation/native';

// Validation
const validationSchema = yup.object().shape({
  google: yup.string().required('Google url is required'),
  facebook: yup.string().required('facebook url is required'),
  linkedin: yup.string().required('linkedin url is required'),
  business_name: yup.string().required('Business name is required'),
  profile_name: yup.string().required('Profile name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Settings = () => {
  const navigation = useNavigation();
  // handleSubmit
  const handleSubmit = async values => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      const res = await axios({
        method: 'post',
        url: Base_url.updateProfile,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          google_link: values.google,
          facebook_link: values.facebook,
          linkedin_link: values.linkedin,
          business_name: values.business_name,
          full_name: values.profile_name,
          email: values.email,
        },
      });
      if (res.data.success === true) {
        console.log('Your Profile has been updated successfully');
        Alert.alert(res.data.message);
        navigation.navigate('ProfileScreen');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/*headersection */}
      <View
        style={[
          styles.headersection,
          {paddingTop: 20, paddingBottom: 20, marginTop: 1},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 10,
            width: 50,
            height: 50,
            top: 25,
          }}>
          <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.h3}>Settings</Text>
      </View>
      <Formik
        initialValues={{
          google: '',
          facebook: '',
          linkedin: '',
          business_name: '',
          profile_name: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          resetForm,
        }) => (
          <View style={[styles.container, {paddingBottom: 40}]}>
            {/* google textinput */}
            <View
              style={[
                styles.textfield_wrapper,
                {marginBottom: 10, marginTop: 30},
              ]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Google
              </Text>
              <View
                style={[
                  styles.textfield,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  placeholder="Enter google url"
                  placeholderTextColor="#AEA9A9"
                  style={[
                    styles.textfield,
                    {flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0},
                  ]}
                  onChangeText={handleChange('google')}
                  onBlur={handleBlur('google')}
                  value={values.google}
                />
                <View>
                  <Image
                    source={require('../assets/google.png')}
                    style={styles.icon}
                  />
                </View>
              </View>
              {touched.google && errors.google && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.google}
                </Text>
              )}
            </View>
            {/* facebook */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Facebook
              </Text>
              <View
                style={[
                  styles.textfield,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  placeholder="Enter facebook url"
                  placeholderTextColor="#AEA9A9"
                  style={[
                    styles.textfield,
                    {flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0},
                  ]}
                  onChangeText={handleChange('facebook')}
                  onBlur={handleBlur('facebook')}
                  value={values.facebook}
                />
                <View>
                  <Image
                    source={require('../assets/facebook-icon.png')}
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                </View>
              </View>
              {touched.facebook && errors.facebook && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.facebook}
                </Text>
              )}
            </View>
            {/* linkdin */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Linkdin
              </Text>
              <View
                style={[
                  styles.textfield,
                  {flexDirection: 'row', alignItems: 'center'},
                ]}>
                <TextInput
                  placeholder="Enter linkedin url"
                  placeholderTextColor="#AEA9A9"
                  style={[
                    styles.textfield,
                    {flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0},
                  ]}
                  onChangeText={handleChange('linkedin')}
                  onBlur={handleBlur('linkedin')}
                  value={values.linkedin}
                />
                <View>
                  <Image
                    source={require('../assets/linkdin.png')}
                    style={{width: 30, height: 30, marginRight: 10}}
                  />
                </View>
              </View>
              {touched.linkedin && errors.linkedin && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.linkedin}
                </Text>
              )}
            </View>
            {/* Business Name */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Business Name
              </Text>
              <TextInput
                placeholder="business name"
                style={styles.textfield}
                placeholderTextColor="#AEA9A9"
                onChangeText={handleChange('business_name')}
                onBlur={handleBlur('business_name')}
                value={values.business_name}
              />
              {touched.business_name && errors.business_name && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.business_name}
                </Text>
              )}
            </View>
            {/* Profle Name */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Profile Name
              </Text>
              <TextInput
                placeholder="profile name"
                style={styles.textfield}
                placeholderTextColor="#AEA9A9"
                onChangeText={handleChange('profile_name')}
                onBlur={handleBlur('profile_name')}
                value={values.profile_name}
              />
              {touched.profile_name && errors.profile_name && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.profile_name}
                </Text>
              )}
            </View>
            {/* Email */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Email
              </Text>
              <TextInput
                placeholder="Email"
                style={styles.textfield}
                placeholderTextColor="#AEA9A9"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.email}
                </Text>
              )}
            </View>
            {/* Save button */}
            <TouchableOpacity
              // onPress={handleSubmit}
              style={{
                backgroundColor: '#25C1F0',
                borderRadius: 20,
                padding: 20,
                marginTop: 20,
              }}
              onPress={handleSubmit}>
              <Text
                style={{
                  color: 'white',
                  alignItems: 'center',
                  alignSelf: 'center',
                  fontWeight: '600',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
export default Settings;
