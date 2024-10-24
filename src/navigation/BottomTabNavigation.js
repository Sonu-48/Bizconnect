import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomePage from "../screens/HomePage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ChatScreen from "../screens/ChatScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChatInbox from "../screens/ChatInbox";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ProfileScreen from "../screens/ProfileScreen";
import Review from "../screens/Review";

const Tab = createBottomTabNavigator();


const BottomTabNavigation = ()=>{
    return(
        <Tab.Navigator
      tabBarHideOnKeyboard={true}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#ffff',
        tabBarInactiveTintColor: '#ADD8E6',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: '#00008B',
          borderTopWidth: 0,
          shadowRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
          height: 65,
        },
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName ='home';
            return <Icon name={iconName} size={30} color={color} />;
          } else if (route.name === 'Chat') {
            iconName = 'wechat';
            return <MaterialIcons name={iconName} size={30} color={color} />;
          } else if (route.name === 'Review') {
            iconName = 'thumbs-up-down';
            return <MaterialIcons name={iconName} size={30} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = 'user-large';
            return <FontAwesome6 name={iconName} size={30} color={color} />;
          }
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Chat" component={ChatInbox} options={{headerShown:false}}/>
      <Tab.Screen name="Review" component={Review} options={{headerShown:false}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </Tab.Navigator>
    )
}
export default BottomTabNavigation;