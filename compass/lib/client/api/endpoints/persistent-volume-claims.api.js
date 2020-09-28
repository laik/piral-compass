var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { KubeObject } from "../kube-object";
import { autobind } from "../../utils";
import { metricsApi } from "./metrics.api";
import { KubeApi } from "../kube-api";
export class PersistentVolumeClaimsApi extends KubeApi {
    getMetrics(pvcName, namespace) {
        const diskUsage = `sum(kubelet_volume_stats_used_bytes{persistentvolumeclaim="${pvcName}"}) by (persistentvolumeclaim, namespace)`;
        const diskCapacity = `sum(kubelet_volume_stats_capacity_bytes{persistentvolumeclaim="${pvcName}"}) by (persistentvolumeclaim, namespace)`;
        return metricsApi.getMetrics({
            diskUsage,
            diskCapacity
        }, {
            namespace
        });
    }
}
let PersistentVolumeClaim = class PersistentVolumeClaim extends KubeObject {
    getPods(allPods) {
        const pods = allPods.filter(pod => pod.getNs() === this.getNs());
        return pods.filter(pod => {
            return pod.getVolumes().filter(volume => volume.persistentVolumeClaim &&
                volume.persistentVolumeClaim.claimName === this.getName()).length > 0;
        });
    }
    getStorage() {
        if (!this.spec.resources || !this.spec.resources.requests)
            return "-";
        return this.spec.resources.requests.storage;
    }
    getMatchLabels() {
        if (!this.spec.selector || !this.spec.selector.matchLabels)
            return [];
        return Object.entries(this.spec.selector.matchLabels)
            .map(([name, val]) => `${name}:${val}`);
    }
    getMatchExpressions() {
        if (!this.spec.selector || !this.spec.selector.matchExpressions)
            return [];
        return this.spec.selector.matchExpressions;
    }
    getStatus() {
        if (this.status)
            return this.status.phase;
        return "-";
    }
};
PersistentVolumeClaim.kind = "PersistentVolumeClaim";
PersistentVolumeClaim = __decorate([
    autobind()
], PersistentVolumeClaim);
export { PersistentVolumeClaim };
export const pvcApi = new PersistentVolumeClaimsApi({
    kind: PersistentVolumeClaim.kind,
    apiBase: "/api/v1/persistentvolumeclaims",
    isNamespaced: true,
    objectConstructor: PersistentVolumeClaim,
});
//# sourceMappingURL=persistent-volume-claims.api.js.map