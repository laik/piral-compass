import "./namespace-details.scss";
import * as React from "react";
import { Namespace } from "../../api/endpoints";
import { KubeObjectDetailsProps } from "../kube-object";
interface Props extends KubeObjectDetailsProps<Namespace> {
}
export declare class NamespaceDetails extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
