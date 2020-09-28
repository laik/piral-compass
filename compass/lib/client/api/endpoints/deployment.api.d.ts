import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class DeploymentApi extends KubeApi<Deployment> {
    protected getScaleApiUrl(params: {
        namespace: string;
        name: string;
    }): string;
    getReplicas(params: {
        namespace: string;
        name: string;
    }): Promise<number>;
    scale(params: {
        namespace: string;
        name: string;
    }, replicas: number): import("../../utils/cancelableFetch").CancelablePromise<import("../kube-json-api").KubeJsonApiData>;
}
export declare class Deployment extends WorkloadKubeObject {
    static kind: string;
    spec: {
        replicas: number;
        selector: {
            matchLabels: {
                [app: string]: string;
            };
        };
        template: {
            metadata: {
                creationTimestamp?: string;
                labels: {
                    [app: string]: string;
                };
            };
            spec: {
                containers: {
                    name: string;
                    image: string;
                    args?: string[];
                    ports?: {
                        name: string;
                        containerPort: number;
                        protocol: string;
                    }[];
                    env?: {
                        name: string;
                        value: string;
                    }[];
                    resources: {
                        limits?: {
                            cpu: string;
                            memory: string;
                        };
                        requests: {
                            cpu: string;
                            memory: string;
                        };
                    };
                    volumeMounts?: {
                        name: string;
                        mountPath: string;
                    }[];
                    livenessProbe?: {
                        httpGet: {
                            path: string;
                            port: number;
                            scheme: string;
                        };
                        initialDelaySeconds: number;
                        timeoutSeconds: number;
                        periodSeconds: number;
                        successThreshold: number;
                        failureThreshold: number;
                    };
                    readinessProbe?: {
                        httpGet: {
                            path: string;
                            port: number;
                            scheme: string;
                        };
                        initialDelaySeconds: number;
                        timeoutSeconds: number;
                        periodSeconds: number;
                        successThreshold: number;
                        failureThreshold: number;
                    };
                    terminationMessagePath: string;
                    terminationMessagePolicy: string;
                    imagePullPolicy: string;
                }[];
                restartPolicy: string;
                terminationGracePeriodSeconds: number;
                dnsPolicy: string;
                affinity?: IAffinity;
                nodeSelector?: {
                    [selector: string]: string;
                };
                serviceAccountName: string;
                serviceAccount: string;
                securityContext: {};
                schedulerName: string;
                tolerations?: {
                    key: string;
                    operator: string;
                    effect: string;
                    tolerationSeconds: number;
                }[];
                volumes?: {
                    name: string;
                    configMap: {
                        name: string;
                        defaultMode: number;
                        optional: boolean;
                    };
                }[];
            };
        };
        strategy: {
            type: string;
            rollingUpdate: {
                maxUnavailable: number;
                maxSurge: number;
            };
        };
    };
    status: {
        observedGeneration: number;
        replicas: number;
        updatedReplicas: number;
        readyReplicas: number;
        availableReplicas?: number;
        unavailableReplicas?: number;
        conditions: {
            type: string;
            status: string;
            lastUpdateTime: string;
            lastTransitionTime: string;
            reason: string;
            message: string;
        }[];
    };
    getConditions(activeOnly?: boolean): {
        type: string;
        status: string;
        lastUpdateTime: string;
        lastTransitionTime: string;
        reason: string;
        message: string;
    }[];
    getConditionsText(activeOnly?: boolean): string;
    getReplicas(): number;
}
export declare const deploymentApi: DeploymentApi;
