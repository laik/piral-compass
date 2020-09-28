var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { computed, reaction } from "mobx";
import { KubeObjectStore } from "../../kube-object.store";
import { autobind } from "../../utils";
import { crdApi } from "../../api/endpoints/crd.api";
import { apiManager } from "../../api/api-manager";
import { KubeApi } from "../../api/kube-api";
import { CRDResourceStore } from "./crd-resource.store";
let CRDStore = class CRDStore extends KubeObjectStore {
    constructor() {
        super();
        this.api = crdApi;
        // auto-load crd-s for building sub-menus
        this.loadAll();
        // auto-init stores for crd-s
        reaction(() => this.items.toJS(), items => {
            items.forEach(this.initStore);
        });
    }
    getCrdItems() {
        this.loadAll();
    }
    sortItems(items) {
        return super.sortItems(items, [
            crd => crd.getGroup(),
            crd => crd.getName(),
        ]);
    }
    initStore(crd) {
        const apiBase = crd.getResourceApiBase();
        let api = apiManager.getApi(apiBase);
        if (!api) {
            api = new KubeApi({
                apiBase: apiBase,
                kind: crd.getResourceKind(),
                isNamespaced: crd.isNamespaced(),
            });
        }
        let store = apiManager.getStore(api);
        if (!store) {
            store = new CRDResourceStore(api);
            apiManager.registerStore(api, store);
        }
    }
    get groups() {
        const groups = {};
        return this.items.reduce((groups, crd) => {
            const group = crd.getGroup();
            if (!groups[group])
                groups[group] = [];
            groups[group].push(crd);
            return groups;
        }, groups);
    }
    getByGroup(group, pluralName) {
        const crdInGroup = this.groups[group];
        if (!crdInGroup)
            return null;
        return crdInGroup.find(crd => crd.getPluralName() === pluralName);
    }
    getByObject(obj) {
        if (!obj)
            return null;
        const { kind, apiVersion } = obj;
        return this.items.find(crd => {
            return kind === crd.getResourceKind() && apiVersion === `${crd.getGroup()}/${crd.getVersion()}`;
        });
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CRDStore.prototype, "groups", null);
CRDStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], CRDStore);
export { CRDStore };
export const crdStore = new CRDStore();
apiManager.registerStore(crdApi, crdStore);
//# sourceMappingURL=crd.store.js.map