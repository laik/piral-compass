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
let EnhanceStatefulSet = class EnhanceStatefulSet extends WorkloadKubeObject {
    getStatus() {
        return get(this, "spec.status.replicas");
    }
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        return [...containers].map(container => container.image);
    }
    getReplicaUpdate() {
        return get(this, "spec.status.updateRevision");
    }
};
EnhanceStatefulSet.kind = "StatefulSet";
EnhanceStatefulSet = __decorate([
    autobind()
], EnhanceStatefulSet);
export { EnhanceStatefulSet };
export const enhanceStatefulSetApi = new KubeApi({
    kind: EnhanceStatefulSet.kind,
    apiBase: "/apis/nuwa.nip.io/v1/statefulsets",
    isNamespaced: true,
    objectConstructor: EnhanceStatefulSet,
});
//# sourceMappingURL=enhance-stateful-set.api.js.map