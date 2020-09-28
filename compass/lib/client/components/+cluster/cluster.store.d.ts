import { KubeObjectStore } from "../../kube-object.store";
import { Cluster, IClusterMetrics } from "../../api/endpoints";
import { IMetricsReqParams } from "../../api/endpoints/metrics.api";
export declare enum MetricType {
    MEMORY = "memory",
    CPU = "cpu"
}
export declare enum MetricNodeRole {
    MASTER = "master",
    WORKER = "worker"
}
export declare class ClusterStore extends KubeObjectStore<Cluster> {
    api: import("../../api/endpoints").ClusterApi;
    metrics: Partial<IClusterMetrics>;
    liveMetrics: Partial<IClusterMetrics>;
    metricsLoaded: boolean;
    metricType: MetricType;
    metricNodeRole: MetricNodeRole;
    constructor();
    loadMetrics(params?: IMetricsReqParams): Promise<IClusterMetrics<import("../../api/endpoints/metrics.api").IMetrics>>;
    getAllMetrics(): Promise<void>;
    getMetrics(): Promise<void>;
    getLiveMetrics(): Promise<void>;
    getMetricsValues(source: Partial<IClusterMetrics>): [number, string][];
    resetMetrics(): void;
    reset(): void;
}
export declare const clusterStore: ClusterStore;
