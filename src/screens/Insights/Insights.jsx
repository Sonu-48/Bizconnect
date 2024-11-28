import React, {useEffect, useState} from 'react';
import {ScrollView, View, Alert, ActivityIndicator} from 'react-native';
import styles from '../styles/Styles';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Base_url} from '../../ApiUrl';
import {WebView} from 'react-native-webview';
import Header from '../../component/Header';

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  // get Insights Content api
  const getInsightsContent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User is not authenticated.');
        return;
      }
      const res = await axios({
        method: 'post',
        url: Base_url.getContent,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          slug: 'insight',
        },
      });
      if (res.data.success === true) {
        console.log('getContnet', res.data.data);
        setInsights(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInsightsContent();
  }, []);

  if (loading) {
    // Display loading spinner while data is being fetched
    return (
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  // HTML string with inline styles
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          h2 {
            color: #333;
            font-size: 60px;
            font-weight: 600;
            margin-bottom: 40px;
            text-align:center
          }
          p {
            color: #000;
            font-size: 35px;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h2>${insights.title}</h2>
        <p>${insights.description}</p>
      </body>
    </html>
  `;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <Header title="Insights" />
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{html: htmlContent}}
          style={{marginTop: 20}}
        />
      </View>
    </ScrollView>
  );
};

export default Insights;
