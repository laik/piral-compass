import "./kube-object-details.scss";
import React from "react";
import { KubeObject } from "../../api/kube-object";
export interface KubeObjectDetailsProps<T = KubeObject> {
    className?: string;
    object: T;
}
export declare class KubeObjectDetails extends React.Component {
    isLoading: boolean;
    loadingError: React.ReactNode;
    get path(): string;
    get object(): any;
    get isCrdInstance(): boolean;
    loader: import("mobx").IReactionDisposer;
    render(): JSX.Element;
}
