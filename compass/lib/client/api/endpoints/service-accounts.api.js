var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
let ServiceAccount = class ServiceAccount extends KubeObject {
    getSecrets() {
        return this.secrets || [];
    }
    getImagePullSecrets() {
        return this.imagePullSecrets || [];
    }
};
ServiceAccount.kind = "ServiceAccount";
ServiceAccount = __decorate([
    autobind()
], ServiceAccount);
export { ServiceAccount };
export const serviceAccountsApi = new KubeApi({
    kind: ServiceAccount.kind,
    apiBase: "/api/v1/serviceaccounts",
    isNamespaced: true,
    objectConstructor: ServiceAccount,
});
//# sourceMappingURL=service-accounts.api.js.map