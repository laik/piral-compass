import { IPodContainer } from "./pods.api";
import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class DaemonSet extends WorkloadKubeObject {
    static kind: string;
    spec: {
        selector: {
            matchLabels: {
                [name: string]: string;
            };
        };
        template: {
            metadata: {
                creationTimestamp?: string;
                labels: {
                    name: string;
                };
            };
            spec: {
                containers: IPodContainer[];
                initContainers?: IPodContainer[];
                restartPolicy: string;
                terminationGracePeriodSeconds: number;
                dnsPolicy: string;
                hostPID: boolean;
                affinity?: IAffinity;
                nodeSelector?: {
                    [selector: string]: string;
                };
                securityContext: {};
                schedulerName: string;
                tolerations: {
                    key: string;
                    operator: string;
                    effect: string;
                    tolerationSeconds: number;
                }[];
            };
        };
        updateStrategy: {
            type: string;
            rollingUpdate: {
                maxUnavailable: number;
            };
        };
        revisionHistoryLimit: number;
    };
    status: {
        currentNumberScheduled: number;
        numberMisscheduled: number;
        desiredNumberScheduled: number;
        numberReady: number;
        observedGeneration: number;
        updatedNumberScheduled: number;
        numberAvailable: number;
        numberUnavailable: number;
    };
    getImages(): string[];
}
export declare const daemonSetApi: KubeApi<DaemonSet>;
