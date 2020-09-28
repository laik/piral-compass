import "./input.scss";
import React, { DOMAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Validator } from "./input.validators";
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
declare type InputElement = HTMLInputElement | HTMLTextAreaElement;
declare type InputElementProps = InputHTMLAttributes<InputElement> & TextareaHTMLAttributes<InputElement> & DOMAttributes<InputElement>;
export declare type InputProps<T = string> = Omit<InputElementProps, "onChange"> & {
    theme?: "round-black";
    className?: string;
    value?: T;
    multiLine?: boolean;
    maxRows?: number;
    dirty?: boolean;
    showValidationLine?: boolean;
    iconLeft?: string | React.ReactNode;
    iconRight?: string | React.ReactNode;
    validators?: Validator | Validator[];
    onChange?(value: T, evt: React.ChangeEvent<InputElement>): void;
};
interface State {
    focused?: boolean;
    dirty?: boolean;
    dirtyOnBlur?: boolean;
    valid?: boolean;
    validating?: boolean;
    errors?: React.ReactNode[];
}
export declare class Input extends React.Component<InputProps, State> {
    static defaultProps: object;
    input: InputElement;
    validators: Validator[];
    state: State;
    setValue(value: string): void;
    getValue(): string;
    focus(): void;
    blur(): void;
    select(): void;
    private autoFitHeight;
    private validationId;
    validate(value?: string): Promise<void>;
    setValidation(errors: React.ReactNode[]): void;
    private getValidatorError;
    private setupValidators;
    setDirty(dirty?: boolean): void;
    onFocus(evt: React.FocusEvent<InputElement>): void;
    onBlur(evt: React.FocusEvent<InputElement>): void;
    onChange(evt: React.ChangeEvent<any>): void;
    get showMaxLenIndicator(): boolean;
    get isUncontrolled(): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: InputProps): void;
    bindRef(elem: InputElement): void;
    render(): JSX.Element;
}
export {};
