import {createAsyncThunk} from '@reduxjs/toolkit';

import {httpService} from '@/service/httpService/httpServce';
import {AuthRoutes} from '@/submodules/enums/routes/auth-routes.enum';
import {BaseRoutes} from '@/submodules/enums/routes/base-routes.enum';
import type {IAccountDTO} from '@/submodules/interfaces/dto/account/iaccount.interface';
import type {IAccessDTO} from '@/submodules/interfaces/dto/auth/iaccess.interface';
import type {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';

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

const auth = httpService();

export const loginUserByEmail = createAsyncThunk('auth/loginUserByEmail', async (data: ILoginRequestDTO, thunkAPI) => {
  try {
    const response = auth.POST<ILoginRequestDTO, ILoginResponseFullDTO>({
      data,
      url: `${BaseRoutes.BaseUrl}${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
    });

    const result = await response;

    console.log(thunkAPI.getState());

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    return result.data;
  } catch (error: {result: Pick<ILoginResponseFullDTO, 'error'>; error: Error} | unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(JSON.parse(error.message));
    }
  }
});
