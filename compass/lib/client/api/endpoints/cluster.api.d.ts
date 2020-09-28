import { IMetrics, IMetricsReqParams } from "./metrics.api";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class ClusterApi extends KubeApi<Cluster> {
    getMetrics(nodeNames: string[], params?: IMetricsReqParams): Promise<IClusterMetrics>;
}
export declare enum ClusterStatus {
    ACTIVE = "Active",
    CREATING = "Creating",
    REMOVING = "Removing",
    ERROR = "Error"
}
export interface IClusterMetrics<T = IMetrics> {
    [metric: string]: T;
    memoryUsage: T;
    memoryRequests: T;
    memoryLimits: T;
    memoryCapacity: T;
    cpuUsage: T;
    cpuRequests: T;
    cpuLimits: T;
    cpuCapacity: T;
    podUsage: T;
    podCapacity: T;
    fsSize: T;
    fsUsage: T;
}
export declare class Cluster extends KubeObject {
    static kind: string;
    spec: {
        clusterNetwork?: {
            serviceDomain?: string;
            pods?: {
                cidrBlocks?: string[];
            };
            services?: {
                cidrBlocks?: string[];
            };
        };
        providerSpec: {
            value: {
                profile: string;
            };
        };
    };
    status?: {
        apiEndpoints: {
            host: string;
            port: string;
        }[];
        providerStatus: {
            adminUser?: string;
            adminPassword?: string;
            kubeconfig?: string;
            processState?: string;
            lensAddress?: string;
        };
        errorMessage?: string;
        errorReason?: string;
    };
    getStatus(): ClusterStatus;
}
export declare const clusterApi: ClusterApi;
