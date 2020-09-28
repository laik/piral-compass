import { KubeObject } from "../kube-object";
export declare const resourceApplierApi: {
    annotations: string[];
    update<D extends KubeObject>(resource: object | string): Promise<D>;
};
