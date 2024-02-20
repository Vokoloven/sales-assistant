import {createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type {ILoginResponseFullDTO} from '../thunk/authThunk';
import {loginUserByEmail} from '../thunk/authThunk';
import {refreshUser} from '../thunk/authThunk';

export interface IAuthState {
  user: ILoginResponseFullDTO['data'];
  error: ILoginResponseFullDTO['error'] | unknown;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isAuthorized: boolean;
}

const initialState: IAuthState = {
  user: null,
  error: null,
  loading: 'idle',
  isAuthorized: false,
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
      state.isAuthorized = true;
      state.user = payload;
    });
    builder.addCase(loginUserByEmail.rejected, (state, {payload}) => {
      state.loading = 'failed';
      state.user = null;
      state.error = payload;
      state.isAuthorized = false;
    });
    builder.addCase(refreshUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(refreshUser.fulfilled, (state, {payload}) => {
      state.loading = 'succeeded';
      state.error = null;
      state.isAuthorized = true;
      state.user = payload;
    });
    builder.addCase(refreshUser.rejected, (state, {payload}) => {
      state.loading = 'failed';
      state.user = null;
      state.isAuthorized = false;
      state.error = payload;
    });
  },
});

export const persistedAuth = persistReducer(authConfig, authSlice.reducer);