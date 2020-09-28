import "./node-details.scss";
import React from "react";
import { KubeObjectDetailsProps } from "../kube-object";
import { Node } from "../../api/endpoints";
interface Props extends KubeObjectDetailsProps<Node> {
}
export declare class NodeDetails extends React.Component<Props> {
    clean: import("mobx").IReactionDisposer;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
