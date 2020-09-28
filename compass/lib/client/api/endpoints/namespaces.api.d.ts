import { KubeApi } from "../kube-api";
import { KubeObject } from "../kube-object";
export declare enum NamespaceStatus {
    ACTIVE = "Active",
    TERMINATING = "Terminating"
}
export declare class Namespace extends KubeObject {
    static kind: string;
    status?: {
        phase: string;
    };
    getStatus(): string;
}
export declare const namespacesApi: KubeApi<Namespace>;
