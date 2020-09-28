import "./kube-event-icon.scss";
import React from "react";
import { KubeObject } from "../../api/kube-object";
import { KubeEvent } from "../../api/endpoints/events.api";
interface Props {
    object: KubeObject;
    showWarningsOnly?: boolean;
    namespace?: string;
    filterEvents?: (events: KubeEvent[]) => KubeEvent[];
}
export declare class KubeEventIcon extends React.Component<Props> {
    static defaultProps: object;
    render(): JSX.Element;
}
export {};
