import "./radio.scss";
import * as React from "react";
interface RadioGroupProps {
    className?: any;
    value?: any;
    asButtons?: boolean;
    disabled?: boolean;
    onChange?(value: string): void;
}
export declare class RadioGroup extends React.Component<RadioGroupProps, {}> {
    render(): JSX.Element;
}
declare type RadioProps = React.HTMLProps<any> & {
    name?: string;
    label?: React.ReactNode | any;
    value?: any;
    checked?: boolean;
    disabled?: boolean;
    onChange?(value: React.ChangeEvent<HTMLInputElement>): void;
};
export declare class Radio extends React.Component<RadioProps> {
    private elem;
    onChange: () => void;
    onKeyDown: (e: React.KeyboardEvent<any>) => void;
    render(): JSX.Element;
}
export {};
