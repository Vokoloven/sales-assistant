import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';

import {InputType} from '@/components/Input/constants';

export interface ILoginForm {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid, dirtyFields},
  } = useForm<ILoginForm>({
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

  const onSubmit: SubmitHandler<ILoginForm> = (data) => console.log(data);

  const isDirtyPassword = dirtyFields?.password;

  return {onSubmit, register, handleSubmit, errors, isValid, isDirtyPassword, togglePasswordVisibility};
};
