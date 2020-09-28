import { RoleBinding } from "./role-binding.api";
import { KubeApi } from "../kube-api";
export declare class ClusterRoleBinding extends RoleBinding {
    static kind: string;
}
export declare const clusterRoleBindingApi: KubeApi<ClusterRoleBinding>;
