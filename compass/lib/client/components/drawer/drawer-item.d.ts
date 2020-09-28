/// <reference types="react-addons-linked-state-mixin" />
import "./drawer-item.scss";
import * as React from "react";
export interface DrawerItemProps extends React.HTMLAttributes<any> {
    name: React.ReactNode;
    className?: string;
    title?: string;
    labelsOnly?: boolean;
    hidden?: boolean;
}
export declare class DrawerItem extends React.Component<DrawerItemProps> {
    render(): JSX.Element;
}
