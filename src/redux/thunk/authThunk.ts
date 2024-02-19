import {createAsyncThunk} from '@reduxjs/toolkit';

import {httpService} from '@/service/httpService/httpServce';
import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';
import {BaseRoutes} from '@/submodules/enums/routes/base-routes.enum';
import type {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';

const auth = httpService();

interface ILoginResponseDto {
  success: boolean;
  statusCode: number;
  data: {
    access: {accessToken: string; refreshToken: string};
    account: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      status: string;
      typeAuth: string;
      accountRole: string;
    };
    sessionId: string;
  } | null;
  error: {errorCode: string; filedsValidationErrors: null; paramsErrors: null} | null;
}

export const loginUserByEmail = createAsyncThunk('auth/loginUserByEmail', async (data: ILoginRequestDTO, thunkAPI) => {
  try {
    const response = auth.POST<ILoginRequestDTO, ILoginResponseDto>({
      data,
      url: `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
    });

    const result = await response;

    if (!result.success) {
      throw new Error(JSON.stringify(result));
    }

    return result;
  } catch (error: {result: ILoginResponseDto; error: Error} | unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(JSON.parse(error.message));
    }
  }
});
