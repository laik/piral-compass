import { EventEmitter } from "../utils/eventEmitter";
interface IParams {
    url?: string;
    autoConnect?: boolean;
    flushOnOpen?: boolean;
    reconnectDelaySeconds?: number;
    pingIntervalSeconds?: number;
    logging?: boolean;
    namespace: string;
    pod: string;
    container: string;
    shellType: string;
}
interface IMessage {
    id: string;
    data: string;
}
export declare enum WebSocketApiState {
    PENDING = -1,
    OPEN = 0,
    CONNECTING = 1,
    RECONNECTING = 2,
    CLOSED = 3
}
export declare class WebSocketApi {
    protected params: IParams;
    protected socket?: WebSocket;
    protected pendingCommands: IMessage[];
    protected reconnectTimer: any;
    protected pingTimer: any;
    protected pingMessage: string;
    protected namespace: string;
    protected pod: string;
    protected container: string;
    protected op: number;
    protected sessionId: string;
    protected shellType: string;
    readyState: WebSocketApiState;
    onOpen: EventEmitter<[]>;
    onData: EventEmitter<[string]>;
    onClose: EventEmitter<[]>;
    static defaultParams: Partial<IParams>;
    constructor(params: IParams);
    get isConnected(): boolean;
    get isOnline(): boolean;
    setParams(params: Partial<IParams>): void;
    connect(url?: string): void;
    ping(): void;
    reconnect(): void;
    destroy(): void;
    refreshSession(): Promise<void>;
    removeAllListeners(): void;
    send(msg: string): void;
    protected flush(): void;
    protected parseMessage(data: string): string;
    protected _onOpen(evt: Event): void;
    protected _onMessage(evt: MessageEvent): void;
    protected _onError(evt: Event): void;
    protected _onClose(evt: CloseEvent): void;
    protected writeLog(...data: any[]): void;
}
export {};
