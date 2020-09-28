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
let StatefulSet = class StatefulSet extends WorkloadKubeObject {
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        return [...containers].map(container => container.image);
    }
};
StatefulSet.kind = "StatefulSet";
StatefulSet = __decorate([
    autobind()
], StatefulSet);
export { StatefulSet };
export const statefulSetApi = new KubeApi({
    kind: StatefulSet.kind,
    apiBase: "/apis/apps/v1/statefulsets",
    isNamespaced: true,
    objectConstructor: StatefulSet,
});
//# sourceMappingURL=stateful-set.api.js.map