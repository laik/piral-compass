/// <reference types="lodash" />
import "./search-input.scss";
import React from "react";
import { InputProps } from "../input";
interface Props extends InputProps {
    compact?: boolean;
}
export declare class SearchInput extends React.Component<Props> {
    static defaultProps: object;
    inputVal: string;
    updateInput: import("mobx").IReactionDisposer;
    updateUrl: import("lodash").DebouncedFunc<(val: string) => void>;
    setValue: (value: string) => void;
    clear: () => void;
    onChange: (val: string, evt: React.ChangeEvent<any>) => void;
    onKeyDown: (evt: React.KeyboardEvent<any>) => void;
    render(): JSX.Element;
}
export {};
