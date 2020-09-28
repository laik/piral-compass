import { WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class Deploy extends WorkloadKubeObject {
    static kind: string;
    spec: {
        appName: string;
        resourceType: string;
        metadata: string;
        service?: string;
        volumeClaims?: string;
    };
    status: {};
    getOwnerNamespace(): string;
    getAppName(): any;
    getResourceType(): any;
    getGenerateTimestamp(): string;
    getCreated(humanize?: boolean, compact?: boolean, fromNow?: boolean): string | number;
    getObject(): any;
    setMetadata(metadata: string): void;
}
export declare const deployApi: KubeApi<Deploy>;
