import "./events.scss";
import React from "react";
import { KubeObjectListLayoutProps } from "../kube-object";
import { IClassName } from "../../utils";
interface Props extends Partial<KubeObjectListLayoutProps> {
    className?: IClassName;
    compact?: boolean;
    compactLimit?: number;
}
export declare class Events extends React.Component<Props> {
    static defaultProps: object;
    render(): JSX.Element;
}
export {};
