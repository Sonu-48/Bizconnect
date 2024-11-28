import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../ApiUrl";

// Get Reviews data API
const getReview = createAsyncThunk("getReview", async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return rejectWithValue("No token found");
        }
        const res = await axios.get(Base_url.getreviews, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            }
        });
        return res.data.data.reviews;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const GetReviewSlice = createSlice({
    name: 'getReview',
    initialState: {
        review:[],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReview.fulfilled, (state, action) => {
                state.loading = false;
                state.review = action.payload;
            })
            .addCase(getReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
}) 
export { getReview };
export default GetReviewSlice.reducer;
