import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class Role extends KubeObject {
    getRules() {
        return this.rules || [];
    }
}
Role.kind = "Role";
export const roleApi = new KubeApi({
    kind: Role.kind,
    apiBase: "/apis/rbac.authorization.k8s.io/v1/roles",
    isNamespaced: true,
    objectConstructor: Role,
});
//# sourceMappingURL=role.api.js.map