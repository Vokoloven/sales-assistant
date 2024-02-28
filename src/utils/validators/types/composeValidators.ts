import type {TRequired, TMaxLength, TMinLength, TPattern} from "./generalValidators";

export type TCombineGeneralValidator = TRequired | TMaxLength | TMinLength | TPattern;

export type TCombineGeneralValidatorResult = object | TCombineGeneralValidator;
