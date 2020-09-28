var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, observable, reaction } from "mobx";
import { autobind, createStorage } from "../../utils";
import { KubeObjectStore } from "../../kube-object.store";
import { namespacesApi } from "../../api/endpoints";
import { navigation, setQueryParams } from "../../navigation";
import { apiManager } from "../../api/api-manager";
let NamespaceStore = class NamespaceStore extends KubeObjectStore {
    constructor() {
        super();
        this.api = namespacesApi;
        this.contextNs = observable.array();
        this.storage = createStorage("context_ns", this.contextNs);
        // restore context namespaces
        const { initNamespaces: namespaces } = this;
        this.setContext(namespaces);
        this.updateUrl(namespaces);
        // sync with local-storage & url-search-params
        reaction(() => this.contextNs.toJS(), namespaces => {
            this.storage.set(namespaces);
            this.updateUrl(namespaces);
        });
    }
    get initNamespaces() {
        const fromUrl = navigation.searchParams.getAsArray("namespaces");
        return fromUrl.length ? fromUrl : this.storage.get();
    }
    getContextParams() {
        return {
            namespaces: this.contextNs
        };
    }
    updateUrl(namespaces) {
        setQueryParams({ namespaces }, { replace: true });
    }
    loadItems(namespaces) {
        if (namespaces) {
            return Promise.all(namespaces.map(name => this.api.get({ name })));
        }
        else {
            return super.loadItems();
        }
    }
    setContext(namespaces) {
        this.contextNs.replace(namespaces);
    }
    hasContext(namespace) {
        const context = Array.isArray(namespace) ? namespace : [namespace];
        return context.every(namespace => this.contextNs.includes(namespace));
    }
    toggleContext(namespace) {
        if (this.hasContext(namespace))
            this.contextNs.remove(namespace);
        else
            this.contextNs.push(namespace);
    }
    getAllOpsNamespace() {
        return this.items.map(item => { if (item.getName().indexOf("-ops") > 0) {
            return item.getName();
        } }).slice();
    }
    reset() {
        super.reset();
        this.contextNs.clear();
    }
};
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NamespaceStore.prototype, "reset", null);
NamespaceStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], NamespaceStore);
export { NamespaceStore };
export const namespaceStore = new NamespaceStore();
apiManager.registerStore(namespacesApi, namespaceStore);
//# sourceMappingURL=namespace.store.js.map