/// <reference types="lodash" />
import './menu.scss';
import React, { ReactNode } from "react";
import { IconProps } from "../icon";
export declare const MenuContext: React.Context<Menu>;
export declare type MenuContextValue = Menu;
interface MenuPosition {
    left?: boolean;
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
}
export interface MenuProps {
    isOpen?: boolean;
    open(): void;
    close(): void;
    className?: string;
    htmlFor?: string;
    autoFocus?: boolean;
    usePortal?: boolean | HTMLElement;
    closeOnClickItem?: boolean;
    closeOnClickOutside?: boolean;
    closeOnScroll?: boolean;
    position?: MenuPosition;
    children?: ReactNode;
}
interface State {
    position?: MenuPosition;
}
export declare class Menu extends React.Component<MenuProps, State> {
    static defaultProps: object;
    opener: HTMLElement;
    elem: HTMLUListElement;
    protected items: {
        [index: number]: MenuItem;
    };
    state: State;
    get isOpen(): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected get focusableItems(): MenuItem[];
    protected get focusedItem(): MenuItem;
    protected focusNextItem(reverse?: boolean): void;
    refreshPosition: import("lodash").DebouncedFunc<() => void>;
    open(): void;
    close(): void;
    toggle(): void;
    onKeyDown(evt: KeyboardEvent): void;
    onWindowResize(evt: UIEvent): void;
    onScrollOutside(evt: UIEvent): void;
    onClickOutside(evt: MouseEvent): void;
    protected bindRef(elem: HTMLUListElement): void;
    protected bindItemRef(item: MenuItem, index: number): void;
    render(): JSX.Element;
}
export declare function SubMenu(props: Partial<MenuProps>): JSX.Element;
export interface MenuItemProps extends React.HTMLProps<any> {
    icon?: string | Partial<IconProps>;
    disabled?: boolean;
    active?: boolean;
    spacer?: boolean;
    href?: string;
}
export declare class MenuItem extends React.Component<MenuItemProps> {
    static defaultProps: object;
    static contextType: React.Context<Menu>;
    context: MenuContextValue;
    elem: HTMLElement;
    get isFocusable(): boolean;
    get isLink(): boolean;
    onClick(evt: React.MouseEvent): void;
    protected bindRef(elem: HTMLElement): void;
    render(): JSX.Element;
}
export {};
