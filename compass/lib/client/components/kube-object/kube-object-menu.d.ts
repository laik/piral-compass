import React from "react";
import { KubeObject } from "../../api/kube-object";
import { MenuActionsProps } from "../menu/menu-actions";
export interface KubeObjectMenuProps<T extends KubeObject = any> extends MenuActionsProps {
    object: T;
    editable?: boolean;
    removable?: boolean;
}
export declare class KubeObjectMenu extends React.Component<KubeObjectMenuProps> {
    get store(): import("../../kube-object.store").KubeObjectStore<any>;
    get isEditable(): boolean;
    get isRemovable(): boolean;
    update(): Promise<void>;
    remove(): Promise<void>;
    renderRemoveMessage(): JSX.Element;
    render(): JSX.Element;
}
