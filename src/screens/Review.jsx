import { Image, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import PendingReviews from './PendingReviews';
import CompletedReviews from './CompletedReviews';

const Review = () => {
  const navigation = useNavigation();
  const [selectTab, setSelectTab] = useState('Completed Review');

  // handleTab function
  const handleTab = tab => {
    setSelectTab(tab);
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
        <Text style={styles.h3}>Reviews</Text>
      </View>
      
      <View style={styles.container}>
        {/* Reviews Section */}
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={[styles.h3, { color: '#000', fontWeight: '700' }]}>
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
          <View
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
          </View>
        </View>
        
        {/* Conditional Rendering of Components */}
        {selectTab === 'Completed Review' && <CompletedReviews />}
        {selectTab === 'Pending Review' && <PendingReviews />}
        
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

export default Review;
