export interface ServicePorts {
    name: string;
    protocol: string;
    port: string;
    targetPort: string;
}
export interface Service {
    type: string;
    ports: ServicePorts[];
}
export declare const deployPort: ServicePorts;
export declare const deployService: Service;
