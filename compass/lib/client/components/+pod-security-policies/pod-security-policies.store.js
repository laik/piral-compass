var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { pspApi } from "../../api/endpoints";
import { autobind } from "../../utils";
import { KubeObjectStore } from "../../kube-object.store";
import { apiManager } from "../../api/api-manager";
let PodSecurityPoliciesStore = class PodSecurityPoliciesStore extends KubeObjectStore {
    constructor() {
        super(...arguments);
        this.api = pspApi;
    }
};
PodSecurityPoliciesStore = __decorate([
    autobind()
], PodSecurityPoliciesStore);
export { PodSecurityPoliciesStore };
export const podSecurityPoliciesStore = new PodSecurityPoliciesStore();
apiManager.registerStore(pspApi, podSecurityPoliciesStore);
//# sourceMappingURL=pod-security-policies.store.js.map