import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { IPodContainer } from "./pods.api";
import { KubeApi } from "../kube-api";
export declare class ReplicaSet extends WorkloadKubeObject {
    static kind: string;
    spec: {
        replicas?: number;
        selector?: {
            matchLabels: {
                [key: string]: string;
            };
        };
        containers?: IPodContainer[];
        template?: {
            spec?: {
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
                containers: IPodContainer[];
            };
        };
        restartPolicy?: string;
        terminationGracePeriodSeconds?: number;
        dnsPolicy?: string;
        schedulerName?: string;
    };
    status: {
        replicas: number;
        fullyLabeledReplicas: number;
        readyReplicas: number;
        availableReplicas: number;
        observedGeneration: number;
    };
    getImages(): string[];
}
export declare const replicaSetApi: KubeApi<ReplicaSet>;
