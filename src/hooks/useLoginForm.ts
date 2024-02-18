import {useForm} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';

export interface ILoginForm {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<ILoginForm>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => console.log(data);

  return {onSubmit, register, handleSubmit, errors, isValid};
};
