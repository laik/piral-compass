import "./crd-list.scss";
import React from "react";
import { CustomResourceDefinition } from "../../api/endpoints/crd.api";
import { KubeObjectMenuProps } from "../kube-object/kube-object-menu";
export declare class CrdList extends React.Component {
    get groups(): string[];
    onGroupChange(group: string): void;
    render(): JSX.Element;
}
export declare function CRDMenu(props: KubeObjectMenuProps<CustomResourceDefinition>): JSX.Element;
