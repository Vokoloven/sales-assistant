import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import Input from '@/components/Input/Input';
import { validator } from '@/utils/validators/validator';

import styles from './Login.module.scss';

export interface IForm {
  email: string;
  password: string;
}

const { section, aside, form, background, logo, heading } = styles;

const { email, password } = validator();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  return (
    <section className={section}>
      <div className={aside}>
        <div className={logo}></div>
        <h1 className={heading}>Log in</h1>
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
          <Input<IForm>
            id="email"
            name="email"
            type="email"
            register={register}
            label="Email"
            hasAutoFocus
            errorMessage={errors.email?.message}
            validate={email}
          />
          <Input<IForm>
            id="password"
            name="password"
            type="password"
            register={register}
            label="Password"
            errorMessage={errors.password?.message}
            validate={password}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div className={background}></div>
    </section>
  );
};

export default Login;
