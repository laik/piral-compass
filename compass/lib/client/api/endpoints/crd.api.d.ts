import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class CustomResourceDefinition extends KubeObject {
    static kind: string;
    spec: {
        group: string;
        version: string;
        names: {
            plural: string;
            singular: string;
            kind: string;
            listKind: string;
        };
        scope: "Namespaced" | "Cluster" | string;
        validation?: any;
        versions: {
            name: string;
            served: boolean;
            storage: boolean;
        }[];
        conversion: {
            strategy?: string;
            webhook?: any;
        };
        additionalPrinterColumns?: {
            name: string;
            type: "integer" | "number" | "string" | "boolean" | "date";
            priority: number;
            description: string;
            JSONPath: string;
        }[];
    };
    status: {
        conditions: {
            lastTransitionTime: string;
            message: string;
            reason: string;
            status: string;
            type: string;
        }[];
        acceptedNames: {
            plural: string;
            singular: string;
            kind: string;
            shortNames: string[];
            listKind: string;
        };
        storedVersions: string[];
    };
    getResourceUrl(): string;
    getResourceApiBase(): string;
    getPluralName(): string;
    getResourceKind(): string;
    getResourceTitle(): string;
    getGroup(): string;
    getScope(): string;
    getVersion(): string;
    isNamespaced(): boolean;
    getStoredVersions(): string;
    getNames(): {
        plural: string;
        singular: string;
        kind: string;
        listKind: string;
    };
    getConversion(): string;
    getPrinterColumns(ignorePriority?: boolean): {
        name: string;
        type: "string" | "number" | "boolean" | "date" | "integer";
        priority: number;
        description: string;
        JSONPath: string;
    }[];
    getValidation(): string;
    getConditions(): {
        isReady: boolean;
        tooltip: string;
        lastTransitionTime: string;
        message: string;
        reason: string;
        status: string;
        type: string;
    }[];
}
export declare const crdApi: KubeApi<CustomResourceDefinition>;
