import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, { useState } from 'react';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { Platform } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import styles from './styles/Styles';
  import { Formik } from 'formik';
  import * as yup from 'yup';
  
  // Validation schema
  const validationSchema = yup.object().shape({
    invoiceNumber: yup.string().required('Invoice number is required'),
    description: yup.string().required('Description is required'),
    orderNumber: yup.string().required('Order number is required'),
    businessName: yup.string().required('Business Name is required'),
    date: yup.string().required('Date is required'),
  });
  
  const AddReviews = ({ navigation }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    const handleDateChange = (event, date) => {
      setShowDatePicker(false);
      if (date) {
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1,
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        setFieldValue('date', formattedDate);
      }
    };
  
    const showDatePickerHandler = () => {
      setShowDatePicker(true);
    };
  
    const handleSubmit = (values) => {
      console.log('Form submitted', values);
      navigation.navigate('Home');
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
          <Text style={styles.h3}>Add Reviews</Text>
        </View>
  
        {/* Form Section */}
        <ScrollView>
          <Formik
            initialValues={{
              invoiceNumber: '',
              description: '',
              orderNumber: '',
              businessName: '',
              date: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View style={{ marginTop: 30, padding: 20 }}>
                {/* Invoice Number */}
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5 }}>
                    Invoice Number
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      height: 50,
                    }}
                    value={values.invoiceNumber}
                    onChangeText={handleChange('invoiceNumber')}
                    onBlur={handleBlur('invoiceNumber')}
                    placeholder="Invoice Number"
                  />
                  {touched.invoiceNumber && errors.invoiceNumber && (
                    <Text style={[styles.errortext, { paddingLeft: 0 }]}>{errors.invoiceNumber}</Text>
                  )}
                </View>
  
                {/* Description */}
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5 }}>
                    Description
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      height: 50,
                    }}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    placeholder="Description"
                  />
                  {touched.description && errors.description && (
                    <Text style={[styles.errortext, { paddingLeft: 0 }]}>{errors.description}</Text>
                  )}
                </View>
  
                {/* Order Number */}
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5 }}>
                    Order Number
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      height: 50,
                    }}
                    value={values.orderNumber}
                    onChangeText={handleChange('orderNumber')}
                    onBlur={handleBlur('orderNumber')}
                    placeholder="Order Number"
                  />
                  {touched.orderNumber && errors.orderNumber && (
                    <Text style={[styles.errortext, { paddingLeft: 0 }]}>{errors.orderNumber}</Text>
                  )}
                </View>
  
                {/* Business Name */}
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5 }}>
                    Business Name
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      height: 50,
                    }}
                    value={values.businessName}
                    onChangeText={handleChange('businessName')}
                    onBlur={handleBlur('businessName')}
                    placeholder="Business Name"
                  />
                  {touched.businessName && errors.businessName && (
                    <Text style={[styles.errortext, { paddingLeft: 0 }]}>{errors.businessName}</Text>
                  )}
                </View>
  
                {/* Date Picker */}
                <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 5 }}>Date</Text>
                <TouchableOpacity onPress={showDatePickerHandler}>
                  <TextInput
                    style={{
                      backgroundColor: '#D9D9D9',
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      height: 50,
                    }}
                    value={values.date}
                    placeholder="Select Date"
                    editable={false}
                  />
                </TouchableOpacity>
                {touched.date && errors.date && (
                  <Text style={[styles.errortext, { paddingLeft: 0 }]}>{errors.date}</Text>
                )}
  
                {/* Date Picker */}
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => handleDateChange(event, date, setFieldValue)}
                  />
                )}
  
                {/* Save Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#00CFFF',
                    borderRadius: 10,
                    paddingVertical: 15,
                    width: '30%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                  onPress={handleSubmit}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    );
  };
  
  export default AddReviews;