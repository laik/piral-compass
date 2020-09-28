var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autorun, observable, reaction } from "mobx";
import { autobind, createStorage } from "../../utils";
import { dockStore } from "./dock.store";
let DockTabStore = class DockTabStore {
    constructor(options = {}) {
        this.options = options;
        this.data = observable.map([]);
        const { storageName } = options;
        // auto-save to local-storage
        if (storageName) {
            const storage = createStorage(storageName, []);
            this.data.replace(storage.get());
            reaction(() => this.serializeData(), (data) => storage.set(data));
        }
        // clear data for closed tabs
        autorun(() => {
            const currentTabs = dockStore.tabs.map(tab => tab.id);
            Array.from(this.data.keys()).forEach(tabId => {
                if (!currentTabs.includes(tabId)) {
                    this.clearData(tabId);
                }
            });
        });
    }
    serializeData() {
        const { storageSerializer } = this.options;
        return Array.from(this.data).map(([tabId, tabData]) => {
            if (storageSerializer)
                return [tabId, storageSerializer(tabData)];
            return [tabId, tabData];
        });
    }
    getData(tabId) {
        return this.data.get(tabId);
    }
    setData(tabId, data) {
        this.data.set(tabId, data);
    }
    clearData(tabId) {
        this.data.delete(tabId);
    }
    reset() {
        this.data.clear();
    }
};
DockTabStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [Object])
], DockTabStore);
export { DockTabStore };
//# sourceMappingURL=dock-tab.store.js.map