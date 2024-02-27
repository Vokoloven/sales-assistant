import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";

import Button from "components/Button/Button";
import {ButtonType} from "components/Button/constants";
import {InputType} from "components/Input/constants";
import Input from "components/Input/Input";
import {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";
import {validator} from "utils/validators/validator";

import styles from "./Login.module.scss";
import {useLoginMutation} from "../../redux/api/authApi";

const {email, password} = validator();

const Login = () => {
  const [login] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid, dirtyFields},
  } = useForm<ILoginRequestDTO>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ILoginRequestDTO> = async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const isDirtyPassword = dirtyFields?.password;

  return (
    <section className={styles.section}>
      <div className={styles.sectionAside}>
        <div className={styles.sectionAsideBox}>
          <div className={styles.sectionAsideBoxOuter}>
            <div className={styles.sectionAsideBoxInner}>
              <div className={styles.sectionLogo}></div>
            </div>
          </div>
          <div className={styles.sectionAsideBoxOuter}>
            <div className={styles.sectionAsideBoxInner}>
              <h1 className={styles.sectionHeading}>Log in</h1>
            </div>
          </div>
          <div className={styles.sectionAsideBoxOuter}>
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
        </div>
      </div>
      <div className={styles.sectionBackground}></div>
    </section>
  );
};

export default Login;
