var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { KubeObject } from "../kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
export var SecretType;
(function (SecretType) {
    SecretType["Opaque"] = "Opaque";
    SecretType["ServiceAccountToken"] = "kubernetes.io/service-account-token";
    SecretType["Dockercfg"] = "kubernetes.io/dockercfg";
    SecretType["DockerConfigJson"] = "kubernetes.io/dockerconfigjson";
    SecretType["BasicAuth"] = "kubernetes.io/basic-auth";
    SecretType["SSHAuth"] = "kubernetes.io/ssh-auth";
    SecretType["TLS"] = "kubernetes.io/tls";
    SecretType["BootstrapToken"] = "bootstrap.kubernetes.io/token";
    SecretType["CephProvisioner"] = "kubernetes.io/rbd";
})(SecretType || (SecretType = {}));
let Secret = class Secret extends KubeObject {
    constructor(data) {
        super(data);
        this.data = this.data || {};
    }
    getKeys() {
        return Object.keys(this.data);
    }
    getToken() {
        return this.data.token;
    }
    getHide() {
        return this.getLabels().map(label => { if (label.split("=")[0] == "hide")
            return true; }) || false;
    }
};
Secret.kind = "Secret";
Secret = __decorate([
    autobind(),
    __metadata("design:paramtypes", [Object])
], Secret);
export { Secret };
export const secretsApi = new KubeApi({
    kind: Secret.kind,
    apiBase: "/api/v1/secrets",
    isNamespaced: true,
    objectConstructor: Secret,
});
export const opsSecretsApi = new KubeApi({
    kind: Secret.kind,
    apiBase: "/api/v1/ops-secrets",
    isNamespaced: true,
    objectConstructor: Secret,
});
//# sourceMappingURL=secret.api.js.map