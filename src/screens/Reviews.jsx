import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserdata} from '../redux/UserDataSlice';
import {getReview} from '../redux/GetReviewSlice';
import CompletedReviews from './CompletedReviews';
import PendingReview from './PendingReview';

const Reviews = () => {
  const navigation = useNavigation();
  const [selectTab, setSelectTab] = useState('Completed');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user || {});
  const reviewData = useSelector(state => state.review || []);

  // Fetch user data when the component mounts
  useEffect(() => {
    dispatch(getUserdata());
  }, [dispatch]);

  // Fetch reviews based on the selected tab
  useEffect(() => {
    dispatch(getReview());
  }, [selectTab, dispatch]);

  const handleTab = tab => {
    setSelectTab(tab);
  };

  // Open Google link
  const openGoogleLink = () => {
    if (userData && userData.user && userData.user.google_link) {
      const url = userData.user.google_link;
      const formattedUrl =
        url.startsWith('http://') || url.startsWith('https://')
          ? url
          : `https://${url}`;
      Linking.openURL(formattedUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    } else {
      console.error('Google link is not available');
    }
  };

  // Open Facebook link
  const openFacebookLink = () => {
    if (userData && userData.user && userData.user.facebook_link) {
      const url = userData.user.facebook_link;
      const formattedUrl =
        url.startsWith('http://') || url.startsWith('https://')
          ? url
          : `https://${url}`;
      Linking.openURL(formattedUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    }
  };

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
            <TouchableOpacity onPress={openGoogleLink}>
              <Image source={require('../assets/google-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFacebookLink}>
              <Image source={require('../assets/facebook-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require('../assets/yahoo-icon.png')} />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: 40,
              marginBottom:20
            }}>
            <TouchableOpacity
              onPress={() => handleTab('Completed')}
              style={[
                styles.activetabbtn,
                {
                  backgroundColor:
                    selectTab === 'Completed' ? '#00008B' : '#F4F3F3',
                  borderRadius: 15,
                  padding: 20,
                },
              ]}>
              <Text
                style={[
                  styles.activetabttext,
                  {color: selectTab === 'Completed' ? '#fff' : '#898585'},
                ]}>
                Completed Reviews
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTab('Pending')}
              style={[
                styles.activetabbtn,
                {
                  backgroundColor:
                    selectTab === 'Pending' ? '#00008B' : '#F4F3F3',
                  borderRadius: 15,
                  padding: 20,
                },
              ]}>
              <Text
                style={[
                  styles.activetabttext,
                  {color: selectTab === 'Pending' ? '#fff' : '#898585'},
                ]}>
                Pending Reviews
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Conditional Rendering for Reviews */}
        {selectTab === 'Pending' && <PendingReview />}
        {selectTab === 'Completed' && <CompletedReviews />}
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
