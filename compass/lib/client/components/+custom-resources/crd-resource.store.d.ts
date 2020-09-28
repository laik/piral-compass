import { KubeApi } from "../../api/kube-api";
import { KubeObjectStore } from "../../kube-object.store";
import { KubeObject } from "../../api/kube-object";
export declare class CRDResourceStore<T extends KubeObject = any> extends KubeObjectStore<T> {
    api: KubeApi;
    constructor(api: KubeApi<T>);
}
