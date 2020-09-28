import './tooltip.scss';
import React from "react";
export interface TooltipProps {
    htmlFor: string;
    className?: string;
    position?: Position;
    useAnimation?: boolean;
    following?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
interface Position {
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    center?: boolean;
}
export declare class Tooltip extends React.Component<TooltipProps> {
    static defaultProps: object;
    anchor: HTMLElement;
    elem: HTMLElement;
    isVisible: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseEnter(evt: MouseEvent): void;
    onMouseLeave(evt: MouseEvent): void;
    onMouseMove(evt: MouseEvent): void;
    bindRef(elem: HTMLElement): void;
    render(): JSX.Element;
}
interface TooltipContentProps {
    className?: string;
    narrow?: boolean;
    warning?: boolean;
    small?: boolean;
    nowrap?: boolean;
    tableView?: boolean;
}
export declare class TooltipContent extends React.Component<TooltipContentProps> {
    render(): JSX.Element;
}
export {};
