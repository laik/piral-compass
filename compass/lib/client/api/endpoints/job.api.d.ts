import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { IPodContainer } from "./pods.api";
import { KubeApi } from "../kube-api";
export declare class Job extends WorkloadKubeObject {
    static kind: string;
    spec: {
        parallelism?: number;
        completions?: number;
        backoffLimit?: number;
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
                restartPolicy: string;
                terminationGracePeriodSeconds: number;
                dnsPolicy: string;
                hostPID: boolean;
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
                schedulerName: string;
            };
        };
        containers?: IPodContainer[];
        restartPolicy?: string;
        terminationGracePeriodSeconds?: number;
        dnsPolicy?: string;
        serviceAccountName?: string;
        serviceAccount?: string;
        schedulerName?: string;
    };
    status: {
        conditions: {
            type: string;
            status: string;
            lastProbeTime: string;
            lastTransitionTime: string;
            message?: string;
        }[];
        startTime: string;
        completionTime: string;
        succeeded: number;
    };
    getDesiredCompletions(): number;
    getCompletions(): number;
    getParallelism(): number;
    getCondition(): {
        type: string;
        status: string;
        lastProbeTime: string;
        lastTransitionTime: string;
        message?: string;
    };
    getImages(): string[];
}
export declare const jobApi: KubeApi<Job>;
