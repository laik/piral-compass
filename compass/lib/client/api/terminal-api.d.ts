import { EventEmitter } from "../utils";
import { WebSocketApi } from "./websocket-api";
export declare enum TerminalChannels {
    STDIN = 1,
    STDOUT = 2,
    TERMINAL_SIZE = 3,
    TOAST = 4,
    INEXIT = 5,
    OUTEXIT = 6
}
declare enum TerminalColor {
    RED = "\u001B[31m",
    GREEN = "\u001B[32m",
    YELLOW = "\u001B[33m",
    BLUE = "\u001B[34m",
    MAGENTA = "\u001B[35m",
    CYAN = "\u001B[36m",
    GRAY = "\u001B[90m",
    LIGHT_GRAY = "\u001B[37m",
    NO_COLOR = "\u001B[0m"
}
export interface ITerminalApiOptions {
    namespace: string;
    pod: string;
    container: string;
    shellType: string;
    id: string;
    node?: string;
    colorTheme?: "light" | "dark";
}
export declare class TerminalApi extends WebSocketApi {
    protected options: ITerminalApiOptions;
    protected size: {
        Width: number;
        Height: number;
    };
    protected currentToken: string;
    onReady: EventEmitter<[]>;
    isReady: boolean;
    constructor(options: ITerminalApiOptions);
    getUrl(): Promise<string>;
    connect(): Promise<void>;
    destroy(): void;
    removeAllListeners(): void;
    protected _onReady(data: string): boolean;
    reconnect(): void;
    sendCommand(dataObj: any, channel?: TerminalChannels): void;
    sendTerminalSize(cols: number, rows: number): void;
    protected parseMessage(data: string): any;
    protected _onOpen(evt: Event): void;
    protected _onClose(evt: CloseEvent): void;
    emitStatus(data: string, options?: {
        color?: TerminalColor;
        showTime?: boolean;
    }): void;
    protected emitError(error: string): void;
}
export {};
