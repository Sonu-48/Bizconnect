import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Base_url } from "../ApiUrl";

// Get UserProfile data API
const getUserdata = createAsyncThunk("getUserdata", async (_, { rejectWithValue }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            return rejectWithValue("No token found");
        }
        const res = await axios.get(Base_url.profileData, {
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

const UserDataSlice = createSlice({
    name: 'userdata',
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserdata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserdata.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserdata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
}) 
export { getUserdata };
export default UserDataSlice.reducer;
