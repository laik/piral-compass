import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class Page extends KubeObject {
    static kind: string;
    spec: {
        tree: string;
    };
}
export declare const pageApi: KubeApi<Page>;
