import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { Formik } from 'formik';
  import * as yup from 'yup';
  import { launchCamera } from 'react-native-image-picker';
  import { useNavigation } from '@react-navigation/native';
  import styles from './styles/Styles';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  
  // Validation schema
  const validationSchema = yup.object().shape({
    name: yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Name must contain only letters')
      .required('Name is required'),
    email: yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phonenumber: yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    totalamount: yup.number()
      .typeError('Total amount must be a number')
      .required('Total amount is required'),
    date: yup.string()
      .required('Date is required'),
  });
  
  const AddInvoices = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [imageUri, setImageUri] = useState(null);
    const navigation = useNavigation();
  
    const handleDateChange = (event, selectedDate) => {
      if (selectedDate) {
        setShowDatePicker(false);
        setSelectedDate(selectedDate);
        const formattedDate = `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1,
        ).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  
        // Update Formik's date value
        setDate(formattedDate);
      }
    };
  
    const showDatePickerHandler = () => {
      setShowDatePicker(true);
    };
  
    const handleCameraLaunch = () => {
      const options = {
        mediaType: 'photo',
        saveToPhotos: true,
      };
  
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const uri = response.assets[0].uri;
          setImageUri(uri);
        }
      });
    };
  
    const handleSubmit = values => {
      console.log('Form submitted', values);
      navigation.navigate('Home');
    };
  
    return (
      <>
        {/* Header Section */}
        <View style={[styles.headersection, { paddingTop: 20, paddingBottom: 20 }]}>
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
          <Text style={styles.h3}>Invoices</Text>
        </View>
        <ScrollView style={{ paddingBottom: 50 }}>
          <Formik
            initialValues={{ name: '', email: '', phonenumber: '', totalamount: '', date: '' }}
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
              <View style={{ paddingBottom: 20 }}>
                <TouchableOpacity onPress={handleCameraLaunch}>
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        height: 100,
                        width: 100,
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
                        width: 100,
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
                    }}>
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
                    keyboardType='numeric'
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
                    onChangeText={handleChange('totalamount')}
                    onBlur={handleBlur('totalamount')}
                  />
                  {touched.totalamount && errors.totalamount && (
                    <Text style={styles.errortext}>{errors.totalamount}</Text>
                  )}
                </View>
  
                {/* DatePicker Section */}
                <Text style={styles.paymenttxt}>Date/Reminder</Text>
                <TouchableOpacity onPress={showDatePickerHandler}>
                  <TextInput
                    style={styles.textinpt}
                    value={values.date}
                    placeholder="Select Date"
                    editable={false} // This makes the TextInput uneditable so user can't type in
                  />
                </TouchableOpacity>
                {touched.date && errors.date && (
                  <Text style={styles.errortext}>{errors.date}</Text>
                )}
  
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                  />
                )}
  
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 50,
                  }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      width: '40%',
                      backgroundColor: '#25C1F0',
                      borderRadius: 20,
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: '600'
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      width: '40%',
                      backgroundColor: '#F34343',
                      borderRadius: 20,
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontWeight: '600'
                      }}>
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
  