import { ScrollView, Text, View } from "react-native"
import styles from "./styles/Styles"


const CompletedReviews = ()=>{
    return(
        <ScrollView>
           
                <View style={styles.reviewwrappper}>
                    <Text style={styles.h4}>Dr. Rajeev Agarwal</Text>
                    <Text style={styles.reviewdate}>23 dec.</Text>
                    <Text style={styles.reviewtext}>People having my number in their phone do not get my broadcast messages 
                    regularly some don’t get it at all some intermittently there shoul be option of 
                    sinding messages to 5 broadcasrt groups at one time just like in regular groups community should be..</Text>
                </View>
                <View style={styles.reviewwrappper}>
                    <Text style={styles.h4}>Dr. Rajeev Agarwal</Text>
                    <Text style={styles.reviewdate}>23 dec.</Text>
                    <Text style={styles.reviewtext}>People having my number in their phone do not get my broadcast messages 
                    regularly some don’t get it at all some intermittently there shoul be option of 
                    sinding messages to 5 broadcasrt groups at one time just like in regular groups community should be..</Text>
                </View>
                <View style={styles.reviewwrappper}>
                    <Text style={styles.h4}>Dr. Rajeev Agarwal</Text>
                    <Text style={styles.reviewdate}>23 dec.</Text>
                    <Text style={styles.reviewtext}>People having my number in their phone do not get my broadcast messages 
                    regularly some don’t get it at all some intermittently there shoul be option of 
                    sinding messages to 5 broadcasrt groups at one time just like in regular groups community should be..</Text>
                </View>
            
        </ScrollView>
    );
}

export default CompletedReviews;