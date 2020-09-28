import React from "react";
import { KubeObject } from "../../api/kube-object";
import { ItemListLayoutProps } from "../item-object-list";
import { KubeObjectStore } from "../../kube-object.store";
export interface KubeObjectListLayoutProps extends ItemListLayoutProps {
    store: KubeObjectStore;
}
export declare class KubeObjectListLayout extends React.Component<KubeObjectListLayoutProps> {
    get selectedItem(): any;
    onDetails: (item: KubeObject) => void;
    render(): JSX.Element;
}
