import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class StatefulSet extends WorkloadKubeObject {
    static kind: string;
    spec: {
        serviceName: string;
        replicas: number;
        selector: {
            matchLabels: {
                [key: string]: string;
            };
        };
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
    };
    status: {
        observedGeneration: number;
        replicas: number;
        currentReplicas: number;
        currentRevision: string;
        updateRevision: string;
        collisionCount: number;
    };
    getImages(): string[];
}
export declare const statefulSetApi: KubeApi<StatefulSet>;
