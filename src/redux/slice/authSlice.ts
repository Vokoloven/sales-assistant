import {createSlice} from '@reduxjs/toolkit';

import type {ILoginResponseDTO} from '@/submodules/interfaces/dto/auth/ilogin-response.interfaces';

import type {ILoginResponseFullDTO} from '../thunk/authThunk';
import {loginUserByEmail} from '../thunk/authThunk';

interface UsersState {
  data: Partial<ILoginResponseDTO> | null;
  error: Partial<Pick<ILoginResponseFullDTO, 'error'>> | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  data: null,
  error: null,
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
      state.error = null;
      state.data = {...action.payload};
    });
    builder.addCase(loginUserByEmail.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = {...(action.payload as Partial<Pick<ILoginResponseFullDTO, 'error'>>)};
    });
  },
});
