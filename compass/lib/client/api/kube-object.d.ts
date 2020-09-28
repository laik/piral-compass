import { KubeJsonApiData, KubeJsonApiDataList } from "./kube-json-api";
import { ItemObject } from "../item.store";
export declare type IKubeObjectConstructor<T extends KubeObject = any> = (new (data: KubeJsonApiData | any) => T) & {
    kind?: string;
};
export interface IKubeObjectMetadata {
    uid: string;
    name: string;
    namespace?: string;
    creationTimestamp: string;
    resourceVersion: string;
    selfLink: string;
    deletionTimestamp?: string;
    finalizers?: string[];
    continue?: string;
    labels?: {
        [label: string]: string;
    };
    annotations?: {
        [annotation: string]: string;
    };
    ownerReferences?: OwnerReferences[];
}
export interface OwnerReferences {
    apiVersion: string;
    kind: string;
    name: string;
    uid: string;
    controller: boolean;
    blockOwnerDeletion: boolean;
}
export declare type IKubeMetaField = keyof KubeObject["metadata"];
export declare class KubeObject implements ItemObject {
    static readonly kind: string;
    static create(data: any): KubeObject;
    static isNonSystem(item: KubeJsonApiData | KubeObject): boolean;
    static isJsonApiData(object: any): object is KubeJsonApiData;
    static isJsonApiDataList(object: any): object is KubeJsonApiDataList;
    static stringifyLabels(labels: {
        [name: string]: string;
    }): string[];
    static mapperLablesOrAnnotations(data: string[]): Map<string, string>;
    constructor(data: KubeJsonApiData);
    apiVersion: string;
    kind: string;
    metadata: IKubeObjectMetadata;
    get selfLink(): string;
    getId(): string;
    getResourceVersion(): string;
    getName(): string;
    getNs(): string;
    getCreationTime(): string;
    getAge(humanize?: boolean, compact?: boolean, fromNow?: boolean): string | number;
    getFinalizers(): string[];
    getLabels(): string[];
    copyLabels(): {
        [k: string]: string;
    };
    copyAnnotations(): {
        [k: string]: string;
    };
    addLabel(key: string, value: string): void;
    removeLable(key: string): void;
    getValueFromLabels(key: string): string;
    getAnnotations(): string[];
    addOwnerReferences(ownerReferences: OwnerReferences[]): void;
    addAnnotation(key: string, value: string): void;
    removeAnnotation(key: string): void;
    getValueFromAnnotations(key: string): string;
    getSearchFields(): string[];
    toPlainObject(): object;
    update<T extends KubeObject>(data: Partial<T>): Promise<T>;
    delete(): import("../utils/cancelableFetch").CancelablePromise<KubeJsonApiData>;
}
