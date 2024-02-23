import {useEffect} from "react";
import {useDispatch} from "react-redux";

import type {AppDispatch} from "../redux/store";
import {refreshUser} from "../redux/thunk/authThunk";

export const useRefresh = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(refreshUser());
  });
};
