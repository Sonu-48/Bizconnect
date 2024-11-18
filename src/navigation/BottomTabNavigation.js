import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomePage from '../screens/HomePage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatInbox from '../screens/ChatInbox';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ProfileScreen from '../screens/ProfileScreen';
import Review from '../screens/Review';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarHideOnKeyboard={true}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#00008B',
        tabBarInactiveTintColor: '#00008B',
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: '#0DC3FF',
          borderTopWidth: 0,
          shadowRadius: 10,
          paddingTop: 10,
          paddingBottom: 5,
          height: 80,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;
          let IconComponent;

          if (route.name === 'Home') {
            iconName = 'home';
            IconComponent = Icon;
          } else if (route.name === 'Chat') {
            iconName = 'wechat';
            IconComponent = MaterialIcons;
          } else if (route.name === 'Review') {
            iconName = 'thumbs-up-down';
            IconComponent = MaterialIcons;
          } else if (route.name === 'Profile') {
            iconName = 'user-large';
            IconComponent = FontAwesome6;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? '#ADD8E6' : '#ADD8E6',
                borderRadius: 30,
                width: 46,
                height: 46,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* Render the icon based on the route */}
              <IconComponent name={iconName} size={26} color={color} />
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatInbox}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Review"
        component={Review}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
