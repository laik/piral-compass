import "./issuers.scss";
import * as React from "react";
import { KubeObjectMenuProps } from "../../kube-object/kube-object-menu";
import { KubeObjectListLayoutProps } from "../../kube-object";
import { Issuer } from "../../../api/endpoints/cert-manager.api";
export declare class ClusterIssuers extends React.Component<KubeObjectListLayoutProps> {
    render(): JSX.Element;
}
export declare class Issuers extends React.Component<KubeObjectListLayoutProps> {
    render(): JSX.Element;
}
export declare function IssuerMenu(props: KubeObjectMenuProps<Issuer>): JSX.Element;
