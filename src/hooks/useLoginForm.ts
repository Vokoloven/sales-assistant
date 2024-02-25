import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";

import {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";

import {useLoginMutation} from "../redux/api/authApi";

export const useLoginForm = () => {
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

  return {onSubmit, register, handleSubmit, errors, isValid, isDirtyPassword};
};
