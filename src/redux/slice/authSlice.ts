import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {loginUserByEmail} from '../thunk/authThunk';
import type {ILoginResponseFullDTO} from '../thunk/authThunk';

export interface IAuthState {
  data: ILoginResponseFullDTO['data'];
  error: ILoginResponseFullDTO['error'] | unknown;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: IAuthState = {
  data: null,
  error: null,
  loading: 'idle',
};

const authConfig = {
  key: 'auth',
  storage: storage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserByEmail.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(loginUserByEmail.fulfilled, (state, {payload}) => {
      state.loading = 'succeeded';
      state.error = null;
      if (payload) {
        state.data = {...payload};
      }
    });
    builder.addCase(loginUserByEmail.rejected, (state, action) => {
      state.loading = 'failed';
      state.data = null;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
    // builder.addCase(refreshUser.pending, (state) => {
    //   state.loading = 'pending';
    // });
    // builder.addCase(refreshUser.fulfilled, (state, action) => {
    //   state.loading = 'succeeded';
    //   state.error = null;
    //   if (action.payload) {
    //     state.data = {...action.payload};
    //   }
    // });
    // builder.addCase(refreshUser.rejected, (state, action) => {
    //   state.loading = 'failed';
    //   state.error = action.payload;
    // });
  },
});

export const persistedAuth = persistReducer(authConfig, authSlice.reducer);
