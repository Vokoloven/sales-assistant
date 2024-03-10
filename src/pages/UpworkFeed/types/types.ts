import {options} from "../constants";

export type TOption = {
  [K in keyof (typeof options)[number]]: (typeof options)[number][K] extends number ? number : string;
};
