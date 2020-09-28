import { KubeObject } from "../kube-object";
import { IMetrics } from "./metrics.api";
import { KubeApi } from "../kube-api";
export declare class NodesApi extends KubeApi<Node> {
    getMetrics(): Promise<INodeMetrics>;
}
export interface INodeMetrics<T = IMetrics> {
    [metric: string]: T;
    memoryUsage: T;
    memoryCapacity: T;
    cpuUsage: T;
    cpuCapacity: T;
    fsUsage: T;
    fsSize: T;
}
export declare class Node extends KubeObject {
    static kind: string;
    spec: {
        podCIDR: string;
        externalID: string;
        taints?: {
            key: string;
            value: string;
            effect: string;
        }[];
        unschedulable?: boolean;
    };
    status: {
        capacity: {
            cpu: string;
            memory: string;
            pods: string;
        };
        allocatable: {
            cpu: string;
            memory: string;
            pods: string;
        };
        conditions: {
            type: string;
            status?: string;
            lastHeartbeatTime?: string;
            lastTransitionTime?: string;
            reason?: string;
            message?: string;
        }[];
        addresses: {
            type: string;
            address: string;
        }[];
        nodeInfo: {
            machineID: string;
            systemUUID: string;
            bootID: string;
            kernelVersion: string;
            osImage: string;
            containerRuntimeVersion: string;
            kubeletVersion: string;
            kubeProxyVersion: string;
            operatingSystem: string;
            architecture: string;
        };
        images: {
            names: string[];
            sizeBytes: number;
        }[];
    };
    getNodeConditionText(): string;
    getTaints(): {
        key: string;
        value: string;
        effect: string;
    }[];
    getRoleLabels(): string;
    getCpuCapacity(): number;
    getMemoryCapacity(): number;
    getConditions(): {
        type: string;
        status?: string;
        lastHeartbeatTime?: string;
        lastTransitionTime?: string;
        reason?: string;
        message?: string;
    }[];
    getActiveConditions(): {
        type: string;
        status?: string;
        lastHeartbeatTime?: string;
        lastTransitionTime?: string;
        reason?: string;
        message?: string;
    }[];
    getWarningConditions(): {
        type: string;
        status?: string;
        lastHeartbeatTime?: string;
        lastTransitionTime?: string;
        reason?: string;
        message?: string;
    }[];
    getKubeletVersion(): string;
    getOperatingSystem(): string;
    isUnschedulable(): boolean;
}
export declare const nodesApi: NodesApi;
