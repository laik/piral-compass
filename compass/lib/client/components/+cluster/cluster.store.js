var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { observable, reaction, when } from "mobx";
import { KubeObjectStore } from "../../kube-object.store";
import { clusterApi } from "../../api/endpoints";
import { autobind, createStorage } from "../../utils";
import { normalizeMetrics } from "../../api/endpoints/metrics.api";
import { nodesStore } from "../+nodes/nodes.store";
import { apiManager } from "../../api/api-manager";
export var MetricType;
(function (MetricType) {
    MetricType["MEMORY"] = "memory";
    MetricType["CPU"] = "cpu";
})(MetricType || (MetricType = {}));
export var MetricNodeRole;
(function (MetricNodeRole) {
    MetricNodeRole["MASTER"] = "master";
    MetricNodeRole["WORKER"] = "worker";
})(MetricNodeRole || (MetricNodeRole = {}));
let ClusterStore = class ClusterStore extends KubeObjectStore {
    constructor() {
        super();
        this.api = clusterApi;
        this.metrics = {};
        this.liveMetrics = {};
        this.metricsLoaded = false;
        this.resetMetrics();
        // sync user setting with local storage
        const storage = createStorage("cluster_metric_switchers", {});
        Object.assign(this, storage.get());
        reaction(() => {
            const { metricType, metricNodeRole } = this;
            return { metricType, metricNodeRole };
        }, settings => storage.set(settings));
        // auto-update metrics
        reaction(() => this.metricNodeRole, () => {
            if (!this.metricsLoaded)
                return;
            this.metrics = {};
            this.liveMetrics = {};
            this.metricsLoaded = false;
            this.getAllMetrics();
        });
        // check which node type to select
        reaction(() => nodesStore.items.length, () => {
            const { masterNodes, workerNodes } = nodesStore;
            if (!masterNodes.length)
                this.metricNodeRole = MetricNodeRole.WORKER;
            if (!workerNodes.length)
                this.metricNodeRole = MetricNodeRole.MASTER;
        });
    }
    loadMetrics(params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield when(() => nodesStore.isLoaded);
            const { masterNodes, workerNodes } = nodesStore;
            const nodes = this.metricNodeRole === MetricNodeRole.MASTER && masterNodes.length ? masterNodes : workerNodes;
            return clusterApi.getMetrics(nodes.map(node => node.getName()), params);
        });
    }
    getAllMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getMetrics();
            yield this.getLiveMetrics();
            this.metricsLoaded = true;
        });
    }
    getMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            this.metrics = yield this.loadMetrics();
        });
    }
    getLiveMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const step = 3;
            const range = 15;
            const end = Date.now() / 1000;
            const start = end - range;
            this.liveMetrics = yield this.loadMetrics({ start, end, step, range });
        });
    }
    getMetricsValues(source) {
        if (!source)
            return [];
        const metrics = this.metricType === MetricType.CPU ? source.cpuUsage :
            this.metricType === MetricType.MEMORY ? source.memoryUsage
                : null;
        if (!metrics) {
            return [];
        }
        return normalizeMetrics(metrics).data.result[0].values;
    }
    resetMetrics() {
        this.metrics = {};
        this.metricsLoaded = false;
        this.metricType = MetricType.CPU;
        this.metricNodeRole = MetricNodeRole.WORKER;
    }
    reset() {
        super.reset();
        this.resetMetrics();
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], ClusterStore.prototype, "metrics", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ClusterStore.prototype, "liveMetrics", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ClusterStore.prototype, "metricsLoaded", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], ClusterStore.prototype, "metricType", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], ClusterStore.prototype, "metricNodeRole", void 0);
ClusterStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], ClusterStore);
export { ClusterStore };
export const clusterStore = new ClusterStore();
apiManager.registerStore(clusterApi, clusterStore);
//# sourceMappingURL=cluster.store.js.map