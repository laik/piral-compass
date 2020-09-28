import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class StorageClass extends KubeObject {
    static kind: string;
    provisioner: string;
    mountOptions?: string[];
    volumeBindingMode: string;
    reclaimPolicy: string;
    parameters: {
        [param: string]: string;
    };
    isDefault(): boolean;
    getVolumeBindingMode(): string;
    getReclaimPolicy(): string;
}
export declare const storageClassApi: KubeApi<StorageClass>;
