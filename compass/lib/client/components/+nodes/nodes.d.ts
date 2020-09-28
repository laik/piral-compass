import "./nodes.scss";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { INodesRouteParams } from "./nodes.route";
import { Node } from "../../api/endpoints/nodes.api";
interface Props extends RouteComponentProps<INodesRouteParams> {
}
export declare class Nodes extends React.Component<Props> {
    private metricsWatcher;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderCpuUsage(node: Node): JSX.Element;
    renderMemoryUsage(node: Node): JSX.Element;
    renderDiskUsage(node: Node): any;
    renderConditions(node: Node): JSX.Element[];
    render(): JSX.Element;
}
export {};
