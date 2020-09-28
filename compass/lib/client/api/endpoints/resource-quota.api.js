import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class ResourceQuota extends KubeObject {
    constructor(data) {
        super(data);
        this.spec = this.spec || {};
    }
    getScopeSelector() {
        const { matchExpressions = [] } = this.spec.scopeSelector || {};
        return matchExpressions;
    }
}
ResourceQuota.kind = "ResourceQuota";
export const resourceQuotaApi = new KubeApi({
    kind: ResourceQuota.kind,
    apiBase: "/api/v1/resourcequotas",
    isNamespaced: true,
    objectConstructor: ResourceQuota,
});
//# sourceMappingURL=resource-quota.api.js.map