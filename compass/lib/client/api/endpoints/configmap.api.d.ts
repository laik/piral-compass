import { KubeObject } from "../kube-object";
import { KubeJsonApiData } from "../kube-json-api";
import { KubeApi } from "../kube-api";
export declare class ConfigMap extends KubeObject {
    static kind: string;
    constructor(data: KubeJsonApiData);
    data: {
        [param: string]: string;
    };
    getKeys(): string[];
}
export declare const configMapApi: KubeApi<ConfigMap>;
