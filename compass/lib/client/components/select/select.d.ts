import "./select.scss";
import React, { ReactNode } from "react";
import { components as ReactSelectComponents } from "react-select";
import { Props as ReactSelectProps } from "react-select/base";
import { CreatableProps } from "react-select/creatable";
import { ActionMeta } from "react-select/src/types";
export { ReactSelectComponents };
export interface GroupSelectOption<T extends SelectOption = SelectOption> {
    label: ReactNode;
    options: T[];
}
export interface SelectOption<T = any> {
    value: T;
    label?: React.ReactNode;
}
export interface SelectProps<T = any> extends ReactSelectProps<T>, CreatableProps<T> {
    value?: T;
    themeName?: "dark" | "light" | "outlined";
    menuClass?: string;
    isCreatable?: boolean;
    autoConvertOptions?: boolean;
    onChange?(value: T, meta?: ActionMeta<any>): void;
}
export declare class Select extends React.Component<SelectProps> {
    static defaultProps: SelectProps;
    private theme;
    private styles;
    protected isValidOption(opt: SelectOption | any): boolean;
    get selectedOption(): SelectOption<any> | SelectOption<any>[];
    get options(): SelectOption[];
    onChange(value: SelectOption, meta: ActionMeta<any>): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLElement>): void;
    render(): JSX.Element;
}
