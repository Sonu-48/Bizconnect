import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Base_url} from '../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderReviews = ({item}) => {
  return (
    <>
      <View style={styles.reviewwrappper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.h4}>{item.business_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#F34343', fontSize: 15}}>Invoice No:</Text>
            <Text style={{fontSize: 16, color: '#00008B'}}>
              {item.invoice_number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>{item.date}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#F34343', fontSize: 15}}>Order No:</Text>
            <Text style={{fontSize: 16, color: '#00008B'}}>
              {item.order_number}
            </Text>
          </View>
        </View>
        <Text style={styles.reviewtext}>{item.description}</Text>
      </View>
    </>
  );
};

const Reviews = () => {
  const navigation = useNavigation();
  // const [selectTab, setSelectTab] = useState('Completed Review');
  const [token, setToken] = useState(null);
  const [reviews, setReviews] = useState([]);

  // handleTab function
  // const handleTab = (tab) => {
  //   setSelectTab(tab);
  // };

  // get Reviews Api
  const getReviews = async () => {
    const token = await AsyncStorage.getItem('token');
    setToken(token);
    console.log('Token:', token);
    if (!token) {
      Alert.alert('Error', 'User is not logged in or token is missing.');
      return;
    }

    try {
      const res = await axios({
        method: 'get',
        url: Base_url.getreviews,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (res.data.success === true) {
        console.log(res.data.message);
        setReviews(res.data.data);
      } else {
        Alert.alert('Error', 'Unable to fetch reviews.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          Alert.alert(
            'Access Denied',
            'You do not have permission to view reviews.',
          );
          await AsyncStorage.clear();
          navigation.navigate('Login');
        } else {
          Alert.alert(
            'Error',
            error.response.data.message || 'An error occurred.',
          );
        }
      } else {
        console.error('Network or Request Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while fetching reviews. Please check your internet connection.',
        );
      }
    }
  };

  useEffect(() => {
    getReviews();
  }, [token]);

  return (
    <>
      {/* Header Section */}
      <View style={[styles.headersection, {paddingTop: 20, paddingBottom: 20}]}>
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
        <Text style={styles.h3}>Reviews</Text>
      </View>

      <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Text style={[styles.h3, {color: '#000', fontWeight: '700'}]}>
            Write a Review
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
              marginTop: 30,
            }}>
            <TouchableOpacity>
              <Image source={require('../assets/google-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/facebook-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/yahoo-icon.png')} />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: 70,
            }}>
            <TouchableOpacity
              onPress={() => handleTab('Completed Review')}
              style={[
                styles.activetabbtn,
                {
                  backgroundColor:
                    selectTab === 'Completed Review' ? '#00008B' : '#F4F3F3',
                  borderRadius: 15,
                  padding: 20,
                },
              ]}>
              <Text
                style={[
                  styles.activetabttext,
                  {
                    color:
                      selectTab === 'Completed Review' ? '#fff' : '#898585',
                  },
                ]}>
                Completed Review
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTab('Pending Review')}
              style={[
                styles.activetabbtn,
                {
                  backgroundColor:
                    selectTab === 'Pending Review' ? '#00008B' : '#F4F3F3',
                  borderRadius: 15,
                  padding: 20,
                },
              ]}>
              <Text
                style={[
                  styles.activetabttext,
                  {
                    color:
                      selectTab === 'Pending Review' ? '#fff' : '#898585',
                  },
                ]}>
                Pending Review
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <FlatList
          data={reviews}
          renderItem={renderReviews}
          // keyExtractor={item => item.id.toString()}
        />
      </View>

      {/* Add Review Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddReviews')}
        style={{
          backgroundColor: '#00008B',
          width: 50,
          height: 50,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          marginRight: 20,
          position: 'absolute',
          right: 5,
          bottom: 0,
        }}>
        <MaterialIcons name="add" size={40} color="#ffff" />
      </TouchableOpacity>
    </>
  );
};

export default Reviews;
