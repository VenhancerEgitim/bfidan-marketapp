import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './authSlice';

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async () => {
    const response = await axios.get('https://reqres.in/api/users/2');
    return {
      id: response.data.data.id,
      name: response.data.data.first_name + ' ' + response.data.data.last_name,
      email: response.data.data.email,
      avatar: response.data.data.avatar,
    };
  }
);

interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface UserState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<UserInfo>) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error fetching user info';
    });
    builder.addCase(logout, () => initialState);
  },
});

export default userSlice.reducer;
