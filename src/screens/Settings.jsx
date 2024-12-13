import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import styles from './styles/Styles';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base_url } from '../ApiUrl';
import { useNavigation } from '@react-navigation/native';
import Header from '../component/Header';

// Validation schema
const validationSchema = yup.object().shape({
  google: yup.string().required('Google URL is required'),
  facebook: yup.string().required('Facebook URL is required'),
  linkedin: yup.string().required('LinkedIn URL is required'),
  business_name: yup.string().required('Business name is required'),
  profile_name: yup.string().required('Profile name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Settings = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // To handle loader state
  const [error, setError] = useState(null); // To handle error state

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      setLoading(true); // Start the loader
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      console.log('values', values);

      const res = await axios({
        method: 'post',
        url: Base_url.updateProfile,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          google_link: values.google,
          facebook_link: values.facebook,
          linkedin_link: values.linkedin,
          Business_name: values.business_name,
          full_name: values.profile_name,
          email: values.email,
        },
      });

      if (res.data.success === true) {
        console.log('Your Profile has been updated successfully');
        Alert.alert(res.data.message);
        navigation.navigate('ProfileScreen');
      } else {
        setError('Failed to update profile, please try again later');
      }
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false); // Stop the loader once the request is complete
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <Header title="Settings" />

      {/* Formik form */}
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
        }) => (
          <View style={[styles.container, { paddingBottom: 40 }]}>
            {/* Google */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10, marginTop: 30 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
                Google
              </Text>
              <View style={[styles.textfield, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  placeholder="Enter google URL"
                  placeholderTextColor="#AEA9A9"
                  style={[styles.textfield, { flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0 }]}
                  onChangeText={handleChange('google')}
                  onBlur={handleBlur('google')}
                  value={values.google}
                />
                <View>
                  <Image source={require('../assets/google.png')} style={styles.icon} />
                </View>
              </View>
              {touched.google && errors.google && (
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.google}</Text>
              )}
            </View>

            {/* Facebook */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
                Facebook
              </Text>
              <View style={[styles.textfield, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  placeholder="Enter facebook URL"
                  placeholderTextColor="#AEA9A9"
                  style={[styles.textfield, { flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0 }]}
                  onChangeText={handleChange('facebook')}
                  onBlur={handleBlur('facebook')}
                  value={values.facebook}
                />
                <View>
                  <Image source={require('../assets/facebook-icon.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                </View>
              </View>
              {touched.facebook && errors.facebook && (
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.facebook}</Text>
              )}
            </View>

            {/* LinkedIn */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
                LinkedIn
              </Text>
              <View style={[styles.textfield, { flexDirection: 'row', alignItems: 'center' }]}>
                <TextInput
                  placeholder="Enter linkedin URL"
                  placeholderTextColor="#AEA9A9"
                  style={[styles.textfield, { flex: 1, borderWidth: 0, paddingLeft: 0, marginTop: 0 }]}
                  onChangeText={handleChange('linkedin')}
                  onBlur={handleBlur('linkedin')}
                  value={values.linkedin}
                />
                <View>
                  <Image source={require('../assets/linkdin.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                </View>
              </View>
              {touched.linkedin && errors.linkedin && (
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.linkedin}</Text>
              )}
            </View>

            {/* Business Name */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
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
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.business_name}</Text>
              )}
            </View>

            {/* Profile Name */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
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
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.profile_name}</Text>
              )}
            </View>

            {/* Email */}
            <View style={[styles.textfield_wrapper, { marginBottom: 10 }]}>
              <Text style={[styles.text, { paddingLeft: 8, fontSize: 15, color: '#000' }]}>
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
                <Text style={[styles.errortext, { paddingLeft: 10 }]}>{errors.email}</Text>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#25C1F0',
                borderRadius: 20,
                padding: 20,
                marginTop: 20,
              }}
              onPress={handleSubmit}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: 'white', alignItems: 'center', alignSelf: 'center', fontWeight: '600' }}>
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      {/* Display error if there is one
      {error && (
        <View style={{ padding: 10, backgroundColor: 'red', marginTop: 10 }}>
          <Text style={{ color: '#fff' }}>{error}</Text>
        </View>
      )} */}
    </ScrollView>
  );
};

export default Settings;
