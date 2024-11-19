import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ProfileScreen = () => {
  const navigation = useNavigation();

  // Logout function to handle both Email and Google login
  const logouthandle = async () => {
    try {
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to log out?',
        [
          {
            text: 'Cancel', 
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: async () => {
              try {
                const loginMethod = await AsyncStorage.getItem('loginMethod');
                console.log("loginMethod",loginMethod);

                if (loginMethod === 'google') {
                  await GoogleSignin.signOut();
                  console.log('User signed out from Google');
                }
                await AsyncStorage.clear();
                console.log('User logged out');
                navigation.navigate('Login');
              } catch (error) {
                console.log('Logout error', error);
                Alert.alert('Logout Error', 'Something went wrong while logging out.');
              }
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log('Logout error', error);
      Alert.alert('Logout Error', 'Something went wrong while logging out.');
    }
  };

  return (
    <>
      <ImageBackground
        source={require('../assets/profile-image.png')}
        resizeMethod="cover"
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          height: 400,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color="#ffff" />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.h3}>Profile</Text>
            <Image
              source={require('../assets/user2.png')}
              style={{ width: 120, height: 120, marginTop: 30, marginBottom: 10 }}
            />
            <Text style={styles.h3}>Nick Jones</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Settings and logout section */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
              }}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/settings.png')} />
                <Text style={[styles.h3, { color: '#000000', marginLeft: 10 }]}>
                  Settings
                </Text>
              </View>
              <View>
                <MaterialIcons name="arrow-forward-ios" size={30} color="#000000" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/support.png')} />
                <Text style={[styles.h3, { color: '#000000', marginLeft: 10 }]}>
                  Support
                </Text>
              </View>
              <View>
                <MaterialIcons name="arrow-forward-ios" size={30} color="#000000" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 20,
                alignItems: 'center',
                marginTop: 20,
              }}
              onPress={logouthandle}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image source={require('../assets/logout.png')} />
                <Text style={[styles.h3, { color: '#000000', marginLeft: 10 }]}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
