import classnames from 'classnames';
import classNames from 'classnames';

import Button from '@/components/Button/Button';
import {ButtonType} from '@/components/Button/constants';
import {InputType} from '@/components/Input/constants';
import Input from '@/components/Input/Input';
import {useLoginForm} from '@/hooks/useLoginForm';
import {getTheme} from '@/hooks/useTheme';
import {ILoginRequestDTO} from '@/submodules/interfaces/dto/auth/iadmin-login-request.interface';
import {validator} from '@/utils/validators/validator';

import styles from './Login.module.scss';

const {email, password} = validator();
const theme = getTheme();

const Login = () => {
  const {errors, handleSubmit, onSubmit, register, isValid, isDirtyPassword} = useLoginForm();

  return (
    <section className={classnames(styles.section, styles[`${theme}`])}>
      <div className={styles.sectionAside}>
        <div className={styles.sectionLogo}></div>
        <h1 className={classNames(styles.sectionHeading, styles[`${theme}`])}>Log in</h1>
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
            isDirtyPassword={isDirtyPassword}
          />
          <Button
            text="Sign in"
            type={ButtonType.Submit}
            isDisabled={!isValid}
          />
        </form>
      </div>
      <div className={classnames(styles.sectionBackground, styles[`${theme}`])}></div>
    </section>
  );
};

export default Login;
