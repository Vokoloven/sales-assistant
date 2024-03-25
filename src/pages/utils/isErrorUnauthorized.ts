import type {SerializedError} from "@reduxjs/toolkit";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";

import {STATUS_CODE} from "../../redux/utils";

export const isErrorUnauthorized = (error: FetchBaseQueryError | SerializedError | undefined): boolean => {
  if (error) {
    if ("status" in error && error.status === STATUS_CODE.UNAUTHORIZED) {
      return true;
    }
  }
  return false;
};
