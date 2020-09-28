import { KubeObjectStore } from "../../kube-object.store";
import { CustomResourceDefinition } from "../../api/endpoints/crd.api";
import { KubeApi } from "../../api/kube-api";
import { KubeObject } from "../../api/kube-object";
export declare class CRDStore extends KubeObjectStore<CustomResourceDefinition> {
    api: KubeApi<CustomResourceDefinition>;
    constructor();
    getCrdItems(): void;
    protected sortItems(items: CustomResourceDefinition[]): CustomResourceDefinition[];
    protected initStore(crd: CustomResourceDefinition): void;
    get groups(): Record<string, CustomResourceDefinition[]>;
    getByGroup(group: string, pluralName: string): CustomResourceDefinition;
    getByObject(obj: KubeObject): CustomResourceDefinition;
}
export declare const crdStore: CRDStore;
