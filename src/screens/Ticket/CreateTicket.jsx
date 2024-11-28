import React, {useState} from 'react';
import {
    ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import styles from '../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Base_url} from '../../ApiUrl';

// Validation schema
const validationSchema = yup.object().shape({
  ticket_subject: yup.string().required('Ticket subject is required'),
  ticket_priority: yup.string().required('Ticket priority is required'),
  ticket_body: yup.string().required('Ticket body is required'),
});

const CreateTicket = () => {
  const navigation = useNavigation();
  const [priority, setPriority] = useState('');
  const [loading,setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (values, {resetForm}) => {
    try {
        setLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      // Make the API request to create the ticket
      const res = await axios({
        method: 'post',
        url: Base_url.createTicket,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        data: {
          ticket_subject: values.ticket_subject,
          ticket_priority: values.ticket_priority,
          ticket_body: values.ticket_body,
        },
      });

      if (res.data.success === true) {
        setLoading(false);
        // Reset the form fields on success
        resetForm();
        console.log('Ticket created successfully');
        Alert.alert(res.data.message);

        navigation.navigate('Tickets');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
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
        <Text style={styles.h3}>Support</Text>
      </View>

      {/* Formik form */}
      <Formik
        initialValues={{
          ticket_subject: '',
          ticket_priority: '',
          ticket_body: '',
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
          <View
            style={[
              styles.container,
              {paddingBottom: 40, flex: 1, justifyContent: 'center'},
            ]}>
            <View
              style={{
                backgroundColor: '#3A85F7',
                borderRadius: 10,
                padding: 10,
                marginBottom: 40,
              }}>
              <Text style={[styles.h3, {textAlign: 'center'}]}>
                Create Ticket
              </Text>
            </View>

            {/* Ticket Subject */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Ticket Subject
              </Text>
              <TextInput
                placeholder="Subject"
                style={styles.textfield}
                placeholderTextColor="#AEA9A9"
                onChangeText={handleChange('ticket_subject')}
                onBlur={handleBlur('ticket_subject')}
                value={values.ticket_subject}
              />
              {touched.ticket_subject && errors.ticket_subject && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.ticket_subject}
                </Text>
              )}
            </View>

            {/* Ticket Priority Dropdown */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Ticket Priority
              </Text>

              <Picker
                selectedValue={values.ticket_priority}
                onValueChange={handleChange('ticket_priority')}
                onBlur={handleBlur('ticket_priority')}
                style={styles.textfield}>
                <Picker.Item label="Select Priority" value="" />
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>

              {touched.ticket_priority && errors.ticket_priority && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.ticket_priority}
                </Text>
              )}
            </View>

            {/* Ticket Body (Multiline) */}
            <View style={[styles.textfield_wrapper, {marginBottom: 10}]}>
              <Text
                style={[
                  styles.text,
                  {paddingLeft: 8, fontSize: 15, color: '#000'},
                ]}>
                Ticket Body
              </Text>
              <TextInput
                placeholder="Write something"
                style={[styles.textfield, {height: 100}]}
                placeholderTextColor="#AEA9A9"
                multiline
                numberOfLines={4}
                onChangeText={handleChange('ticket_body')}
                onBlur={handleBlur('ticket_body')}
                value={values.ticket_body}
              />
              {touched.ticket_body && errors.ticket_body && (
                <Text style={[styles.errortext, {paddingLeft: 10}]}>
                  {errors.ticket_body}
                </Text>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#25C1F0',
                borderRadius: 20,
                padding: 20,
                marginTop: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  alignItems: 'center',
                  alignSelf: 'center',
                  fontWeight: '600',
                }}>
                {loading?<>
                <ActivityIndicator size={30} color="#ffff"/>
                </>:'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateTicket;
