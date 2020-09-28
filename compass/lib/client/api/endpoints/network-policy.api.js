var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { KubeObject } from "../kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let NetworkPolicy = class NetworkPolicy extends KubeObject {
    getMatchLabels() {
        if (!this.spec.podSelector || !this.spec.podSelector.matchLabels)
            return [];
        return Object
            .entries(this.spec.podSelector.matchLabels)
            .map(data => data.join(":"));
    }
    getTypes() {
        if (!this.spec.policyTypes)
            return [];
        return this.spec.policyTypes;
    }
};
NetworkPolicy.kind = "NetworkPolicy";
NetworkPolicy = __decorate([
    autobind()
], NetworkPolicy);
export { NetworkPolicy };
export const networkPolicyApi = new KubeApi({
    kind: NetworkPolicy.kind,
    apiBase: "/apis/networking.k8s.io/v1/networkpolicies",
    isNamespaced: true,
    objectConstructor: NetworkPolicy,
});
//# sourceMappingURL=network-policy.api.js.map