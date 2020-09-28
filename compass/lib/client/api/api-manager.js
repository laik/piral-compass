var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from "mobx";
import { autobind } from "../utils/autobind";
import { KubeApi } from "./kube-api";
let ApiManager = class ApiManager {
    constructor() {
        this.apis = observable.map();
        this.stores = observable.map();
        this.views = observable.map();
    }
    getApi(pathOrCallback) {
        const apis = this.apis;
        if (typeof pathOrCallback === "string") {
            let api = apis.get(pathOrCallback);
            if (!api) {
                const { apiBase } = KubeApi.parseApi(pathOrCallback);
                api = apis.get(apiBase);
            }
            return api;
        }
        else {
            return Array.from(apis.values()).find(pathOrCallback);
        }
    }
    registerApi(apiBase, api) {
        if (this.apis.has(apiBase))
            return;
        this.apis.set(apiBase, api);
    }
    resolveApi(api) {
        if (typeof api === "string")
            return this.getApi(api);
        return api;
    }
    unregisterApi(api) {
        if (typeof api === "string")
            this.apis.delete(api);
        else {
            const apis = Array.from(this.apis.entries());
            const entry = apis.find(entry => entry[1] === api);
            if (entry)
                this.unregisterApi(entry[0]);
        }
    }
    registerStore(api, store) {
        this.stores.set(api, store);
    }
    getStore(api) {
        return this.stores.get(this.resolveApi(api));
    }
    registerViews(api, views) {
        if (Array.isArray(api)) {
            api.forEach(api => this.registerViews(api, views));
            return;
        }
        const currentViews = this.views.get(api) || {};
        this.views.set(api, Object.assign(Object.assign({}, currentViews), views));
    }
    getViews(api) {
        return this.views.get(this.resolveApi(api)) || {};
    }
};
ApiManager = __decorate([
    autobind()
], ApiManager);
export { ApiManager };
export const apiManager = new ApiManager();
//# sourceMappingURL=api-manager.js.map