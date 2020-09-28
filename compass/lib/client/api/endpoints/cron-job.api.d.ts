import { KubeObject } from "../kube-object";
import { IPodContainer } from "./pods.api";
import { KubeApi } from "../kube-api";
export declare class CronJob extends KubeObject {
    static kind: string;
    kind: string;
    apiVersion: string;
    metadata: {
        name: string;
        namespace: string;
        selfLink: string;
        uid: string;
        resourceVersion: string;
        creationTimestamp: string;
        labels: {
            [key: string]: string;
        };
        annotations: {
            [key: string]: string;
        };
    };
    spec: {
        schedule: string;
        concurrencyPolicy: string;
        suspend: boolean;
        jobTemplate: {
            metadata: {
                creationTimestamp?: string;
            };
            spec: {
                template: {
                    metadata: {
                        creationTimestamp?: string;
                    };
                    spec: {
                        containers: IPodContainer[];
                        restartPolicy: string;
                        terminationGracePeriodSeconds: number;
                        dnsPolicy: string;
                        hostPID: boolean;
                        schedulerName: string;
                    };
                };
            };
        };
        successfulJobsHistoryLimit: number;
        failedJobsHistoryLimit: number;
    };
    status: {
        lastScheduleTime: string;
    };
    getSuspendFlag(): string;
    getLastScheduleTime(): string;
    getSchedule(): string;
    isNeverRun(): boolean;
}
export declare const cronJobApi: KubeApi<CronJob>;
