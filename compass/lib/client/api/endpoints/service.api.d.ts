import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export interface IServicePort {
    name?: string;
    protocol: string;
    port: number;
    targetPort: number;
}
export declare class ServicePort implements IServicePort {
    name?: string;
    protocol: string;
    port: number;
    targetPort: number;
    nodePort?: number;
    constructor(data: IServicePort);
    toString(): string;
}
export declare class Service extends KubeObject {
    static kind: string;
    spec: {
        type: string;
        clusterIP: string;
        externalTrafficPolicy?: string;
        loadBalancerIP?: string;
        sessionAffinity: string;
        selector: {
            [key: string]: string;
        };
        ports: ServicePort[];
        externalIPs?: string[];
    };
    status: {
        loadBalancer?: {
            ingress?: {
                ip?: string;
                hostname?: string;
            }[];
        };
    };
    getClusterIp(): string;
    getExternalIps(): string[];
    getType(): string;
    getSelector(): string[];
    getPorts(): ServicePort[];
    getLoadBalancer(): {
        ingress?: {
            ip?: string;
            hostname?: string;
        }[];
    };
    isActive(): boolean;
    getStatus(): "Active" | "Pending";
}
export declare const serviceApi: KubeApi<Service>;
