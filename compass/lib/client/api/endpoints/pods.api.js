var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WorkloadKubeObject } from "../workload-kube-object";
import { autobind } from "../../utils";
import { metricsApi } from "./metrics.api";
import { KubeApi } from "../kube-api";
export class PodsApi extends KubeApi {
    getTerminalSession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getPodSessionUrl(params);
            return this.request.get(path);
        });
    }
    getLogs(params, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getUrl(params) + "/log";
            return this.request.get(path, { query });
        });
    }
    getMetrics(pods, namespace, selector = "pod, namespace") {
        const podSelector = pods.map((pod) => pod.getName()).join("|");
        const cpuUsage = `sum(rate(container_cpu_usage_seconds_total{container_name!="POD",container_name!="",pod_name=~"${podSelector}",namespace="${namespace}"}[1m])) by (${selector})`;
        const cpuRequests = `sum(kube_pod_container_resource_requests{pod=~"${podSelector}",resource="cpu",namespace="${namespace}"}) by (${selector})`;
        const cpuLimits = `sum(kube_pod_container_resource_limits{pod=~"${podSelector}",resource="cpu",namespace="${namespace}"}) by (${selector})`;
        const memoryUsage = `sum(container_memory_working_set_bytes{container_name!="POD",container_name!="",pod_name=~"${podSelector}",namespace="${namespace}"}) by (${selector})`;
        const memoryRequests = `sum(kube_pod_container_resource_requests{pod=~"${podSelector}",resource="memory",namespace="${namespace}"}) by (${selector})`;
        const memoryLimits = `sum(kube_pod_container_resource_limits{pod=~"${podSelector}",resource="memory",namespace="${namespace}"}) by (${selector})`;
        const fsUsage = `sum(container_fs_usage_bytes{container_name!="POD",container_name!="",pod_name=~"${podSelector}",namespace="${namespace}"}) by (${selector})`;
        const networkReceive = `sum(rate(container_network_receive_bytes_total{pod_name=~"${podSelector}",namespace="${namespace}"}[1m])) by (${selector})`;
        const networkTransit = `sum(rate(container_network_transmit_bytes_total{pod_name=~"${podSelector}",namespace="${namespace}"}[1m])) by (${selector})`;
        return metricsApi.getMetrics({
            cpuUsage,
            cpuRequests,
            cpuLimits,
            memoryUsage,
            memoryRequests,
            memoryLimits,
            fsUsage,
            networkReceive,
            networkTransit,
        }, {
            namespace,
        });
    }
}
export var PodStatus;
(function (PodStatus) {
    PodStatus["TERMINATED"] = "Terminated";
    PodStatus["FAILED"] = "Failed";
    PodStatus["PENDING"] = "Pending";
    PodStatus["RUNNING"] = "Running";
    PodStatus["SUCCEEDED"] = "Succeeded";
    PodStatus["EVICTED"] = "Evicted";
})(PodStatus || (PodStatus = {}));
let Pod = class Pod extends WorkloadKubeObject {
    getInitContainers() {
        return this.spec.initContainers || [];
    }
    getContainers() {
        return this.spec.containers || [];
    }
    getAllContainers() {
        return this.getContainers().concat(this.getInitContainers());
    }
    getRunningContainers() {
        const statuses = this.getContainerStatuses();
        return this.getAllContainers().filter((container) => {
            return statuses.find((status) => status.name === container.name && !!status.state["running"]);
        });
    }
    getContainerStatuses(includeInitContainers = true) {
        const statuses = [];
        const { containerStatuses, initContainerStatuses } = this.status;
        if (containerStatuses) {
            statuses.push(...containerStatuses);
        }
        if (includeInitContainers && initContainerStatuses) {
            statuses.push(...initContainerStatuses);
        }
        return statuses;
    }
    getRestartsCount() {
        const { containerStatuses } = this.status;
        if (!containerStatuses)
            return 0;
        return containerStatuses.reduce((count, item) => count + item.restartCount, 0);
    }
    getQosClass() {
        return this.status.qosClass || "";
    }
    getReason() {
        return this.status.reason || "";
    }
    getPriorityClassName() {
        return this.spec.priorityClassName || "";
    }
    // Returns one of 5 statuses: Running, Succeeded, Pending, Failed, Evicted
    getStatus() {
        const phase = this.getStatusPhase();
        const reason = this.getReason();
        const goodConditions = ["Initialized", "Ready"].every((condition) => !!this.getConditions().find((item) => item.type === condition && item.status === "True"));
        if (reason === PodStatus.EVICTED) {
            return PodStatus.EVICTED;
        }
        if (phase === PodStatus.FAILED) {
            return PodStatus.FAILED;
        }
        if (phase === PodStatus.SUCCEEDED) {
            return PodStatus.SUCCEEDED;
        }
        if (phase === PodStatus.RUNNING && goodConditions) {
            return PodStatus.RUNNING;
        }
        return PodStatus.PENDING;
    }
    // Returns pod phase or container error if occured
    getStatusMessage(tips) {
        let result = "";
        let tipsMessage = "";
        const statuses = this.getContainerStatuses(false); // not including initContainers
        if (statuses.length) {
            statuses.forEach((status) => {
                const { state, lastState } = status;
                if (state.waiting) {
                    const { reason, message } = state.waiting;
                    result = reason ? reason : "Waiting";
                }
                if (state.terminated) {
                    const { reason } = state.terminated;
                    result = reason ? reason : "Terminated";
                }
                if (lastState.terminated) {
                    const { message } = lastState.terminated;
                    tipsMessage = message;
                }
            });
        }
        if (this.getReason() === PodStatus.EVICTED) {
            result = "Evicted";
        }
        if (!result) {
            result = this.getStatusPhase();
        }
        if (tips) {
            let b = {};
            b.reason = result;
            b.message = tipsMessage;
            return b;
        }
        return result;
    }
    getStatusPhase() {
        return this.status.phase;
    }
    getConditions() {
        return this.status.conditions || [];
    }
    getVolumes() {
        return this.spec.volumes || [];
    }
    getSecrets() {
        return this.getVolumes()
            .filter((vol) => vol.secret)
            .map((vol) => vol.secret.secretName);
    }
    getNodeSelectors() {
        const { nodeSelector } = this.spec;
        if (!nodeSelector)
            return [];
        return Object.entries(nodeSelector).map((values) => values.join(": "));
    }
    getTolerations() {
        return this.spec.tolerations || [];
    }
    getAffinity() {
        return this.spec.affinity;
    }
    hasIssues() {
        const notReady = !!this.getConditions().find((condition) => {
            return condition.type == "Ready" && condition.status !== "True";
        });
        const crashLoop = !!this.getContainerStatuses().find((condition) => {
            const waiting = condition.state.waiting;
            return waiting && waiting.reason == "CrashLoopBackOff";
        });
        return notReady || crashLoop || this.getStatusPhase() !== "Running";
    }
    getLivenessProbe(container) {
        return this.getProbe(container.livenessProbe);
    }
    getReadinessProbe(container) {
        return this.getProbe(container.readinessProbe);
    }
    getProbe(probeData) {
        if (!probeData)
            return [];
        const { httpGet, exec, tcpSocket, initialDelaySeconds, timeoutSeconds, periodSeconds, successThreshold, failureThreshold, } = probeData;
        const probe = [];
        // HTTP Request
        if (httpGet) {
            const { path, port, host, scheme } = httpGet;
            probe.push("http-get", `${scheme.toLowerCase()}://${host || ""}:${port || ""}${path || ""}`);
        }
        // Command
        if (exec && exec.command) {
            probe.push(`exec [${exec.command.join(" ")}]`);
        }
        // TCP Probe
        if (tcpSocket && tcpSocket.port) {
            probe.push(`tcp-socket :${tcpSocket.port}`);
        }
        probe.push(`delay=${initialDelaySeconds || "0"}s`, `timeout=${timeoutSeconds || "0"}s`, `period=${periodSeconds || "0"}s`, `#success=${successThreshold || "0"}`, `#failure=${failureThreshold || "0"}`);
        return probe;
    }
    getNodeName() {
        var _a;
        return (_a = this.spec) === null || _a === void 0 ? void 0 : _a.nodeName;
    }
};
Pod.kind = "Pod";
Pod = __decorate([
    autobind()
], Pod);
export { Pod };
export const podsApi = new PodsApi({
    kind: Pod.kind,
    apiBase: "/api/v1/pods",
    isNamespaced: true,
    objectConstructor: Pod,
});
//# sourceMappingURL=pods.api.js.map