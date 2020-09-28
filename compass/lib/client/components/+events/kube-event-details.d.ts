import "./kube-event-details.scss";
import React from "react";
import { KubeObject } from "../../api/kube-object";
interface Props {
    object: KubeObject;
    title?: React.ReactNode;
}
export declare class KubeEventDetails extends React.Component<Props> {
    static defaultProps: {
        title: string;
    };
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
export {};
