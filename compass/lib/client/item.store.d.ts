export interface ItemObject {
    getId(): string;
    getName(): string;
    getCreationTime?(): string;
}
export declare abstract class ItemStore<T extends ItemObject = ItemObject> {
    abstract loadAll(): Promise<void>;
    protected defaultSorting: (item: T) => string;
    isLoading: boolean;
    isLoaded: boolean;
    items: import("mobx").IObservableArray<T>;
    selectedItemsIds: import("mobx").ObservableMap<string, boolean>;
    get selectedItems(): T[];
    getByName(name: string, ...args: any[]): T;
    protected sortItems(items?: T[], sorting?: ((item: T) => any)[], order?: "asc" | "desc"): T[];
    protected createItem(...args: any[]): Promise<any>;
    protected loadItems(...args: any[]): Promise<any>;
    protected loadItem(...args: any[]): Promise<T>;
    protected updateItem(item: T, request: () => Promise<T>): Promise<T>;
    protected removeItem(item: T, request: () => Promise<any>): Promise<void>;
    isSelected(item: T): boolean;
    select(item: T): void;
    unselect(item: T): void;
    toggleSelection(item: T): void;
    toggleSelectionAll(visibleItems?: T[]): void;
    isSelectedAll(visibleItems?: T[]): boolean;
    resetSelection(): void;
    reset(): void;
    removeSelectedItems?(): Promise<any>;
    subscribe(...args: any[]): () => void;
    [Symbol.iterator](): Generator<T, void, undefined>;
}
