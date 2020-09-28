var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { autobind, noop } from "../../utils";
import { DockTabStore } from "./dock-tab.store";
import { autorun } from "mobx";
import { dockStore, TabKind } from "./dock.store";
import { apiManager } from "../../api/api-manager";
let EditResourceStore = class EditResourceStore extends DockTabStore {
    constructor() {
        super({
            storageName: "edit_resource_store",
            storageSerializer: (_a) => {
                var { draft } = _a, data = __rest(_a, ["draft"]);
                return data;
            },
        });
        this.watchers = new Map();
        autorun(() => {
            Array.from(this.data).forEach(([tabId, { resource }]) => {
                if (this.watchers.get(tabId)) {
                    return;
                }
                this.watchers.set(tabId, autorun(() => {
                    const store = apiManager.getStore(resource);
                    if (store) {
                        const isActiveTab = dockStore.isOpen && dockStore.selectedTabId === tabId;
                        const obj = store.getByPath(resource);
                        // preload resource for editing
                        if (!obj && !store.isLoaded && !store.isLoading && isActiveTab) {
                            store.loadFromPath(resource).catch(noop);
                        }
                        // auto-close tab when resource removed from store
                        else if (!obj && store.isLoaded) {
                            dockStore.closeTab(tabId);
                        }
                    }
                }, {
                    delay: 100 // make sure all stores initialized
                }));
            });
        });
    }
    getTabByResource(object) {
        const [tabId] = Array.from(this.data).find(([tabId, { resource }]) => {
            return object.selfLink === resource;
        }) || [];
        return dockStore.getTabById(tabId);
    }
    reset() {
        super.reset();
        Array.from(this.watchers).forEach(([tabId, dispose]) => {
            this.watchers.delete(tabId);
            dispose();
        });
    }
};
EditResourceStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], EditResourceStore);
export { EditResourceStore };
export const editResourceStore = new EditResourceStore();
export function editResourceTab(object, tabParams = {}) {
    // use existing tab if already opened
    let tab = editResourceStore.getTabByResource(object);
    if (tab) {
        dockStore.open();
        dockStore.selectTab(tab.id);
    }
    // or create new tab
    if (!tab) {
        tab = dockStore.createTab(Object.assign({ title: `${object.kind}: ${object.getName()}`, kind: TabKind.EDIT_RESOURCE }, tabParams), false);
        editResourceStore.setData(tab.id, {
            resource: object.selfLink,
        });
    }
    return tab;
}
export function isEditResourceTab(tab) {
    return tab && tab.kind === TabKind.EDIT_RESOURCE;
}
//# sourceMappingURL=edit-resource.store.js.map