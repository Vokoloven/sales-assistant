import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import {useDispatch} from 'react-redux';

import {InputType} from '@/components/Input/constants';
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

  const togglePasswordVisibility = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (input.type === InputType.Password) {
      input.type = InputType.Text;
    } else {
      input.type = InputType.Password;
    }
  };

  const onSubmit: SubmitHandler<ILoginRequestDTO> = (data) => dispatch(loginUserByEmail(data));

  const isDirtyPassword = dirtyFields?.password;

  return {onSubmit, register, handleSubmit, errors, isValid, isDirtyPassword, togglePasswordVisibility};
};
