import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class ComponentStatus extends KubeObject {
    getTruthyConditions() {
        return this.conditions.filter(c => c.status === "True");
    }
}
ComponentStatus.kind = "ComponentStatus";
export const componentStatusApi = new KubeApi({
    kind: ComponentStatus.kind,
    apiBase: "/api/v1/componentstatuses",
    isNamespaced: false,
    objectConstructor: ComponentStatus,
});
//# sourceMappingURL=component-status.api.js.map