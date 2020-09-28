import "./crd-resources.scss";
import React from "react";
import { RouteComponentProps } from "react-router";
import { KubeObject } from "../../api/kube-object";
import { KubeObjectMenuProps } from "../kube-object/kube-object-menu";
import { ICRDRouteParams } from "./crd.route";
interface Props extends RouteComponentProps<ICRDRouteParams> {
}
export declare class CrdResources extends React.Component<Props> {
    componentDidMount(): void;
    get crd(): import("../../api/endpoints/crd.api").CustomResourceDefinition;
    get store(): import("../../kube-object.store").KubeObjectStore<any>;
    render(): JSX.Element;
}
export declare function CrdResourceMenu(props: KubeObjectMenuProps<KubeObject>): JSX.Element;
export {};
