import { FlatList, Text, TouchableOpacity, View, Alert } from 'react-native';
import styles from '../styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Base_url } from '../../ApiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../component/Header';

const renderTickets = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: '#3985F7',
        margin: 10,
        padding: 10,
        borderRadius: 10,
      }}>
      <View style={styles.flex}>
        <Text style={[styles.h3, { color: '#ffff', fontSize: 15 }]}>Ticket Code</Text>
        <Text style={{ color: '#ffff' }}>{item.ticket_code}</Text>
      </View>
      <View style={[styles.flex, { marginTop: 10, marginBottom: 10 }]}>
        <Text style={[styles.h3, { color: '#ffff', fontSize: 15 }]}>Ticket Subject</Text>
        <Text style={{ color: '#ffff' }}>{item.ticket_subject}</Text>
      </View>
      <View style={styles.flex}>
        <Text style={[styles.h3, { color: '#ffff', fontSize: 15 }]}>Ticket Status</Text>
        <Text style={{ color: '#ffff' }}>{item.ticket_status}</Text>
      </View>
    </View>
  );
};

const Tickets = () => {
  const navigation = useNavigation();
  const [ticket, setTickets] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);
  const [showAll, setShowAll] = useState(false); 

  // Get Tickets API
  const getTickets = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'User is not authenticated.');
        return;
      }
      const res = await axios({
        method: 'get',
        url: Base_url.tickets,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success === true) {
        console.log(res.data.message);
        console.log(res.data.data);
        setTickets(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  // Toggle between showing more or less items
  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setVisibleItems(ticket.length);
    } else {
      setVisibleItems(4);
    }
  };

  return (
    <>
      {/* Header Section */}
     <Header title="Support"/>

      <View style={styles.container}>
        <Text style={[styles.h3,{color:'#000',paddingBottom:20,paddingTop:20}]}>Tickets</Text>
        <FlatList
          data={ticket.slice(0, visibleItems)}
          renderItem={renderTickets}
          keyExtractor={(item) => item.ticket_code.toString()}
          contentContainerStyle={styles.scrollContainer}
          ListFooterComponent={
            <TouchableOpacity
              onPress={toggleShowAll}
              style={{
                alignSelf: 'center',
                padding: 15,
                borderRadius: 10,
                backgroundColor: '#00008B',
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>
                {showAll ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          }
        />
      </View>

      {/* Add Ticket Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateTicket')}
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

export default Tickets;
