import {useForm} from "react-hook-form";
import type {SubmitHandler} from "react-hook-form";
import {useDispatch} from "react-redux";

import type {AppDispatch} from "redux/store";
import {ILoginRequestDTO} from "submodules/interfaces/dto/auth/iadmin-login-request.interface";

import {useLoginMutation} from "../redux/api/authApi";
import {setCredentials} from "../redux/slice/authSlice";

export const useLoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      const user = await login(data).unwrap();

      dispatch(setCredentials(user));
    } catch (error) {
      console.log(error);
    }
  };

  const isDirtyPassword = dirtyFields?.password;

  return {onSubmit, register, handleSubmit, errors, isValid, isDirtyPassword};
};
