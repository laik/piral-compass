import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class ServiceAccount extends KubeObject {
    static kind: string;
    secrets?: {
        name: string;
    }[];
    imagePullSecrets?: {
        name: string;
    }[];
    getSecrets(): {
        name: string;
    }[];
    getImagePullSecrets(): {
        name: string;
    }[];
}
export declare const serviceAccountsApi: KubeApi<ServiceAccount>;
