var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { KubeObject } from "../kube-object";
import { autobind, cpuUnitsToNumber, unitsToBytes } from "../../utils";
import { metricsApi } from "./metrics.api";
import { KubeApi } from "../kube-api";
export class NodesApi extends KubeApi {
    getMetrics() {
        const memoryUsage = `sum(node_memory_MemTotal_bytes - (node_memory_MemFree_bytes + node_memory_Buffers_bytes + node_memory_Cached_bytes)) by (kubernetes_node)`;
        const memoryCapacity = `sum(kube_node_status_capacity{resource="memory"}) by (node)`;
        const cpuUsage = `sum(rate(node_cpu_seconds_total{mode=~"user|system"}[1m])) by(kubernetes_node)`;
        const cpuCapacity = `sum(kube_node_status_allocatable{resource="cpu"}) by (node)`;
        const fsSize = `sum(node_filesystem_size_bytes{mountpoint="/"}) by (kubernetes_node)`;
        const fsUsage = `sum(node_filesystem_size_bytes{mountpoint="/"} - node_filesystem_avail_bytes{mountpoint="/"}) by (kubernetes_node)`;
        return metricsApi.getMetrics({
            memoryUsage,
            memoryCapacity,
            cpuUsage,
            cpuCapacity,
            fsSize,
            fsUsage
        });
    }
}
let Node = class Node extends KubeObject {
    getNodeConditionText() {
        const { conditions } = this.status;
        if (!conditions)
            return "";
        return conditions.reduce((types, current) => {
            if (current.status !== "True")
                return "";
            return types += ` ${current.type}`;
        }, "");
    }
    getTaints() {
        return this.spec.taints || [];
    }
    getRoleLabels() {
        const roleLabels = Object.keys(this.metadata.labels).filter(key => key.includes("node-role.kubernetes.io")).map(key => key.match(/([^/]+$)/)[0]); // all after last slash
        if (this.metadata.labels["kubernetes.io/role"] != undefined) {
            roleLabels.push(this.metadata.labels["kubernetes.io/role"]);
        }
        return roleLabels.join(", ");
    }
    getCpuCapacity() {
        if (!this.status.capacity || !this.status.capacity.cpu)
            return 0;
        return cpuUnitsToNumber(this.status.capacity.cpu);
    }
    getMemoryCapacity() {
        if (!this.status.capacity || !this.status.capacity.memory)
            return 0;
        return unitsToBytes(this.status.capacity.memory);
    }
    getConditions() {
        const conditions = this.status.conditions || [];
        if (this.isUnschedulable()) {
            return [{ type: "SchedulingDisabled", status: "True" }, ...conditions];
        }
        return conditions;
    }
    getActiveConditions() {
        return this.getConditions().filter(c => c.status === "True");
    }
    getWarningConditions() {
        const goodConditions = ["Ready", "HostUpgrades", "SchedulingDisabled"];
        return this.getActiveConditions().filter(condition => {
            return !goodConditions.includes(condition.type);
        });
    }
    getKubeletVersion() {
        return this.status.nodeInfo.kubeletVersion;
    }
    getOperatingSystem() {
        const label = this.getLabels().find(label => label.startsWith("kubernetes.io/os="));
        if (label) {
            return label.split("=", 2)[1];
        }
        return "linux";
    }
    isUnschedulable() {
        return this.spec.unschedulable;
    }
};
Node.kind = "Node";
Node = __decorate([
    autobind()
], Node);
export { Node };
export const nodesApi = new NodesApi({
    kind: Node.kind,
    apiBase: "/api/v1/nodes",
    isNamespaced: false,
    objectConstructor: Node,
});
//# sourceMappingURL=nodes.api.js.map