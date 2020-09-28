import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class Role extends KubeObject {
    static kind: string;
    rules: {
        verbs: string[];
        apiGroups: string[];
        resources: string[];
        resourceNames?: string[];
    }[];
    getRules(): {
        verbs: string[];
        apiGroups: string[];
        resources: string[];
        resourceNames?: string[];
    }[];
}
export declare const roleApi: KubeApi<Role>;
