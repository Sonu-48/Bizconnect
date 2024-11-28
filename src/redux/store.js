import {configureStore} from '@reduxjs/toolkit';
import  userReducer  from './UserDataSlice';
import reviewReducer from './GetReviewSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    review: reviewReducer,
  },
});
export default store;
