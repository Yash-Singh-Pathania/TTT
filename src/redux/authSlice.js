import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/api';

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await axios.post('/signup', userData);
    return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post('/login', userData);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, status: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'signed up';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'logged in';
            });
    },
});

export default authSlice.reducer;
