import "./event-details.scss";
import React from "react";
import { KubeObjectDetailsProps } from "../kube-object";
import { KubeEvent } from "../../api/endpoints/events.api";
interface Props extends KubeObjectDetailsProps<KubeEvent> {
}
export declare class EventDetails extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
