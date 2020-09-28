var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { Role } from "./role.api";
import { KubeApi } from "../kube-api";
let ClusterRole = class ClusterRole extends Role {
};
ClusterRole.kind = "ClusterRole";
ClusterRole = __decorate([
    autobind()
], ClusterRole);
export { ClusterRole };
export const clusterRoleApi = new KubeApi({
    kind: ClusterRole.kind,
    apiBase: "/apis/rbac.authorization.k8s.io/v1/clusterroles",
    isNamespaced: false,
    objectConstructor: ClusterRole,
});
//# sourceMappingURL=cluster-role.api.js.map