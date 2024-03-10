import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/constants";
import {InputType} from "../../components/Input/constants";
import Input from "../../components/Input/Input";
import {NotifyType} from "../../components/Notify/constants";
import Notify from "../../components/Notify/Notify";
import {useLoginMutation} from "../../redux/api/authApi";
import {ILoginRequestDTO} from "../../submodules/interfaces/dto/auth/iadmin-login-request.interface";
import type {IApiResponseDTO} from "../../submodules/interfaces/dto/common/iapi-response.interface";
import {validator} from "../../utils/validators/validator";

import styles from "./Login.module.scss";

const {email, password} = validator();

const Login = () => {
  const [login, {error}] = useLoginMutation();
  const {data} = (error as {data: IApiResponseDTO}) ?? {};

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isValid, dirtyFields},
  } = useForm<ILoginRequestDTO>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(errors);

  const isDirtyPassword = dirtyFields?.password;

  const handleErrorMessage = () => {
    const isDirtyFields = Boolean(Object.keys(dirtyFields).length);

    if (!isDirtyFields && data?.error?.errorCode) {
      return data.error.errorCode;
    } else {
      return "";
    }
  };

  const onSubmit: SubmitHandler<ILoginRequestDTO> = async (data) => {
    try {
      await login(data).unwrap();
    } catch (error) {
      /* empty */
    } finally {
      reset(data);
    }
  };

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
            <Notify
              type={NotifyType.Error}
              message={handleErrorMessage()}
            />
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
