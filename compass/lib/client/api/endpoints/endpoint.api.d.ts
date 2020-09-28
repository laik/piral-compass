import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export interface IEndpointPort {
    name?: string;
    protocol: string;
    port: number;
}
export interface IEndpointAddress {
    hostname: string;
    ip: string;
    nodeName: string;
}
export interface IEndpointSubset {
    addresses: IEndpointAddress[];
    notReadyAddresses: IEndpointAddress[];
    ports: IEndpointPort[];
}
interface ITargetRef {
    kind: string;
    namespace: string;
    name: string;
    uid: string;
    resourceVersion: string;
    apiVersion: string;
}
export declare class EndpointAddress implements IEndpointAddress {
    hostname: string;
    ip: string;
    nodeName: string;
    targetRef?: {
        kind: string;
        namespace: string;
        name: string;
        uid: string;
        resourceVersion: string;
    };
    constructor(data: IEndpointAddress);
    getId(): string;
    getName(): string;
    getTargetRef(): ITargetRef;
}
export declare class EndpointSubset implements IEndpointSubset {
    addresses: IEndpointAddress[];
    notReadyAddresses: IEndpointAddress[];
    ports: IEndpointPort[];
    constructor(data: IEndpointSubset);
    getAddresses(): EndpointAddress[];
    getNotReadyAddresses(): EndpointAddress[];
    toString(): string;
}
export declare class Endpoint extends KubeObject {
    static kind: string;
    subsets: IEndpointSubset[];
    getEndpointSubsets(): EndpointSubset[];
    toString(): string;
}
export declare const endpointApi: KubeApi<Endpoint>;
export {};
