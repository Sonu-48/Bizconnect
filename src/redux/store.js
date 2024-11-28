import {configureStore} from '@reduxjs/toolkit';
import  userReducer  from './UserDataSlice';
import reviewReducer from './GetReviewSlice';
import getUserReducer from './GetUserSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    review: reviewReducer,
    getuser:getUserReducer
  },
});
export default store;
