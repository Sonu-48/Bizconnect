import {configureStore} from '@reduxjs/toolkit';
// import userReducer from './src/redux/UserdataSlice';
import  userReducer  from './UserDataSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
