var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
let RoleBinding = class RoleBinding extends KubeObject {
    getSubjects() {
        return this.subjects || [];
    }
    getSubjectNames() {
        return this.getSubjects().map(subject => subject.name).join(", ");
    }
};
RoleBinding.kind = "RoleBinding";
RoleBinding = __decorate([
    autobind()
], RoleBinding);
export { RoleBinding };
export const roleBindingApi = new KubeApi({
    kind: RoleBinding.kind,
    apiBase: "/apis/rbac.authorization.k8s.io/v1/rolebindings",
    isNamespaced: true,
    objectConstructor: RoleBinding,
});
//# sourceMappingURL=role-binding.api.js.map