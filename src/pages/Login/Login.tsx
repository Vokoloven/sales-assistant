import Input from '@/components/Input/Input';
import { useLoginForm } from '@/hooks/useLoginForm';
import type { ILoginForm } from '@/hooks/useLoginForm';
import { validator } from '@/utils/validators/validator';

import styles from './Login.module.scss';

const { section, aside, form, background, logo, heading } = styles;

const { email, password } = validator();

const Login = () => {
  const { errors, handleSubmit, onSubmit, register } = useLoginForm();

  return (
    <section className={section}>
      <div className={aside}>
        <div className={logo}></div>
        <h1 className={heading}>Log in</h1>
        <form className={form} onSubmit={handleSubmit(onSubmit)}>
          <Input<ILoginForm>
            id="email"
            name="email"
            type="email"
            register={register}
            label="Login"
            hasAutoFocus
            errorMessage={errors.email?.message}
            validate={email}
          />
          <Input<ILoginForm>
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
