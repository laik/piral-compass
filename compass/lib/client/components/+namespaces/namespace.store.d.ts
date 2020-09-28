import { KubeObjectStore } from "../../kube-object.store";
import { Namespace } from "../../api/endpoints";
import { IQueryParams } from "../../navigation";
export declare class NamespaceStore extends KubeObjectStore<Namespace> {
    api: import("../../api/kube-api").KubeApi<Namespace>;
    contextNs: import("mobx").IObservableArray<string>;
    protected storage: import("../../utils").StorageHelper<string[]>;
    get initNamespaces(): string[];
    constructor();
    getContextParams(): Partial<IQueryParams>;
    protected updateUrl(namespaces: string[]): void;
    protected loadItems(namespaces?: string[]): Promise<Namespace[]>;
    setContext(namespaces: string[]): void;
    hasContext(namespace: string | string[]): boolean;
    toggleContext(namespace: string): void;
    getAllOpsNamespace(): string[];
    reset(): void;
}
export declare const namespaceStore: NamespaceStore;
