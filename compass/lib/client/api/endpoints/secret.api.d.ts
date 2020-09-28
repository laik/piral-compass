import { KubeObject } from "../kube-object";
import { KubeJsonApiData } from "../kube-json-api";
import { KubeApi } from "../kube-api";
export declare enum SecretType {
    Opaque = "Opaque",
    ServiceAccountToken = "kubernetes.io/service-account-token",
    Dockercfg = "kubernetes.io/dockercfg",
    DockerConfigJson = "kubernetes.io/dockerconfigjson",
    BasicAuth = "kubernetes.io/basic-auth",
    SSHAuth = "kubernetes.io/ssh-auth",
    TLS = "kubernetes.io/tls",
    BootstrapToken = "bootstrap.kubernetes.io/token",
    CephProvisioner = "kubernetes.io/rbd"
}
export interface ISecretRef {
    key?: string;
    name: string;
}
export declare class Secret extends KubeObject {
    static kind: string;
    type: SecretType;
    data: {
        [prop: string]: string;
        token?: string;
    };
    constructor(data: KubeJsonApiData);
    getKeys(): string[];
    getToken(): string;
    getHide(): false | boolean[];
}
export declare const secretsApi: KubeApi<Secret>;
export declare const opsSecretsApi: KubeApi<Secret>;
