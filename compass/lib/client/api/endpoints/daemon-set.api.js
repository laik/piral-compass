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
let DaemonSet = class DaemonSet extends WorkloadKubeObject {
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        const initContainers = get(this, "spec.template.spec.initContainers", []);
        return [...containers, ...initContainers].map(container => container.image);
    }
};
DaemonSet.kind = "DaemonSet";
DaemonSet = __decorate([
    autobind()
], DaemonSet);
export { DaemonSet };
export const daemonSetApi = new KubeApi({
    kind: DaemonSet.kind,
    apiBase: "/apis/apps/v1/daemonsets",
    isNamespaced: true,
    objectConstructor: DaemonSet,
});
//# sourceMappingURL=daemon-set.api.js.map