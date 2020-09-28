import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class PodSecurityPolicy extends KubeObject {
    static kind: string;
    spec: {
        allowPrivilegeEscalation?: boolean;
        allowedCSIDrivers?: {
            name: string;
        }[];
        allowedCapabilities: string[];
        allowedFlexVolumes?: {
            driver: string;
        }[];
        allowedHostPaths?: {
            pathPrefix: string;
            readOnly: boolean;
        }[];
        allowedProcMountTypes?: string[];
        allowedUnsafeSysctls?: string[];
        defaultAddCapabilities?: string[];
        defaultAllowPrivilegeEscalation?: boolean;
        forbiddenSysctls?: string[];
        fsGroup?: {
            rule: string;
            ranges: {
                max: number;
                min: number;
            }[];
        };
        hostIPC?: boolean;
        hostNetwork?: boolean;
        hostPID?: boolean;
        hostPorts?: {
            max: number;
            min: number;
        }[];
        privileged?: boolean;
        readOnlyRootFilesystem?: boolean;
        requiredDropCapabilities?: string[];
        runAsGroup?: {
            ranges: {
                max: number;
                min: number;
            }[];
            rule: string;
        };
        runAsUser?: {
            rule: string;
            ranges: {
                max: number;
                min: number;
            }[];
        };
        runtimeClass?: {
            allowedRuntimeClassNames: string[];
            defaultRuntimeClassName: string;
        };
        seLinux?: {
            rule: string;
            seLinuxOptions: {
                level: string;
                role: string;
                type: string;
                user: string;
            };
        };
        supplementalGroups?: {
            rule: string;
            ranges: {
                max: number;
                min: number;
            }[];
        };
        volumes?: string[];
    };
    isPrivileged(): boolean;
    getVolumes(): string[];
    getRules(): {
        fsGroup: string;
        runAsGroup: string;
        runAsUser: string;
        supplementalGroups: string;
        seLinux: string;
    };
}
export declare const pspApi: KubeApi<PodSecurityPolicy>;
