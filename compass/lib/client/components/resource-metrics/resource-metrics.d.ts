import "./resource-metrics.scss";
import React from "react";
import { KubeObject } from "../../api/kube-object";
interface Props extends React.HTMLProps<any> {
    tabs: React.ReactNode[];
    object?: KubeObject;
    loader?: () => void;
    interval?: number;
    className?: string;
    params?: {
        [key: string]: any;
    };
}
export declare type IResourceMetricsValue<T extends KubeObject = any, P = any> = {
    object: T;
    tabId: number;
    params?: P;
};
export declare const ResourceMetricsContext: React.Context<IResourceMetricsValue<any, any>>;
export declare function ResourceMetrics({ object, loader, interval, tabs, children, className, params }: Props): JSX.Element;
export declare namespace ResourceMetrics {
    var defaultProps: Partial<Props>;
}
export {};
