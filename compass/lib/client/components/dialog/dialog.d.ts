import "./dialog.scss";
import * as React from "react";
export interface DialogProps {
    className?: string;
    isOpen?: boolean;
    open?: () => void;
    close?: () => void;
    onOpen?: () => void;
    onClose?: () => void;
    modal?: boolean;
    pinned?: boolean;
    animated?: boolean;
}
interface DialogState {
    isOpen: boolean;
}
export declare class Dialog extends React.PureComponent<DialogProps, DialogState> {
    private contentElem;
    static defaultProps: DialogProps;
    closeOnNavigate: import("mobx").IReactionDisposer;
    state: DialogState;
    get elem(): HTMLElement;
    get isOpen(): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: DialogProps): void;
    componentWillUnmount(): void;
    toggle(isOpen: boolean): void;
    open(): void;
    close(): void;
    onOpen: () => void;
    onClose: () => void;
    onEscapeKey: (evt: KeyboardEvent) => void;
    onClickOutside: (evt: MouseEvent) => void;
    render(): React.ReactPortal;
}
export {};
