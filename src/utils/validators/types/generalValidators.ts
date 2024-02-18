type TProps<T> = {
  value: T;
  message: string;
};

export type TRequired = {required: TProps<boolean>};
export type TMaxLength = {maxLength: TProps<number>};
export type TMinLength = {minLength: TProps<number>};
export type TPattern = {pattern: TProps<RegExp>};
