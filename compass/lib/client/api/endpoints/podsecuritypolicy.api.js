var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
let PodSecurityPolicy = class PodSecurityPolicy extends KubeObject {
    isPrivileged() {
        return !!this.spec.privileged;
    }
    getVolumes() {
        return this.spec.volumes || [];
    }
    getRules() {
        const { fsGroup, runAsGroup, runAsUser, supplementalGroups, seLinux } = this.spec;
        return {
            fsGroup: fsGroup ? fsGroup.rule : "",
            runAsGroup: runAsGroup ? runAsGroup.rule : "",
            runAsUser: runAsUser ? runAsUser.rule : "",
            supplementalGroups: supplementalGroups ? supplementalGroups.rule : "",
            seLinux: seLinux ? seLinux.rule : "",
        };
    }
};
PodSecurityPolicy.kind = "PodSecurityPolicy";
PodSecurityPolicy = __decorate([
    autobind()
], PodSecurityPolicy);
export { PodSecurityPolicy };
export const pspApi = new KubeApi({
    kind: PodSecurityPolicy.kind,
    apiBase: "/apis/policy/v1beta1/podsecuritypolicies",
    isNamespaced: false,
    objectConstructor: PodSecurityPolicy,
});
//# sourceMappingURL=podsecuritypolicy.api.js.map