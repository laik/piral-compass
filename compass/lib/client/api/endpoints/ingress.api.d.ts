import { KubeObject } from "../kube-object";
import { IMetrics } from "./metrics.api";
import { KubeApi } from "../kube-api";
export declare class IngressApi extends KubeApi<Ingress> {
    getMetrics(ingress: string, namespace: string): Promise<IIngressMetrics>;
}
export interface IIngressMetrics<T = IMetrics> {
    [metric: string]: T;
    bytesSentSuccess: T;
    bytesSentFailure: T;
    requestDurationSeconds: T;
    responseDurationSeconds: T;
}
export declare class Ingress extends KubeObject {
    static kind: string;
    spec: {
        tls: {
            hosts: string[];
            secretName: string;
        }[];
        rules?: {
            host?: string;
            http: {
                paths: {
                    path?: string;
                    backend: {
                        serviceName: string;
                        servicePort: number;
                    };
                }[];
            };
        }[];
        backend?: {
            serviceName: string;
            servicePort: number;
        };
    };
    status: {
        loadBalancer: {
            ingress: any[];
        };
    };
    getRoutes(): string[];
    getHosts(): string[];
    getPorts(): string;
}
export declare const ingressApi: IngressApi;
