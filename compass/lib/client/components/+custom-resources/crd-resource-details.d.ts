import "./crd-resource-details.scss";
import * as React from "react";
import { KubeObjectDetailsProps } from "../kube-object";
import { KubeObject } from "../../api/kube-object";
interface Props extends KubeObjectDetailsProps<KubeObject & {
    status: any;
}> {
}
export declare class CrdResourceDetails extends React.Component<Props> {
    get crd(): import("../../api/endpoints/crd.api").CustomResourceDefinition;
    get CustomDetailsViews(): React.ComponentType<KubeObjectDetailsProps<KubeObject>>;
    render(): JSX.Element;
}
export {};
