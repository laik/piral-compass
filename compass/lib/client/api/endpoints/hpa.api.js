import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export var HpaMetricType;
(function (HpaMetricType) {
    HpaMetricType["Resource"] = "Resource";
    HpaMetricType["Pods"] = "Pods";
    HpaMetricType["Object"] = "Object";
    HpaMetricType["External"] = "External";
})(HpaMetricType || (HpaMetricType = {}));
export class HorizontalPodAutoscaler extends KubeObject {
    getMaxPods() {
        return this.spec.maxReplicas || 0;
    }
    getMinPods() {
        return this.spec.minReplicas || 0;
    }
    getReplicas() {
        return this.status.currentReplicas;
    }
    getConditions() {
        if (!this.status.conditions)
            return [];
        return this.status.conditions.map(condition => {
            const { message, reason, lastTransitionTime, status } = condition;
            return Object.assign(Object.assign({}, condition), { isReady: status === "True", tooltip: `${message || reason} (${lastTransitionTime})` });
        });
    }
    getMetrics() {
        return this.spec.metrics || [];
    }
    getCurrentMetrics() {
        return this.status.currentMetrics || [];
    }
    getMetricName(metric) {
        const { type, resource, pods, object, external } = metric;
        switch (type) {
            case HpaMetricType.Resource:
                return resource.name;
            case HpaMetricType.Pods:
                return pods.metricName;
            case HpaMetricType.Object:
                return object.metricName;
            case HpaMetricType.External:
                return external.metricName;
        }
    }
    // todo: refactor
    getMetricValues(metric) {
        const metricType = metric.type.toLowerCase();
        const currentMetric = this.getCurrentMetrics().find(current => metric.type == current.type && this.getMetricName(metric) == this.getMetricName(current));
        const current = currentMetric ? currentMetric[metricType] : null;
        const target = metric[metricType];
        let currentValue = "unknown";
        let targetValue = "unknown";
        if (current) {
            currentValue = current.currentAverageUtilization || current.currentAverageValue || current.currentValue;
            if (current.currentAverageUtilization)
                currentValue += "%";
        }
        if (target) {
            targetValue = target.targetAverageUtilization || target.targetAverageValue || target.targetValue;
            if (target.targetAverageUtilization)
                targetValue += "%";
        }
        return `${currentValue} / ${targetValue}`;
    }
}
HorizontalPodAutoscaler.kind = "HorizontalPodAutoscaler";
export const hpaApi = new KubeApi({
    kind: HorizontalPodAutoscaler.kind,
    apiBase: "/apis/autoscaling/v2beta1/horizontalpodautoscalers",
    isNamespaced: true,
    objectConstructor: HorizontalPodAutoscaler,
});
//# sourceMappingURL=hpa.api.js.map