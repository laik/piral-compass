/// <reference types="react-addons-linked-state-mixin" />
import './icon.scss';
import React from "react";
import { LocationDescriptor } from 'history';
import { TooltipDecoratorProps } from "../tooltip";
export interface IconProps extends React.HTMLAttributes<any>, TooltipDecoratorProps {
    material?: string;
    svg?: string;
    link?: LocationDescriptor;
    href?: string;
    size?: string | number;
    small?: boolean;
    big?: boolean;
    active?: boolean;
    interactive?: boolean;
    focusable?: boolean;
    sticker?: boolean;
    disabled?: boolean;
}
export declare class Icon extends React.PureComponent<IconProps> {
    static defaultProps: IconProps;
    get isInteractive(): boolean;
    onClick(evt: React.MouseEvent): void;
    onKeyDown(evt: React.KeyboardEvent<any>): void;
    render(): JSX.Element;
}
