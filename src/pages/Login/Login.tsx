/* eslint-disable indent */
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";

import Button from "../../components/Button/Button";
import {ButtonType} from "../../components/Button/constants";
import {IconAppName} from "../../components/Icons/constants";
import {InputType} from "../../components/Input/constants";
import Input from "../../components/Input/Input";
import {NotifyType} from "../../components/Notify/constants";
import Notify from "../../components/Notify/Notify";
import Spinner from "../../components/Spinner/Spinner";
import {useLoginMutation} from "../../redux/api/authApi";
import {ILoginRequestDTO} from "../../submodules/interfaces/dto/auth/iadmin-login-request.interface";
import type {IApiResponseDTO} from "../../submodules/interfaces/dto/common/iapi-response.interface";
import {KeyExtractor} from "../../utils/types/keyExtractor";
import {validator} from "../../utils/validators/validator";

import styles from "./Login.module.scss";

const {email, password} = validator();

const Inputs = {
  Email: {
    id: "email",
    name: "email",
    label: "Login",
    type: InputType.Email,
  },
  Password: {
    id: "password",
    name: "password",
    label: "Password",
    type: InputType.Password,
  },
} as const;

const Login = () => {
  const [login, {error, isLoading}] = useLoginMutation();
  const [passwordInputType, setPasswordInputType] = useState<KeyExtractor<typeof InputType>>(Inputs.Password.type);
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

  useEffect(() => {
    const passwordInput = document.getElementById(Inputs.Password.id) as HTMLInputElement;

    passwordInput.type = passwordInputType;
  }, [passwordInputType]);

  const togglePasswordVisibility = (): void => {
    if (passwordInputType === InputType.Password) {
      setPasswordInputType(InputType.Text);
    } else {
      setPasswordInputType(InputType.Password);
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
                id={Inputs.Email.id}
                name={Inputs.Email.name}
                type={Inputs.Email.type}
                register={register}
                label={Inputs.Email.label}
                errorMessage={errors.email?.message}
                validate={email}
              />
              <Input<ILoginRequestDTO>
                id={Inputs.Password.id}
                name={Inputs.Password.name}
                type={Inputs.Password.type}
                register={register}
                label={Inputs.Password.label}
                errorMessage={errors.password?.message}
                validate={password}
                buttonIcon={
                  isDirtyPassword
                    ? {
                        icon:
                          passwordInputType === Inputs.Password.type
                            ? IconAppName.ShowPassword
                            : IconAppName.HidePassword,
                        onClick: togglePasswordVisibility,
                      }
                    : undefined
                }
              />
              <Button
                text="Sign in"
                type={ButtonType.Submit}
                isDisabled={!isValid}
                isLoading={isLoading}
                spinner={<Spinner size="24px" />}
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
