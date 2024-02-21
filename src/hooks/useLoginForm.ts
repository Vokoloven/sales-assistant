import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import type {AppDispatch} from '@/redux/store';
import {loginUserByEmail} from '@/redux/thunk/authThunk';
import {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid, dirtyFields},
  } = useForm<ILoginRequestDTO>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginRequestDTO> = (data) => dispatch(loginUserByEmail(data));

  const isDirtyPassword = dirtyFields?.password;

  return {onSubmit, register, handleSubmit, errors, isValid, isDirtyPassword};
};
