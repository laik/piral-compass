import { KubeObject } from "./api/kube-object";
import { IKubeWatchEvent } from "./api/kube-watch-api";
import { ItemStore } from "./item.store";
import { KubeApi } from "./api/kube-api";
import { KubeJsonApiData } from "./api/kube-json-api";
export declare abstract class KubeObjectStore<T extends KubeObject = any> extends ItemStore<T> {
    abstract api: KubeApi<T>;
    limit: number;
    constructor();
    getAllByNs(namespace: string | string[], strict?: boolean): T[];
    getByName(name: string, namespace?: string): T;
    getByPath(path: string): T;
    getByLabel(labels: string[] | {
        [label: string]: string;
    }): T[];
    protected loadItems(namespaces?: string[]): Promise<T[]>;
    protected filterItemsOnLoad(items: T[]): T[];
    loadAll(): Promise<void>;
    protected loadItem(params: {
        name: string;
        namespace?: string;
    }): Promise<T>;
    load(params: {
        name: string;
        namespace?: string;
    }): Promise<T>;
    loadFromPath(resourcePath: string): Promise<T>;
    protected createItem(params: {
        name: string;
        namespace?: string;
        labels?: Map<string, string>;
    }, data?: Partial<T>): Promise<T>;
    create(params: {
        name: string;
        namespace?: string;
        labels?: Map<string, string>;
    }, data?: Partial<T>): Promise<T>;
    apply(item: T, data?: Partial<T>): Promise<T>;
    update(item: T, data: Partial<T>): Promise<T>;
    remove(item: T): Promise<void>;
    removeSelectedItems(): Promise<void[]>;
    protected eventsBuffer: import("mobx").IObservableArray<IKubeWatchEvent<KubeJsonApiData>>;
    protected bindWatchEventsUpdater(delay?: number): import("mobx").IReactionDisposer;
    subscribe(apis?: KubeApi<T>[]): () => void;
    protected onWatchApiEvent(evt: IKubeWatchEvent): void;
    protected updateFromEventsBuffer(): void;
}
