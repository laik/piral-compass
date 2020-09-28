import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class PersistentVolume extends KubeObject {
    static kind: string;
    spec: {
        capacity: {
            storage: string;
        };
        flexVolume: {
            driver: string;
            options: {
                clusterNamespace: string;
                image: string;
                pool: string;
                storageClass: string;
            };
        };
        mountOptions?: string[];
        accessModes: string[];
        claimRef: {
            kind: string;
            namespace: string;
            name: string;
            uid: string;
            apiVersion: string;
            resourceVersion: string;
        };
        persistentVolumeReclaimPolicy: string;
        storageClassName: string;
        nfs?: {
            path: string;
            server: string;
        };
    };
    status: {
        phase: string;
        reason?: string;
    };
    getCapacity(inBytes?: boolean): string | number;
    getStatus(): string;
    getClaimRefName(): string;
}
export declare const persistentVolumeApi: KubeApi<PersistentVolume>;
