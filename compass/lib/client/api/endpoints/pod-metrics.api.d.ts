import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class PodMetrics extends KubeObject {
    timestamp: string;
    window: string;
    containers: {
        name: string;
        usage: {
            cpu: string;
            memory: string;
        };
    }[];
}
export declare const podMetricsApi: KubeApi<PodMetrics>;
