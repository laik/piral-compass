var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { metricsApi } from "./metrics.api";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class ClusterApi extends KubeApi {
    getMetrics(nodeNames, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = nodeNames.join("|");
            const memoryUsage = `
        sum(
          node_memory_MemTotal_bytes - (node_memory_MemFree_bytes + node_memory_Buffers_bytes + node_memory_Cached_bytes)
        ) by (kubernetes_name)
      `.replace(/_bytes/g, `_bytes{kubernetes_node=~"${nodes}"}`);
            const memoryRequests = `sum(kube_pod_container_resource_requests{node=~"${nodes}", resource="memory"}) by (component)`;
            const memoryLimits = `sum(kube_pod_container_resource_limits{node=~"${nodes}", resource="memory"}) by (component)`;
            const memoryCapacity = `sum(kube_node_status_capacity{node=~"${nodes}", resource="memory"}) by (component)`;
            const cpuUsage = `sum(rate(node_cpu_seconds_total{kubernetes_node=~"${nodes}", mode=~"user|system"}[1m]))`;
            const cpuRequests = `sum(kube_pod_container_resource_requests{node=~"${nodes}", resource="cpu"}) by (component)`;
            const cpuLimits = `sum(kube_pod_container_resource_limits{node=~"${nodes}", resource="cpu"}) by (component)`;
            const cpuCapacity = `sum(kube_node_status_capacity{node=~"${nodes}", resource="cpu"}) by (component)`;
            const podUsage = `sum(kubelet_running_pod_count{instance=~"${nodes}"})`;
            const podCapacity = `sum(kube_node_status_capacity{node=~"${nodes}", resource="pods"}) by (component)`;
            const fsSize = `sum(node_filesystem_size_bytes{kubernetes_node=~"${nodes}", mountpoint="/"}) by (kubernetes_node)`;
            const fsUsage = `sum(node_filesystem_size_bytes{kubernetes_node=~"${nodes}", mountpoint="/"} - node_filesystem_avail_bytes{kubernetes_node=~"${nodes}", mountpoint="/"}) by (kubernetes_node)`;
            return metricsApi.getMetrics({
                memoryUsage,
                memoryRequests,
                memoryLimits,
                memoryCapacity,
                cpuUsage,
                cpuRequests,
                cpuLimits,
                cpuCapacity,
                podUsage,
                podCapacity,
                fsSize,
                fsUsage
            }, params);
        });
    }
}
export var ClusterStatus;
(function (ClusterStatus) {
    ClusterStatus["ACTIVE"] = "Active";
    ClusterStatus["CREATING"] = "Creating";
    ClusterStatus["REMOVING"] = "Removing";
    ClusterStatus["ERROR"] = "Error";
})(ClusterStatus || (ClusterStatus = {}));
export class Cluster extends KubeObject {
    getStatus() {
        if (this.metadata.deletionTimestamp)
            return ClusterStatus.REMOVING;
        if (!this.status || !this.status)
            return ClusterStatus.CREATING;
        if (this.status.errorMessage)
            return ClusterStatus.ERROR;
        return ClusterStatus.ACTIVE;
    }
}
Cluster.kind = "Cluster";
export const clusterApi = new ClusterApi({
    kind: Cluster.kind,
    apiBase: "/apis/cluster.k8s.io/v1alpha1/clusters",
    isNamespaced: true,
    objectConstructor: Cluster,
});
//# sourceMappingURL=cluster.api.js.map