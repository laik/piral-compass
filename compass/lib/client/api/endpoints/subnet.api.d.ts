import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class SubNet extends KubeObject {
    static kind: string;
    spec: {
        protocol: string;
        cidrBlock: string;
        gateway: string;
        namespaces: any[];
        excludeIps: string[];
        private?: boolean;
        allowSubnets?: string[];
        natOutgoing?: boolean;
        gatewayType?: string;
    };
}
export declare const subNetApi: KubeApi<SubNet>;
