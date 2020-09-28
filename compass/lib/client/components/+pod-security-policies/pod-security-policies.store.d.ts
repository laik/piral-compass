import { PodSecurityPolicy } from "../../api/endpoints";
import { KubeObjectStore } from "../../kube-object.store";
export declare class PodSecurityPoliciesStore extends KubeObjectStore<PodSecurityPolicy> {
    api: import("../../api/kube-api").KubeApi<PodSecurityPolicy>;
}
export declare const podSecurityPoliciesStore: PodSecurityPoliciesStore;
