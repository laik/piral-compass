var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { KubeObject } from "../kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let ConfigMap = class ConfigMap extends KubeObject {
    constructor(data) {
        super(data);
        this.data = this.data || {};
    }
    getKeys() {
        return Object.keys(this.data);
    }
};
ConfigMap.kind = "ConfigMap";
ConfigMap = __decorate([
    autobind(),
    __metadata("design:paramtypes", [Object])
], ConfigMap);
export { ConfigMap };
export const configMapApi = new KubeApi({
    kind: ConfigMap.kind,
    apiBase: "/api/v1/configmaps",
    isNamespaced: true,
    objectConstructor: ConfigMap,
});
//# sourceMappingURL=configmap.api.js.map