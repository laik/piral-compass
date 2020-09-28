var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import get from "lodash/get";
import { autobind } from "../../utils";
import { WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
let ReplicaSet = class ReplicaSet extends WorkloadKubeObject {
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        return [...containers].map(container => container.image);
    }
};
ReplicaSet.kind = "ReplicaSet";
ReplicaSet = __decorate([
    autobind()
], ReplicaSet);
export { ReplicaSet };
export const replicaSetApi = new KubeApi({
    kind: ReplicaSet.kind,
    apiBase: "/apis/apps/v1/replicasets",
    isNamespaced: true,
    objectConstructor: ReplicaSet,
});
//# sourceMappingURL=replica-set.api.js.map