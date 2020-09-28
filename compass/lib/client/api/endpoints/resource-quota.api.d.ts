import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
import { KubeJsonApiData } from "../kube-json-api";
export interface IResourceQuotaValues {
    [quota: string]: string;
    "limits.cpu"?: string;
    "limits.memory"?: string;
    "requests.cpu"?: string;
    "requests.memory"?: string;
    "requests.storage"?: string;
    "persistentvolumeclaims"?: string;
    "count/pods"?: string;
    "count/persistentvolumeclaims"?: string;
    "count/services"?: string;
    "count/secrets"?: string;
    "count/configmaps"?: string;
    "count/replicationcontrollers"?: string;
    "count/deployments.apps"?: string;
    "count/replicasets.apps"?: string;
    "count/statefulsets.apps"?: string;
    "count/jobs.batch"?: string;
    "count/cronjobs.batch"?: string;
    "count/deployments.extensions"?: string;
}
export declare class ResourceQuota extends KubeObject {
    static kind: string;
    constructor(data: KubeJsonApiData);
    spec: {
        hard: IResourceQuotaValues;
        scopeSelector?: {
            matchExpressions: {
                operator: string;
                scopeName: string;
                values: string[];
            }[];
        };
    };
    status: {
        hard: IResourceQuotaValues;
        used: IResourceQuotaValues;
    };
    getScopeSelector(): {
        operator: string;
        scopeName: string;
        values: string[];
    }[];
}
export declare const resourceQuotaApi: KubeApi<ResourceQuota>;
