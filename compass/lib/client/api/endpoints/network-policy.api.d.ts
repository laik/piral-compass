import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export interface IPolicyIpBlock {
    cidr: string;
    except?: string[];
}
export interface IPolicySelector {
    matchLabels: {
        [label: string]: string;
    };
}
export interface IPolicyIngress {
    from: {
        ipBlock?: IPolicyIpBlock;
        namespaceSelector?: IPolicySelector;
        podSelector?: IPolicySelector;
    }[];
    ports: {
        protocol: string;
        port: number;
    }[];
}
export interface IPolicyEgress {
    to: {
        ipBlock: IPolicyIpBlock;
    }[];
    ports: {
        protocol: string;
        port: number;
    }[];
}
export declare class NetworkPolicy extends KubeObject {
    static kind: string;
    spec: {
        podSelector: {
            matchLabels: {
                [label: string]: string;
                role: string;
            };
        };
        policyTypes: string[];
        ingress: IPolicyIngress[];
        egress: IPolicyEgress[];
    };
    getMatchLabels(): string[];
    getTypes(): string[];
}
export declare const networkPolicyApi: KubeApi<NetworkPolicy>;
