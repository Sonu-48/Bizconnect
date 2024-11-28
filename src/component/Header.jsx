import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../screens/styles/Styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = ({title}) => {
    const navigation = useNavigation();
  return (
    <>
      {/* Header Section */}
      <View
        style={[
          styles.headersection,
          {paddingTop: 20, paddingBottom: 20, marginTop: 1},
        ]}>
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
        <Text style={styles.h3}>{title}</Text>
      </View>
    </>
  );
};
export default Header;
