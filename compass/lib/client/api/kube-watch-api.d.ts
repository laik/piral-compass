import { EventEmitter } from "../utils";
import { IKubeWatchEvent, IKubeWatchRouteEvent, IKubeWatchRouteQuery } from "../../server/common/kubewatch";
import { KubeObjectStore } from "../kube-object.store";
import { KubeApi } from "./kube-api";
export { IKubeWatchEvent };
export declare class KubeWatchApi {
    protected evtSource: EventSource;
    protected onData: EventEmitter<[IKubeWatchEvent<any>]>;
    protected apiUrl: string;
    protected subscribers: import("mobx").ObservableMap<KubeApi<any>, number>;
    protected reconnectInterval: {
        start: (runImmediately?: boolean) => void;
        stop: () => void;
        restart: (runImmediately?: boolean) => void;
        readonly isRunning: boolean;
    };
    protected reconnectTimeoutMs: number;
    protected maxReconnectsOnError: number;
    protected reconnectAttempts: number;
    constructor();
    get activeApis(): KubeApi<any>[];
    getSubscribersCount(api: KubeApi): number;
    subscribe(...apis: KubeApi[]): () => void;
    protected getQuery(): Partial<IKubeWatchRouteQuery>;
    protected connect(): void;
    reconnect(): void;
    protected disconnect(): void;
    protected onMessage(evt: MessageEvent): void;
    protected onRouteEvent({ type, url }: IKubeWatchRouteEvent): Promise<void>;
    protected onError(evt: MessageEvent): void;
    protected writeLog(...data: any[]): void;
    addListener(store: KubeObjectStore, callback: (evt: IKubeWatchEvent) => void): () => void;
    reset(): void;
}
export declare const kubeWatchApi: KubeWatchApi;
