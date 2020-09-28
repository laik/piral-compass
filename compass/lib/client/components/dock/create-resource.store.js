var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autobind } from "../../utils";
import { DockTabStore } from "./dock-tab.store";
import { dockStore, TabKind } from "./dock.store";
let CreateResourceStore = class CreateResourceStore extends DockTabStore {
    constructor() {
        super({
            storageName: "create_resource"
        });
    }
};
CreateResourceStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], CreateResourceStore);
export { CreateResourceStore };
export const createResourceStore = new CreateResourceStore();
export function createResourceTab(tabParams = {}) {
    return dockStore.createTab(Object.assign({ kind: TabKind.CREATE_RESOURCE, title: "Create resource" }, tabParams));
}
export function isCreateResourceTab(tab) {
    return tab && tab.kind === TabKind.CREATE_RESOURCE;
}
//# sourceMappingURL=create-resource.store.js.map