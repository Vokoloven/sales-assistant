import {createAsyncThunk} from '@reduxjs/toolkit';

import {authService} from '@/service/httpServices/authService';
import type {IAccountDTO} from '@/submodules/interfaces/dto/account/iaccount.interface';
import type {IAccessDTO} from '@/submodules/interfaces/dto/auth/iaccess.interface';
import type {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';

import type {IAuthState} from '../slice/authSlice';

// import type {IAuthState} from '../slice/authSlice';
export interface ILoginResponseFullDTO {
  success: boolean;
  statusCode: number;
  data: {
    access: IAccessDTO;
    account: IAccountDTO;
    sessionId: string;
  } | null;
  error: {errorCode: string; filedsValidationErrors: null; paramsErrors: null} | null;
}

const auth = authService();

export const loginUserByEmail = createAsyncThunk<
  ILoginResponseFullDTO['data'],
  ILoginRequestDTO,
  {rejectValue: ILoginResponseFullDTO['error'] | unknown}
>(
  'auth/loginUserByEmail',
  async (data, {rejectWithValue}) => {
    try {
      const response = auth.login<ILoginResponseFullDTO>(data);

      const result = await response;

      if (!result.success) {
        throw {...result};
      }
      return result.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue(error);
    }
  },
  {
    condition: (_, {getState}) => {
      const {
        auth: {loading},
      } = getState() as {auth: IAuthState};

      if (loading === 'succeeded' || loading === 'pending') {
        return false;
      }
    },
  },
);

// export const refreshUser = createAsyncThunk(
//   'auth/refreshUser',
//   async (data: ILoginRequestDTO, {fulfillWithValue, rejectWithValue}) => {
//     try {
//       const response = auth.PUT<ILoginRequestDTO, ILoginResponseFullDTO>({
//         data,
//         url: `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
//       });

//       const result = await response;

//       if (!result.success) {
//         return rejectWithValue(result.error);
//       }

//       return fulfillWithValue(result.data);
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   },
// );
