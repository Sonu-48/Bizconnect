import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashScreen from "../screens/SplachScreen.";
import Login from "../screens/Login";
import BottomTabNavigation from "./BottomTabNavigation";
import ChatScreen from "../screens/ChatScreen";
import Invoices from "../screens/Invoices";
import AddInvoices from "../screens/AddInvoices";
import AddReviews from "../screens/AddReviews";
import ChatInbox from "../screens/ChatInbox";
import VideoCallScreen from "../screens/VideoCallScreen";
import OtpScreen from "../OtpScreen";


const Stack = createNativeStackNavigator();

const StackNavigation=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="SplachScreen" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Chat" component={ChatInbox} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={BottomTabNavigation} options={{headerShown:false}}/>
            <Stack.Screen name="Invoices" component={Invoices} options={{headerShown:false}}/>
            <Stack.Screen name="AddInvoices" component={AddInvoices} options={{headerShown:false}}/>
            <Stack.Screen name="AddReviews" component={AddReviews} options={{headerShown:false}}/>
            <Stack.Screen name="Review" component={AddReviews} options={{headerShown:false}}/>
            <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} options={{headerShown:false}}/>
            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}
export default StackNavigation;