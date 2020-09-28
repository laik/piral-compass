import { IKubeObjectConstructor, KubeObject } from "./kube-object";
import { IKubeObjectRef, KubeJsonApi, KubeJsonApiData, KubeJsonApiDataList } from "./kube-json-api";
export interface IKubeApiOptions<T extends KubeObject> {
    kind: string;
    apiBase: string;
    isNamespaced: boolean;
    objectConstructor?: IKubeObjectConstructor<T>;
    request?: KubeJsonApi;
}
export interface IKubeApiQueryParams {
    watch?: boolean | number;
    resourceVersion?: string;
    timeoutSeconds?: number;
    limit?: number;
    continue?: string;
}
export interface IKubeApiLinkRef {
    apiPrefix?: string;
    apiVersion: string;
    resource: string;
    name: string;
    namespace?: string;
}
export declare class KubeApi<T extends KubeObject = any> {
    protected options: IKubeApiOptions<T>;
    static matcher: RegExp;
    static parseApi(apiPath?: string): {
        apiBase: string;
        apiPrefix: string;
        apiGroup: string;
        apiVersion: string;
        apiVersionWithGroup: string;
        namespace: string;
        resource: string;
        name: string;
    };
    static createLink(ref: IKubeApiLinkRef): string;
    static watchAll(...apis: KubeApi[]): () => void;
    readonly kind: string;
    readonly apiBase: string;
    readonly apiPrefix: string;
    readonly apiGroup: string;
    readonly apiVersion: string;
    readonly apiVersionWithGroup: string;
    readonly apiResource: string;
    readonly isNamespaced: boolean;
    objectConstructor: IKubeObjectConstructor<T>;
    protected request: KubeJsonApi;
    protected resourceVersions: Map<string, string>;
    constructor(options: IKubeApiOptions<T>);
    setResourceVersion(namespace: string, newVersion: string): void;
    getResourceVersion(namespace?: string): string;
    refreshResourceVersion(params?: {
        namespace: string;
    }): Promise<T[]>;
    getPodSessionUrl({ namespace, pod, container, shellType, }: {
        namespace?: string;
        pod?: string;
        container?: string;
        shellType?: string;
    }): string;
    getUrl({ name, namespace }?: {
        name?: string;
        namespace?: string;
    }, query?: Partial<IKubeApiQueryParams>): string;
    parseResponse(data: KubeJsonApiData | KubeJsonApiData[] | KubeJsonApiDataList, namespace?: string): any;
    list({ namespace }?: {
        namespace?: string;
    }, query?: IKubeApiQueryParams): Promise<T[]>;
    get({ name, namespace }?: {
        name?: string;
        namespace?: string;
    }, query?: IKubeApiQueryParams): Promise<T>;
    create({ name, namespace, labels, }?: {
        name?: string;
        namespace?: string;
        labels?: Map<string, string>;
    }, data?: Partial<T>): Promise<T>;
    update({ name, namespace }?: {
        name?: string;
        namespace?: string;
    }, data?: Partial<T>): Promise<T>;
    delete({ name, namespace }: {
        name?: string;
        namespace?: string;
    }): Promise<KubeJsonApiData>;
    getWatchUrl(namespace?: string, query?: IKubeApiQueryParams): string;
    watch(): () => void;
}
export declare function lookupApiLink(ref: IKubeObjectRef, parentObject: KubeObject): string;
