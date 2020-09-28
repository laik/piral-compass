import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class KubeEvent extends KubeObject {
    static kind: string;
    involvedObject: {
        kind: string;
        namespace: string;
        name: string;
        uid: string;
        apiVersion: string;
        resourceVersion: string;
        fieldPath: string;
    };
    reason: string;
    message: string;
    source: {
        component: string;
        host: string;
    };
    firstTimestamp: string;
    lastTimestamp: string;
    count: number;
    type: string;
    eventTime: null;
    reportingComponent: string;
    reportingInstance: string;
    isWarning(): boolean;
    getSource(): string;
    getFirstSeenTime(): string;
    getLastSeenTime(): string;
}
export declare const eventApi: KubeApi<KubeEvent>;
