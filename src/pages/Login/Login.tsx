import Button from '@/components/Button/Button';
import {ButtonType} from '@/components/Button/constants';
import {InputType} from '@/components/Input/constants';
import Input from '@/components/Input/Input';
import {useLoginForm} from '@/hooks/useLoginForm';
import {useTheme} from '@/hooks/useTheme';
import {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';
import {validator} from '@/utils/validators/validator';

import styles from './Login.module.scss';

const {email, password} = validator();

const Login = () => {
  useTheme();
  const {errors, handleSubmit, onSubmit, register, isValid, isDirtyPassword, togglePasswordVisibility} = useLoginForm();

  return (
    <section className={styles.section}>
      <div className={styles.sectionAside}>
        <div className={styles.sectionLogo}></div>
        <h1 className={styles.sectionHeading}>Log in</h1>
        <form
          className={styles.sectionForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input<ILoginRequestDTO>
            id="email"
            name="email"
            type={InputType.Email}
            register={register}
            label="Login"
            errorMessage={errors.email?.message}
            validate={email}
          />
          <Input<ILoginRequestDTO>
            id="password"
            name="password"
            type={InputType.Password}
            register={register}
            label="Password"
            errorMessage={errors.password?.message}
            validate={password}
            passwordVisibility={{isDirty: isDirtyPassword, toggler: togglePasswordVisibility}}
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
