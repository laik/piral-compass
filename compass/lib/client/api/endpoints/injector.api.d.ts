import { WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
export declare class Injector extends WorkloadKubeObject {
    static kind: string;
    spec: {
        namespace: string;
        name: string;
        preContainers: {
            args: string[];
            image: string;
            name: string;
            resources: {};
            volumeMounts: {
                mountPath: string;
                name: string;
            }[];
        }[];
        postContainers: {
            args: string[];
            image: string;
            name: string;
            resources: {};
            volumeMounts: {
                mountPath: string;
                name: string;
            }[];
        }[];
        volumes: {
            emptyDir: string;
            name: string;
        }[];
        selector: {
            matchLabels: {
                app: string;
            };
        };
    };
    status: {};
    getPreContainer(): string[];
    getPostContainer(): string[];
}
export declare const injectorApi: KubeApi<Injector>;
