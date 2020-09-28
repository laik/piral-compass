import { IKubeObjectMetadata, KubeObject } from "./kube-object";
interface IToleration {
    key?: string;
    operator?: string;
    effect?: string;
    tolerationSeconds?: number;
}
interface IMatchExpression {
    key: string;
    operator: string;
    values: string[];
}
interface INodeAffinity {
    nodeSelectorTerms?: {
        matchExpressions: IMatchExpression[];
    }[];
    weight: number;
    preference: {
        matchExpressions: IMatchExpression[];
    };
}
interface IPodAffinity {
    labelSelector: {
        matchExpressions: IMatchExpression[];
    };
    topologyKey: string;
}
export interface IAffinity {
    nodeAffinity?: {
        requiredDuringSchedulingIgnoredDuringExecution?: INodeAffinity[];
        preferredDuringSchedulingIgnoredDuringExecution?: INodeAffinity[];
    };
    podAffinity?: {
        requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinity[];
        preferredDuringSchedulingIgnoredDuringExecution?: IPodAffinity[];
    };
    podAntiAffinity?: {
        requiredDuringSchedulingIgnoredDuringExecution?: IPodAffinity[];
        preferredDuringSchedulingIgnoredDuringExecution?: IPodAffinity[];
    };
}
export declare class WorkloadKubeObject extends KubeObject {
    metadata: IKubeObjectMetadata & {
        ownerReferences?: {
            apiVersion: string;
            kind: string;
            name: string;
            uid: string;
            controller: boolean;
            blockOwnerDeletion: boolean;
        }[];
    };
    spec: any;
    getOwnerRefs(): {
        namespace: string;
        apiVersion: string;
        kind: string;
        name: string;
        uid: string;
        controller: boolean;
        blockOwnerDeletion: boolean;
    }[];
    getSelectors(): string[];
    getNodeSelectors(): string[];
    getTemplateLabels(): string[];
    getTolerations(): IToleration[];
    getAffinity(): IAffinity;
    getAffinityNumber(): number;
}
export {};
