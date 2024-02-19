import {createSlice} from '@reduxjs/toolkit';

import {loginUserByEmail} from '../thunk/authThunk';

interface UsersState {
  user: object;
  error: object;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  user: {},
  error: {},
  loading: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserByEmail.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(loginUserByEmail.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.user = {...action.payload};
    });
    builder.addCase(loginUserByEmail.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = {...action.payload!};
    });
  },
});
