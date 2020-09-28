import { LocationDescriptor } from "history";
export declare const browserHistory: import("history").History<{}>;
export declare const navigation: import("mobx-observable-history").IObservableHistory<{}>;
export declare function navigate(location: LocationDescriptor): void;
export interface IURLParams<P = {}, Q = {}> {
    params?: P;
    query?: IQueryParams & Q;
}
export declare function buildURL<P extends object, Q = object>(path: string | string[]): ({ params, query }?: IURLParams<P, Q>) => string;
export interface IQueryParams {
    namespaces?: string[];
    details?: string;
    selected?: string;
    search?: string;
    sortBy?: string;
    orderBy?: string;
}
export declare function getQueryString(params?: Partial<IQueryParams>, merge?: boolean): string;
export declare function setQueryParams<T>(params?: T & IQueryParams, { merge, replace }?: {
    merge?: boolean;
    replace?: boolean;
}): void;
export declare function getDetails(): string;
export declare function getSelectedDetails(): string;
export declare function getDetailsUrl(details: string): string;
export declare function showDetails(path: string, resetSelected?: boolean): void;
export declare function hideDetails(): void;
export declare function setSearch(text: string): void;
export declare function getSearch(): string;
