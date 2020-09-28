import { TabId } from "./dock.store";
interface Options<T = any> {
    storageName?: string;
    storageSerializer?: (data: T) => Partial<T>;
}
export declare class DockTabStore<T = any> {
    protected options: Options<T>;
    protected data: import("mobx").ObservableMap<string, T>;
    constructor(options?: Options<T>);
    protected serializeData(): (string | Partial<T>)[][];
    getData(tabId: TabId): T;
    setData(tabId: TabId, data: T): void;
    clearData(tabId: TabId): void;
    reset(): void;
}
export {};
