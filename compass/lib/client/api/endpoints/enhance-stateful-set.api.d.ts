import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class EnhanceStatefulSet extends WorkloadKubeObject {
    getStatus(): any;
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
                    annotations: {
                        [key: string]: string;
                    };
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
                tolerations?: {
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
                annotations: {
                    [key: string]: string;
                };
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
    podManagementPolicy: string;
    updateStrategy: {
        type: string;
        rollingUpdate: {
            podUpdatePolicy: string;
            maxUnavailable: number;
            partition: number;
        };
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
    getReplicaUpdate(): any;
}
export declare const enhanceStatefulSetApi: KubeApi<EnhanceStatefulSet>;
