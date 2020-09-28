import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export interface IComponentStatusCondition {
    type: string;
    status: string;
    message: string;
}
export declare class ComponentStatus extends KubeObject {
    static kind: string;
    conditions: IComponentStatusCondition[];
    getTruthyConditions(): IComponentStatusCondition[];
}
export declare const componentStatusApi: KubeApi<ComponentStatus>;
