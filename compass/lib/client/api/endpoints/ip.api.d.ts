import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class IP extends KubeObject {
    static kind: string;
    spec: {
        namespace: string;
        ipAddress: string;
        macAddress: string;
        nodeName: string;
    };
}
export declare const ipApi: KubeApi<IP>;
