import { Role } from "./role.api";
import { KubeApi } from "../kube-api";
export declare class ClusterRole extends Role {
    static kind: string;
}
export declare const clusterRoleApi: KubeApi<ClusterRole>;
