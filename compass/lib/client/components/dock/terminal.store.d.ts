import { Terminal } from "./terminal";
import { TerminalApi } from "../../api/terminal-api";
import { IDockTab, TabId } from "./dock.store";
export interface ITerminalTab extends IDockTab {
    node?: string;
    pod?: string;
    container?: string;
}
export declare function isTerminalTab(tab: IDockTab): boolean;
export declare function createTerminalTab(tabParams?: Partial<ITerminalTab>): IDockTab;
export declare class TerminalStore {
    protected namespace: string;
    protected pod: string;
    protected container: string;
    protected shellType: string;
    protected terminals: Map<string, Terminal>;
    protected connections: import("mobx").ObservableMap<string, TerminalApi>;
    constructor();
    connect(tabId: TabId): Promise<void>;
    disconnect(tabId: TabId): void;
    reconnect(tabId: TabId): void;
    isConnected(tabId: TabId): boolean;
    isDisconnected(tabId: TabId): boolean;
    sendCommand(command: string, options?: {
        enter?: boolean;
        newTab?: boolean;
        tabId?: TabId;
    }): void;
    startTerminal(namespace: string, pod: string, container: string, shellType?: string, options?: {
        newTab?: boolean;
        tabId?: TabId;
    }): Promise<void>;
    getTerminal(tabId: TabId): Terminal;
    reset(): void;
}
export declare const terminalStore: TerminalStore;
