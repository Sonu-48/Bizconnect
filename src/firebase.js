import firebase from '@react-native-firebase/app'; // This is the correct import for React Native
import '@react-native-firebase/database';
import '@react-native-firebase/storage';

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBSPVcDis6vskgR862oyGq6ATQOFzdGhK0',
  authDomain: 'klientcrew-5fd8d.firebaseapp.com',
  databaseURL: 'https://klientcrew-5fd8d.firebaseio.com',
  projectId: 'klientcrew-5fd8d',
  storageBucket: 'klientcrew-5fd8d.appspot.com',
  messagingSenderId: '811814618197',
  appId: '1:811814618197:android:0e7ef3bf1ae95f176740dc',
};

// Initialize Firebase (this step is only needed the first time)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();  // Use the existing app
}

export { firebase };
