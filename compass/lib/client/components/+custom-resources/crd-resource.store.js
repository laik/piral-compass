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
import { KubeApi } from "../../api/kube-api";
import { KubeObjectStore } from "../../kube-object.store";
let CRDResourceStore = class CRDResourceStore extends KubeObjectStore {
    constructor(api) {
        super();
        this.api = api;
    }
};
CRDResourceStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [KubeApi])
], CRDResourceStore);
export { CRDResourceStore };
//# sourceMappingURL=crd-resource.store.js.map