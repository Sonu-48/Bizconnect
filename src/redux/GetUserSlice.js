import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../ApiUrl";

// Get Reviews data API
const getUser = createAsyncThunk("getUser", async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return rejectWithValue("No token found");
        }
        const res = await axios.get(Base_url.getUser, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const GetUserSlice = createSlice({
    name: 'getUser',
    initialState: {
        getuser:[],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.getuser = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
}) 
export { getUser };
export default GetUserSlice.reducer;
