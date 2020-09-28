import { IConfig } from "../server/common/config";
export declare class ConfigStore {
    readonly isDevelopment: boolean;
    readonly apiPrefix: {
        BASE: string;
        TENANT: string;
        TERMINAL: string;
        KUBE_BASE: string;
        KUBE_USERS: string;
        KUBE_HELM: string;
        KUBE_RESOURCE_APPLIER: string;
    };
    readonly buildVersion: string;
    protected updater: {
        start: (runImmediately?: boolean) => void;
        stop: () => void;
        restart: (runImmediately?: boolean) => void;
        readonly isRunning: boolean;
    };
    config: Partial<IConfig>;
    isLoaded: boolean;
    constructor();
    load(): import("./utils/cancelableFetch").CancelablePromise<void>;
    getToken(): Promise<string>;
    getConfigToken(): string;
    get serverPort(): string;
    get allowedNamespaces(): string[];
    get userName(): string;
    get isClusterAdmin(): boolean;
    getDefaultNamespace(): string;
    getOpsNamespace(): string;
    getAllowedNamespaces(): string[];
    setConfig(res: any): void;
    reset(): void;
}
export declare const configStore: ConfigStore;
