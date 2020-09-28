import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare enum HpaMetricType {
    Resource = "Resource",
    Pods = "Pods",
    Object = "Object",
    External = "External"
}
export declare type IHpaMetricData<T = any> = T & {
    target?: {
        kind: string;
        name: string;
        apiVersion: string;
    };
    name?: string;
    metricName?: string;
    currentAverageUtilization?: number;
    currentAverageValue?: string;
    targetAverageUtilization?: number;
    targetAverageValue?: string;
};
export interface IHpaMetric {
    [kind: string]: IHpaMetricData;
    type: HpaMetricType;
    resource?: IHpaMetricData<{
        name: string;
    }>;
    pods?: IHpaMetricData;
    external?: IHpaMetricData;
    object?: IHpaMetricData<{
        describedObject: {
            apiVersion: string;
            kind: string;
            name: string;
        };
    }>;
}
export declare class HorizontalPodAutoscaler extends KubeObject {
    static kind: string;
    spec: {
        scaleTargetRef: {
            kind: string;
            name: string;
            apiVersion: string;
        };
        minReplicas: number;
        maxReplicas: number;
        metrics: IHpaMetric[];
    };
    status: {
        currentReplicas: number;
        desiredReplicas: number;
        currentMetrics: IHpaMetric[];
        conditions: {
            lastTransitionTime: string;
            message: string;
            reason: string;
            status: string;
            type: string;
        }[];
    };
    getMaxPods(): number;
    getMinPods(): number;
    getReplicas(): number;
    getConditions(): {
        isReady: boolean;
        tooltip: string;
        lastTransitionTime: string;
        message: string;
        reason: string;
        status: string;
        type: string;
    }[];
    getMetrics(): IHpaMetric[];
    getCurrentMetrics(): IHpaMetric[];
    protected getMetricName(metric: IHpaMetric): string;
    getMetricValues(metric: IHpaMetric): string;
}
export declare const hpaApi: KubeApi<HorizontalPodAutoscaler>;
