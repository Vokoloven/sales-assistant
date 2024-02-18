import Input from '@/components/Input/Input';
import { useLoginForm } from '@/hooks/useLoginForm';
import type { ILoginForm } from '@/hooks/useLoginForm';
import { validator } from '@/utils/validators/validator';

import styles from './Login.module.scss';

const { email, password } = validator();

const Login = () => {
  const { errors, handleSubmit, onSubmit, register } = useLoginForm();

  return (
    <section className={styles.section}>
      <div className={styles.sectionAside}>
        <div className={styles.sectionLogo}></div>
        <h1 className={styles.sectioHeading}>Log in</h1>
        <form className={styles.sectionForm} onSubmit={handleSubmit(onSubmit)}>
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
      <div className={styles.sectionBackground}></div>
    </section>
  );
};

export default Login;
