import "./namespaces.scss";
import * as React from "react";
import { Namespace } from "../../api/endpoints";
import { RouteComponentProps } from "react-router";
import { KubeObjectMenuProps } from "../kube-object/kube-object-menu";
import { INamespacesRouteParams } from "./namespaces.route";
interface Props extends RouteComponentProps<INamespacesRouteParams> {
}
export declare class Namespaces extends React.Component<Props> {
    render(): JSX.Element;
}
export declare function NamespaceMenu(props: KubeObjectMenuProps<Namespace>): JSX.Element;
export {};
