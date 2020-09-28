import { ReactNode } from "react";
import { InputProps } from "./input";
export interface Validator {
    debounce?: number;
    condition?(props: InputProps): boolean;
    message?: ReactNode | ((value: string, props?: InputProps) => ReactNode | string);
    validate(value: string, props?: InputProps): boolean | Promise<any>;
}
export declare const isRequired: Validator;
export declare const isEmail: Validator;
export declare const isNumber: Validator;
export declare const isUrl: Validator;
export declare const minLength: Validator;
export declare const maxLength: Validator;
export declare const systemName: Validator;
export declare const accountId: Validator;
export declare const conditionalValidators: Validator[];
