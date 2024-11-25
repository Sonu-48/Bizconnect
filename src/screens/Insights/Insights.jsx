import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base_url } from "../../ApiUrl";


const Insights = ()=>{
    const navigation = useNavigation();

    // get Insights Content api
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInsightsContent = async()=>{
        // setLoading(true);
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
                    data:{
                        slug:"insight"
                    }
            });
            if(res.data.success === true){
                console.log("getContnet",res.data.data);
                setInsights(res.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getInsightsContent();
    },[])

    return(
       <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <Text style={styles.h3}>Insights</Text>
      </View>
        <Text>Insights</Text>
       </ScrollView>
    );
}

export default Insights;