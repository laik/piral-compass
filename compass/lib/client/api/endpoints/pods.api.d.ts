import { IAffinity, WorkloadKubeObject } from "../workload-kube-object";
import { IMetrics } from "./metrics.api";
import { KubeApi } from "../kube-api";
export declare class PodsApi extends KubeApi<Pod> {
    getTerminalSession(params: {
        namespace: string;
        pod: string;
        container: string;
        shellType: string;
    }): Promise<TerminalSession>;
    getLogs(params: {
        namespace: string;
        name: string;
    }, query?: IPodLogsQuery): Promise<string>;
    getMetrics(pods: Pod[], namespace: string, selector?: string): Promise<IPodMetrics>;
}
export interface TerminalSession {
    op: number;
    sessionId: string;
}
export interface IPodMetrics<T = IMetrics> {
    [metric: string]: T;
    cpuUsage: T;
    cpuRequests: T;
    cpuLimits: T;
    memoryUsage: T;
    memoryRequests: T;
    memoryLimits: T;
    fsUsage: T;
    networkReceive: T;
    networkTransit: T;
}
export interface IPodLogsQuery {
    container?: string;
    tailLines?: number;
    timestamps?: boolean;
    sinceTime?: string;
}
export declare enum PodStatus {
    TERMINATED = "Terminated",
    FAILED = "Failed",
    PENDING = "Pending",
    RUNNING = "Running",
    SUCCEEDED = "Succeeded",
    EVICTED = "Evicted"
}
export interface IPodContainer {
    name: string;
    image: string;
    command?: string[];
    args?: string[];
    ports: {
        name?: string;
        containerPort: number;
        protocol: string;
    }[];
    resources?: {
        limits: {
            cpu: string;
            memory: string;
        };
        requests: {
            cpu: string;
            memory: string;
        };
    };
    env?: {
        name: string;
        value?: string;
        valueFrom?: {
            fieldRef?: {
                apiVersion: string;
                fieldPath: string;
            };
            secretKeyRef?: {
                key: string;
                name: string;
            };
            configMapKeyRef?: {
                key: string;
                name: string;
            };
        };
    }[];
    envFrom?: {
        configMapRef?: {
            name: string;
        };
    }[];
    volumeMounts?: {
        name: string;
        readOnly: boolean;
        mountPath: string;
    }[];
    livenessProbe?: IContainerProbe;
    readinessProbe?: IContainerProbe;
    imagePullPolicy: string;
}
export interface IContainerProbe {
    httpGet?: {
        path?: string;
        port: number;
        scheme: string;
        host?: string;
    };
    exec?: {
        command: string[];
    };
    tcpSocket?: {
        port: number;
    };
    initialDelaySeconds?: number;
    timeoutSeconds?: number;
    periodSeconds?: number;
    successThreshold?: number;
    failureThreshold?: number;
}
export interface IPodContainerStatus {
    name: string;
    state: {
        [index: string]: object;
        running?: {
            startedAt: string;
        };
        waiting?: {
            reason: string;
            message: string;
        };
        terminated?: {
            startedAt: string;
            finishedAt: string;
            exitCode: number;
            reason: string;
        };
    };
    lastState: {
        terminated?: {
            containerID: string;
            finishedAt: string;
            exitCode: number;
            message: string;
        };
    };
    ready: boolean;
    restartCount: number;
    image: string;
    imageID: string;
    containerID: string;
}
export declare class Pod extends WorkloadKubeObject {
    static kind: string;
    spec: {
        volumes?: {
            name: string;
            persistentVolumeClaim: {
                claimName: string;
            };
            secret: {
                secretName: string;
                defaultMode: number;
            };
        }[];
        initContainers: IPodContainer[];
        containers: IPodContainer[];
        restartPolicy: string;
        terminationGracePeriodSeconds: number;
        dnsPolicy: string;
        serviceAccountName: string;
        serviceAccount: string;
        priority: number;
        priorityClassName: string;
        nodeName: string;
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
        affinity: IAffinity;
    };
    status: {
        phase: string;
        conditions: {
            type: string;
            status: string;
            lastProbeTime: number;
            lastTransitionTime: string;
        }[];
        hostIP: string;
        podIP: string;
        startTime: string;
        initContainerStatuses?: IPodContainerStatus[];
        containerStatuses?: IPodContainerStatus[];
        qosClass: string;
        reason?: string;
    };
    getInitContainers(): IPodContainer[];
    getContainers(): IPodContainer[];
    getAllContainers(): IPodContainer[];
    getRunningContainers(): IPodContainer[];
    getContainerStatuses(includeInitContainers?: boolean): IPodContainerStatus[];
    getRestartsCount(): number;
    getQosClass(): string;
    getReason(): string;
    getPriorityClassName(): string;
    getStatus(): PodStatus.FAILED | PodStatus.PENDING | PodStatus.RUNNING | PodStatus.SUCCEEDED | PodStatus.EVICTED;
    getStatusMessage(tips?: boolean): any;
    getStatusPhase(): string;
    getConditions(): {
        type: string;
        status: string;
        lastProbeTime: number;
        lastTransitionTime: string;
    }[];
    getVolumes(): {
        name: string;
        persistentVolumeClaim: {
            claimName: string;
        };
        secret: {
            secretName: string;
            defaultMode: number;
        };
    }[];
    getSecrets(): string[];
    getNodeSelectors(): string[];
    getTolerations(): {
        key: string;
        operator: string;
        effect: string;
        tolerationSeconds: number;
    }[];
    getAffinity(): IAffinity;
    hasIssues(): boolean;
    getLivenessProbe(container: IPodContainer): string[];
    getReadinessProbe(container: IPodContainer): string[];
    getProbe(probeData: IContainerProbe): string[];
    getNodeName(): string;
}
export declare const podsApi: PodsApi;
