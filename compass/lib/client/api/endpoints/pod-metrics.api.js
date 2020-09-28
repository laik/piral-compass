import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class PodMetrics extends KubeObject {
}
export const podMetricsApi = new KubeApi({
    kind: PodMetrics.kind,
    apiBase: "/apis/metrics.k8s.io/v1beta1/pods",
    isNamespaced: true,
    objectConstructor: PodMetrics,
});
//# sourceMappingURL=pod-metrics.api.js.map