import { IClusterMetrics, INodeMetrics, Node } from "../../api/endpoints";
import { KubeObjectStore } from "../../kube-object.store";
export declare class NodesStore extends KubeObjectStore<Node> {
    api: import("../../api/endpoints").NodesApi;
    metrics: Partial<INodeMetrics>;
    nodeMetrics: Partial<IClusterMetrics>;
    metricsLoading: boolean;
    metricsLoaded: boolean;
    loadUsageMetrics(): Promise<void>;
    loadMetrics(nodeName: string): Promise<void>;
    get masterNodes(): Node[];
    get workerNodes(): Node[];
    getLastMetricValues(node: Node, metricNames: string[]): number[];
    reset(): void;
}
export declare const nodesStore: NodesStore;
