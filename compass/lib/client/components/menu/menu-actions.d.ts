import "./menu-actions.scss";
import React from "react";
import { IconProps } from "../icon";
import { MenuProps } from "../menu";
export interface MenuActionsProps extends Partial<MenuProps> {
    className?: string;
    toolbar?: boolean;
    triggerIcon?: string | IconProps | React.ReactNode;
    removeConfirmationMessage?: React.ReactNode | (() => React.ReactNode);
    updateAction?(): void;
    removeAction?(): void;
}
export declare class MenuActions extends React.Component<MenuActionsProps> {
    static defaultProps: MenuActionsProps;
    id: string;
    isOpen: boolean;
    toggle: () => void;
    remove(): void;
    renderTriggerIcon(): JSX.Element;
    render(): JSX.Element;
}
