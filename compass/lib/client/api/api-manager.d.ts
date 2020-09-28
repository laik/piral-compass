import React from "react";
import { KubeApi } from "./kube-api";
import { KubeObjectStore } from "../kube-object.store";
import { KubeObjectDetailsProps, KubeObjectListLayoutProps, KubeObjectMenuProps } from "../components/kube-object";
export interface ApiComponents {
    List?: React.ComponentType<KubeObjectListLayoutProps>;
    Menu?: React.ComponentType<KubeObjectMenuProps>;
    Details?: React.ComponentType<KubeObjectDetailsProps>;
}
export declare class ApiManager {
    private apis;
    private stores;
    private views;
    getApi(pathOrCallback: string | ((api: KubeApi) => boolean)): KubeApi<any>;
    registerApi(apiBase: string, api: KubeApi): void;
    protected resolveApi(api: string | KubeApi): KubeApi;
    unregisterApi(api: string | KubeApi): void;
    registerStore(api: KubeApi, store: KubeObjectStore): void;
    getStore(api: string | KubeApi): KubeObjectStore;
    registerViews(api: KubeApi | KubeApi[], views: ApiComponents): void;
    getViews(api: string | KubeApi): ApiComponents;
}
export declare const apiManager: ApiManager;
