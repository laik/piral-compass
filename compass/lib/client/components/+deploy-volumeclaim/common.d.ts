export interface VolumeClaimTemplateMetadata {
    isUseDefaultStorageClass: boolean;
    name: string;
    annotations: Map<string, string>;
}
export interface VolumeClaimTemplateSpecResourcesRequests {
    storage: string;
}
export interface VolumeClaimTemplateSpecResources {
    requests: VolumeClaimTemplateSpecResourcesRequests;
}
export interface VolumeClaimTemplateSpec {
    accessModes: string[];
    storageClassName: string;
    resources: VolumeClaimTemplateSpecResources;
}
export interface VolumeClaimTemplate {
    metadata: VolumeClaimTemplateMetadata;
    spec: VolumeClaimTemplateSpec;
}
export interface VolumeClaimTemplates {
    status: boolean;
    volumeClaimTemplates: Array<VolumeClaimTemplate>;
}
export declare function annotations(): Map<any, any>;
export declare const volumeClaim: VolumeClaimTemplate;
