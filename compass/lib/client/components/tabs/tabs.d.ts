import "./tabs.scss";
import React, { DOMAttributes } from "react";
interface TabsContextValue<D = any> {
    autoFocus?: boolean;
    value?: D;
    onChange?(value: D): void;
}
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface TabsProps<D = any> extends TabsContextValue<D>, Omit<DOMAttributes<HTMLElement>, "onChange"> {
    className?: string;
    center?: boolean;
    wrap?: boolean;
    scrollable?: boolean;
}
export declare class Tabs extends React.PureComponent<TabsProps> {
    elem: HTMLElement;
    protected bindRef(elem: HTMLElement): void;
    render(): JSX.Element;
}
export interface TabProps<D = any> extends DOMAttributes<HTMLElement> {
    className?: string;
    active?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode | string;
    label?: React.ReactNode;
    value: D;
}
export declare class Tab extends React.PureComponent<TabProps> {
    static contextType: React.Context<TabsContextValue<any>>;
    context: TabsContextValue;
    elem: HTMLElement;
    get isActive(): boolean;
    focus(): void;
    scrollIntoView(): void;
    onClick(evt: React.MouseEvent<HTMLElement>): void;
    onFocus(evt: React.FocusEvent<HTMLElement>): void;
    onKeyDown(evt: React.KeyboardEvent<HTMLElement>): void;
    componentDidMount(): void;
    protected bindRef(elem: HTMLElement): void;
    render(): JSX.Element;
}
export {};
