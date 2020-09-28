export declare enum FilterType {
    SEARCH = "search",
    NAMESPACE = "namespace"
}
export interface Filter {
    type: FilterType;
    value: string;
}
export declare class PageFiltersStore {
    protected filters: import("mobx").IObservableArray<Filter>;
    protected isDisabled: import("mobx").ObservableMap<FilterType, boolean>;
    get activeFilters(): Filter[];
    constructor();
    protected syncWithContextNamespace(): () => void;
    protected syncWithGlobalSearch(): () => void;
    addFilter(filter: Filter, begin?: boolean): void;
    removeFilter(filter: Filter): void;
    getByType(type: FilterType, value?: any): Filter;
    getValues(type: FilterType): string[];
    isEnabled(type: FilterType): boolean;
    disable(type: FilterType | FilterType[]): () => () => any;
    enable(type: FilterType | FilterType[]): () => () => any;
    reset(): void;
}
export declare const pageFilters: PageFiltersStore;
