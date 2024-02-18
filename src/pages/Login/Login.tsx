import Button from '@/components/Button/Button';
import {ButtonType} from '@/components/Button/constants';
import Input from '@/components/Input/Input';
import {useLoginForm} from '@/hooks/useLoginForm';
import type {ILoginForm} from '@/hooks/useLoginForm';
import {validator} from '@/utils/validators/validator';

import styles from './Login.module.scss';

const {email, password} = validator();

const Login = () => {
  const {errors, handleSubmit, onSubmit, register, isValid} = useLoginForm();

  return (
    <section className={styles.section}>
      <div className={styles.sectionAside}>
        <div className={styles.sectionLogo}></div>
        <h1 className={styles.sectionHeading}>Log in</h1>
        <form
          className={styles.sectionForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input<ILoginForm>
            id="email"
            name="email"
            type="text"
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
          <Button
            text="Sign in"
            type={ButtonType.Submit}
            isDisabled={!isValid}
          />
        </form>
      </div>
      <div className={styles.sectionBackground}></div>
    </section>
  );
};

export default Login;
