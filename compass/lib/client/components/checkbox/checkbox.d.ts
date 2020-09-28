import './checkbox.scss';
import React from 'react';
interface Props<T = boolean> {
    theme?: "dark" | "light";
    className?: string;
    label?: React.ReactNode;
    inline?: boolean;
    disabled?: boolean;
    value?: T;
    onChange?(value: T, evt: React.ChangeEvent<HTMLInputElement>): void;
}
export declare class Checkbox extends React.PureComponent<Props> {
    private input;
    onChange(evt: React.ChangeEvent<HTMLInputElement>): void;
    getValue(): boolean;
    render(): JSX.Element;
}
export {};
