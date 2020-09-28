import "./drawer.scss";
import React from "react";
import { AnimateName } from "../animate";
export interface DrawerProps {
    open: boolean;
    title: React.ReactNode;
    size?: string;
    usePortal?: boolean;
    className?: string | object;
    contentClass?: string | object;
    position?: "top" | "left" | "right" | "bottom";
    animation?: AnimateName;
    onClose?: () => void;
    toolbar?: React.ReactNode;
}
export declare class Drawer extends React.Component<DrawerProps> {
    static defaultProps: object;
    private mouseDownTarget;
    private contentElem;
    private scrollElem;
    private scrollPos;
    private stopListenLocation;
    componentDidMount(): void;
    componentWillUnmount(): void;
    saveScrollPos: () => void;
    restoreScrollPos: () => void;
    onEscapeKey: (evt: KeyboardEvent) => void;
    onClickOutside: (evt: MouseEvent) => void;
    onMouseDown: (evt: MouseEvent) => void;
    close: () => void;
    render(): JSX.Element;
}
