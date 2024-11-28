import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Base_url } from '../ApiUrl';
import moment from 'moment';
import Header from '../component/Header';

// Validation schema
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
    invoiceNumber: yup.string().required('Invoice number is required'),
  phonenumber: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  totalamount: yup
    .number()
    .typeError('Total amount must be a number')
    .required('Total amount is required'),
  date: yup.string().required('Date is required'),
});

const AddInvoices = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Datepicker function
  const handleDateChange = (event, selectedDate, setFieldValue) => {
    if (selectedDate) {
      setShowDatePicker(false);
      setSelectedDate(selectedDate);

      // Format the selected date as 'YYYY-MM-DD' using moment
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

      // Update Formik's date value
      setFieldValue('date', formattedDate); // Use setFieldValue to update Formik state
    }
  };

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Upload invoice Image function
  const handleImage = () => {
    Alert.alert(
      'Select Invoice Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () =>
            launchCamera({}, response => {
              if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
              }
            }),
        },
        {
          text: 'Gallery',
          onPress: () =>
            launchImageLibrary({}, response => {
              if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
              }
            }),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const handleSubmit = async (values) => {
    setLoading(true);
  
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setLoading(false);
      return;
    }
    const formData = new FormData();
  
    // Append text field values
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('invoice_number', values.invoiceNumber);
    formData.append('phone_number', values.phonenumber);
    formData.append('total_amount', values.totalamount);
    const formattedDate = moment(values.date).format('YYYY/MM/DD');
    formData.append('date_reminder', formattedDate);
  
    if (imageUri) {
      const imageName = imageUri.split('/').pop();
      const imageData = {
        uri: imageUri,
        name: imageName,
        type: 'image/jpeg',
      };
      formData.append('invoice_image', imageData);
    }
  
    try {
      const res = await axios({
        method: 'post',
        url: Base_url.addinvoice,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
  
      if (res.data.data.success=== true) {
        setLoading(false);
        Alert.alert('Success', res.data.data.message);
        navigation.navigate('Invoices');
      } else {
        setLoading(false);
        Alert.alert('Error', res.data.message || 'An error occurred');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.response ? error.response.data : error.message);  // Log detailed error response
      Alert.alert('Error', error.response ? error.response.data.message : 'An error occurred while submitting the invoice.');
    }
  };
  
  return (
    <>
      {/* Header Section */}
   <Header title="Invoices"/>
      <ScrollView style={{ paddingBottom: 50 }}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            invoiceNumber:'',
            phonenumber: '',
            totalamount: '',
            date: '',
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
            setFieldValue, // You need this to set the field value for "date"
          }) => (
            <View style={{ paddingBottom: 20 }}>
              <TouchableOpacity onPress={handleImage}>
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={{
                      height: 150,
                      width: 150,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../assets/add_image.png')}
                    style={{
                      height: 100,
                      width: 200,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                      marginTop: 20,
                    }}
                  />
                )}
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  Upload Image
                </Text>
              </TouchableOpacity>

              <View>
                <Text style={styles.paymenttxt}>Name</Text>
                <TextInput
                  style={styles.textinpt}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errortext}>{errors.name}</Text>
                )}
              </View>

              {/* invocie field */}
              <View>
                <Text style={styles.paymenttxt}>Invoice Number</Text>
                <TextInput
                  style={styles.textinpt}
                  value={values.invoiceNumber}
                  onChangeText={handleChange('invoiceNumber')}
                  onBlur={handleBlur('invoiceNumber')}
                  // placeholder="Invoice Number"
                />
                {touched.invoiceNumber && errors.invoiceNumber && (
                  <Text style={styles.errortext}>{errors.invoiceNumber}</Text>
                )}
              </View>

              <View>
                <Text style={styles.paymenttxt}>Email</Text>
                <TextInput
                  style={styles.textinpt}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errortext}>{errors.email}</Text>
                )}
              </View>

              <View>
                <Text style={styles.paymenttxt}>Phone No</Text>
                <TextInput
                  style={styles.textinpt}
                  value={values.phonenumber}
                  keyboardType="numeric"
                  onChangeText={handleChange('phonenumber')}
                  onBlur={handleBlur('phonenumber')}
                />
                {touched.phonenumber && errors.phonenumber && (
                  <Text style={styles.errortext}>{errors.phonenumber}</Text>
                )}
              </View>

              <View>
                <Text style={styles.paymenttxt}>Total Amount</Text>
                <TextInput
                  style={styles.textinpt}
                  value={values.totalamount}
                  keyboardType="numeric"
                  onChangeText={handleChange('totalamount')}
                  onBlur={handleBlur('totalamount')}
                />
                {touched.totalamount && errors.totalamount && (
                  <Text style={styles.errortext}>{errors.totalamount}</Text>
                )}
              </View>

              {/* DatePicker Section */}
              <Text style={styles.paymenttxt}>Date</Text>
              <TouchableOpacity onPress={showDatePickerHandler}>
                <TextInput
                  style={styles.textinpt}
                  value={values.date}
                  placeholder="Select Date"
                  editable={false}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) =>
                    handleDateChange(event, selectedDate, setFieldValue)
                  }
                />
              )}
              {touched.date && errors.date && (
                <Text style={styles.errortext}>{errors.date}</Text>
              )}

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, date) =>
                    handleDateChange(event, date, setFieldValue)
                  }
                />
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 50,
                }}
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    width: '40%',
                    backgroundColor: '#25C1F0',
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: '600',
                    }}
                  >
                    {loading?<>
                    <ActivityIndicator/>
                    </>:
                    'Save'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    width: '40%',
                    backgroundColor: '#F34343',
                    borderRadius: 20,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontWeight: '600',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AddInvoices;
