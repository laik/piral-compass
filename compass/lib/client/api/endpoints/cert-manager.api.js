// Kubernetes certificate management controller apis
// Reference: https://docs.cert-manager.io/en/latest/reference/index.html
// API docs: https://docs.cert-manager.io/en/latest/reference/api-docs/index.html
import { KubeObject } from "../kube-object";
import { secretsApi } from "./secret.api";
import { getDetailsUrl } from "../../navigation";
import { KubeApi } from "../kube-api";
export class Certificate extends KubeObject {
    getType() {
        const { isCA, acme } = this.spec;
        if (isCA)
            return "CA";
        if (acme)
            return "ACME";
    }
    getCommonName() {
        return this.spec.commonName || "";
    }
    getIssuerName() {
        return this.spec.issuerRef.name;
    }
    getSecretName() {
        return this.spec.secretName;
    }
    getIssuerDetailsUrl() {
        return getDetailsUrl(issuersApi.getUrl({
            namespace: this.getNs(),
            name: this.getIssuerName(),
        }));
    }
    getSecretDetailsUrl() {
        return getDetailsUrl(secretsApi.getUrl({
            namespace: this.getNs(),
            name: this.getSecretName(),
        }));
    }
    getConditions() {
        const { conditions = [] } = this.status;
        return conditions.map(condition => {
            const { message, reason, lastTransitionTime, status } = condition;
            return Object.assign(Object.assign({}, condition), { isReady: status === "True", tooltip: `${message || reason} (${lastTransitionTime})` });
        });
    }
}
Certificate.kind = "Certificate";
export class Issuer extends KubeObject {
    getType() {
        const { acme, ca, selfSigned, vault, venafi } = this.spec;
        if (acme)
            return "ACME";
        if (ca)
            return "CA";
        if (selfSigned)
            return "SelfSigned";
        if (vault)
            return "Vault";
        if (venafi)
            return "Venafi";
    }
    getConditions() {
        const { conditions = [] } = this.status;
        return conditions.map(condition => {
            const { message, reason, lastTransitionTime, status } = condition;
            return Object.assign(Object.assign({}, condition), { isReady: status === "True", tooltip: `${message || reason} (${lastTransitionTime})` });
        });
    }
}
Issuer.kind = "Issuer";
export class ClusterIssuer extends Issuer {
}
ClusterIssuer.kind = "ClusterIssuer";
export const certificatesApi = new KubeApi({
    kind: Certificate.kind,
    apiBase: "/apis/certmanager.k8s.io/v1alpha1/certificates",
    isNamespaced: true,
    objectConstructor: Certificate,
});
export const issuersApi = new KubeApi({
    kind: Issuer.kind,
    apiBase: "/apis/certmanager.k8s.io/v1alpha1/issuers",
    isNamespaced: true,
    objectConstructor: Issuer,
});
export const clusterIssuersApi = new KubeApi({
    kind: ClusterIssuer.kind,
    apiBase: "/apis/certmanager.k8s.io/v1alpha1/clusterissuers",
    isNamespaced: false,
    objectConstructor: ClusterIssuer,
});
//# sourceMappingURL=cert-manager.api.js.map