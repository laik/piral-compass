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
import { action, computed, observable } from "mobx";
import { clusterApi, nodesApi } from "../../api/endpoints";
import { autobind } from "../../utils";
import { KubeObjectStore } from "../../kube-object.store";
import { apiManager } from "../../api/api-manager";
let NodesStore = class NodesStore extends KubeObjectStore {
    constructor() {
        super(...arguments);
        this.api = nodesApi;
        this.metrics = {};
        this.nodeMetrics = null;
        this.metricsLoading = false;
        this.metricsLoaded = false;
    }
    loadUsageMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            this.metricsLoading = true;
            try {
                this.metrics = yield nodesApi.getMetrics();
                this.metricsLoaded = true;
            }
            finally {
                this.metricsLoading = false;
            }
        });
    }
    loadMetrics(nodeName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.nodeMetrics = yield clusterApi.getMetrics([nodeName]);
        });
    }
    get masterNodes() {
        return this.items.filter(node => node.getRoleLabels().includes("master"));
    }
    get workerNodes() {
        return this.items.filter(node => !node.getRoleLabels().includes("master"));
    }
    getLastMetricValues(node, metricNames) {
        if (!this.metricsLoaded) {
            return;
        }
        const nodeName = node.getName();
        return metricNames.map(metricName => {
            try {
                const metric = this.metrics[metricName];
                const result = metric.data.result.find(result => {
                    return [
                        result.metric.node,
                        result.metric.instance,
                        result.metric.kubernetes_node,
                    ].includes(nodeName);
                });
                return result ? parseFloat(result.values.slice(-1)[0][1]) : 0;
            }
            catch (e) {
                return 0;
            }
        });
    }
    reset() {
        super.reset();
        this.metrics = {};
        this.nodeMetrics = null;
        this.metricsLoading = false;
        this.metricsLoaded = false;
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], NodesStore.prototype, "metrics", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], NodesStore.prototype, "nodeMetrics", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], NodesStore.prototype, "metricsLoading", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], NodesStore.prototype, "metricsLoaded", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NodesStore.prototype, "loadUsageMetrics", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NodesStore.prototype, "loadMetrics", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NodesStore.prototype, "masterNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NodesStore.prototype, "workerNodes", null);
NodesStore = __decorate([
    autobind()
], NodesStore);
export { NodesStore };
export const nodesStore = new NodesStore();
apiManager.registerStore(nodesApi, nodesStore);
//# sourceMappingURL=nodes.store.js.map