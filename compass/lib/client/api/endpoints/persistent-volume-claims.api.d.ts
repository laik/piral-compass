import { KubeObject } from "../kube-object";
import { IMetrics } from "./metrics.api";
import { Pod } from "./pods.api";
import { KubeApi } from "../kube-api";
export declare class PersistentVolumeClaimsApi extends KubeApi<PersistentVolumeClaim> {
    getMetrics(pvcName: string, namespace: string): Promise<IPvcMetrics>;
}
export interface IPvcMetrics<T = IMetrics> {
    [key: string]: T;
    diskUsage: T;
    diskCapacity: T;
}
export interface PersistentVolumeClaimVolumeSource {
    claimName: string;
    readOnly?: boolean;
}
export interface PersistentVolumeClaimSpec {
    accessModes: string[];
    storageClassName: string;
    selector: {
        matchLabels: {
            release: string;
        };
        matchExpressions: {
            key: string;
            operator: string;
            values: string[];
        }[];
    };
    resources: {
        requests: {
            storage: string;
        };
    };
}
export declare class PersistentVolumeClaim extends KubeObject {
    static kind: string;
    spec: PersistentVolumeClaimSpec;
    status: {
        phase: string;
    };
    getPods(allPods: Pod[]): Pod[];
    getStorage(): string;
    getMatchLabels(): string[];
    getMatchExpressions(): {
        key: string;
        operator: string;
        values: string[];
    }[];
    getStatus(): string;
}
export declare const pvcApi: PersistentVolumeClaimsApi;
