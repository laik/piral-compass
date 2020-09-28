var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import get from "lodash/get";
import { WorkloadKubeObject } from "../workload-kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let Injector = class Injector extends WorkloadKubeObject {
    getPreContainer() {
        const containers = get(this, "spec.preContainers", []);
        return [...containers].map(container => container.image);
    }
    getPostContainer() {
        const containers = get(this, "spec.postContainers", []);
        return [...containers].map(container => container.image);
    }
};
Injector.kind = "Injector";
Injector = __decorate([
    autobind()
], Injector);
export { Injector };
export const injectorApi = new KubeApi({
    kind: Injector.kind,
    apiBase: "/apis/nuwa.nip.io/v1/injectors",
    isNamespaced: true,
    objectConstructor: Injector,
});
//# sourceMappingURL=injector.api.js.map