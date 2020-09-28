import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class Stone extends WorkloadKubeObject {
    static kind: string;
    spec: {
        service: {
            ports: {
                name: string;
                protocol: string;
                port: number;
                targetPort: number;
            }[];
            type: string;
        };
        strategy: string;
        template: {
            metadata: {
                labels: {
                    app: string;
                };
            };
            spec: {
                containers: {
                    name: string;
                    image: string;
                    ports: {
                        containerPort: number;
                        name: string;
                    }[];
                    volumeMounts: {
                        name: string;
                        mountPath: string;
                    }[];
                }[];
                affinity?: IAffinity;
                nodeSelector?: {
                    [selector: string]: string;
                };
                tolerations: {
                    key: string;
                    operator: string;
                    effect: string;
                    tolerationSeconds: number;
                }[];
            };
        };
        volumeClaimTemplates: {
            metadata: {
                name: string;
            };
            spec: {
                accessModes: string[];
                resources: {
                    requests: {
                        storage: string;
                    };
                };
            };
        }[];
        coordinates: {
            group: string;
            replicas: number;
            zoneset: {
                rack: string;
                host: string;
            }[];
        }[];
    };
    status: {
        replicas: number;
        statefulset: number;
    };
    getStrategy(): any;
    getImages(): string[];
}
export declare const stoneApi: KubeApi<Stone>;
