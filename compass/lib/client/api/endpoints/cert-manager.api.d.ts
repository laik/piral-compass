import { KubeObject } from "../kube-object";
import { ISecretRef } from "./secret.api";
import { KubeApi } from "../kube-api";
export declare class Certificate extends KubeObject {
    static kind: string;
    spec: {
        secretName: string;
        commonName?: string;
        dnsNames?: string[];
        organization?: string[];
        ipAddresses?: string[];
        duration?: string;
        renewBefore?: string;
        isCA?: boolean;
        keySize?: number;
        keyAlgorithm?: "rsa" | "ecdsa";
        issuerRef: {
            kind?: string;
            name: string;
        };
        acme?: {
            config: {
                domains: string[];
                http01: {
                    ingress?: string;
                    ingressClass?: string;
                };
                dns01?: {
                    provider: string;
                };
            }[];
        };
    };
    status: {
        conditions?: {
            lastTransitionTime: string;
            message: string;
            reason: string;
            status: string;
            type: string;
        }[];
        notAfter: string;
        lastFailureTime?: string;
    };
    getType(): string;
    getCommonName(): string;
    getIssuerName(): string;
    getSecretName(): string;
    getIssuerDetailsUrl(): string;
    getSecretDetailsUrl(): string;
    getConditions(): {
        isReady: boolean;
        tooltip: string;
        lastTransitionTime: string;
        message: string;
        reason: string;
        status: string;
        type: string;
    }[];
}
export declare class Issuer extends KubeObject {
    static kind: string;
    spec: {
        acme?: {
            email: string;
            server: string;
            skipTLSVerify?: boolean;
            privateKeySecretRef: ISecretRef;
            solvers?: {
                dns01?: {
                    cnameStrategy: string;
                    acmedns?: {
                        host: string;
                        accountSecretRef: ISecretRef;
                    };
                    akamai?: {
                        accessTokenSecretRef: ISecretRef;
                        clientSecretSecretRef: ISecretRef;
                        clientTokenSecretRef: ISecretRef;
                        serviceConsumerDomain: string;
                    };
                    azuredns?: {
                        clientID: string;
                        clientSecretSecretRef: ISecretRef;
                        hostedZoneName: string;
                        resourceGroupName: string;
                        subscriptionID: string;
                        tenantID: string;
                    };
                    clouddns?: {
                        project: string;
                        serviceAccountSecretRef: ISecretRef;
                    };
                    cloudflare?: {
                        email: string;
                        apiKeySecretRef: ISecretRef;
                    };
                    digitalocean?: {
                        tokenSecretRef: ISecretRef;
                    };
                    rfc2136?: {
                        nameserver: string;
                        tsigAlgorithm: string;
                        tsigKeyName: string;
                        tsigSecretSecretRef: ISecretRef;
                    };
                    route53?: {
                        accessKeyID: string;
                        hostedZoneID: string;
                        region: string;
                        secretAccessKeySecretRef: ISecretRef;
                    };
                    webhook?: {
                        config: object;
                        groupName: string;
                        solverName: string;
                    };
                };
                http01?: {
                    ingress: {
                        class: string;
                        name: string;
                        serviceType: string;
                    };
                };
                selector?: {
                    dnsNames: string[];
                    matchLabels: {
                        [label: string]: string;
                    };
                };
            }[];
        };
        ca?: {
            secretName: string;
        };
        vault?: {
            path: string;
            server: string;
            caBundle: string;
            auth: {
                appRole: {
                    path: string;
                    roleId: string;
                    secretRef: ISecretRef;
                };
            };
        };
        selfSigned?: {};
        venafi?: {
            zone: string;
            cloud?: {
                apiTokenSecretRef: ISecretRef;
            };
            tpp?: {
                url: string;
                caBundle: string;
                credentialsRef: {
                    name: string;
                };
            };
        };
    };
    status: {
        acme?: {
            uri: string;
        };
        conditions?: {
            lastTransitionTime: string;
            message: string;
            reason: string;
            status: string;
            type: string;
        }[];
    };
    getType(): "ACME" | "CA" | "SelfSigned" | "Vault" | "Venafi";
    getConditions(): {
        isReady: boolean;
        tooltip: string;
        lastTransitionTime: string;
        message: string;
        reason: string;
        status: string;
        type: string;
    }[];
}
export declare class ClusterIssuer extends Issuer {
    static kind: string;
}
export declare const certificatesApi: KubeApi<Certificate>;
export declare const issuersApi: KubeApi<Issuer>;
export declare const clusterIssuersApi: KubeApi<ClusterIssuer>;
