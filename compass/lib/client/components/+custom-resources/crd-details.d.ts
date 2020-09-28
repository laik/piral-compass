import "./crd-details.scss";
import * as React from "react";
import { CustomResourceDefinition } from "../../api/endpoints/crd.api";
import { KubeObjectDetailsProps } from "../kube-object";
interface Props extends KubeObjectDetailsProps<CustomResourceDefinition> {
}
export declare class CRDDetails extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
