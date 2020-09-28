import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export interface IRoleBindingSubject {
    kind: string;
    name: string;
    namespace?: string;
    apiGroup?: string;
}
export declare class RoleBinding extends KubeObject {
    static kind: string;
    subjects?: IRoleBindingSubject[];
    roleRef: {
        kind: string;
        name: string;
        apiGroup?: string;
    };
    getSubjects(): IRoleBindingSubject[];
    getSubjectNames(): string;
}
export declare const roleBindingApi: KubeApi<RoleBinding>;
