var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { autorun, observable } from "mobx";
import { autobind } from "../../utils";
import { Terminal } from "./terminal";
import { TerminalApi } from "../../api/terminal-api";
import { dockStore, TabKind } from "./dock.store";
import { WebSocketApiState } from "../../api/websocket-api";
import { themeStore } from "../../theme.store";
export function isTerminalTab(tab) {
    return tab && tab.kind === TabKind.TERMINAL;
}
export function createTerminalTab(tabParams = {}) {
    return dockStore.createTab(Object.assign({ kind: TabKind.TERMINAL, title: `` }, tabParams));
}
let TerminalStore = class TerminalStore {
    constructor() {
        this.terminals = new Map();
        this.connections = observable.map();
        // connect active tab
        autorun(() => {
            const { selectedTab, isOpen } = dockStore;
            if (!isTerminalTab(selectedTab))
                return;
            if (isOpen) {
                this.connect(selectedTab.id);
            }
        });
        // disconnect closed tabs
        autorun(() => {
            const currentTabs = dockStore.tabs.map((tab) => tab.id);
            for (const [tabId] of this.connections) {
                if (!currentTabs.includes(tabId))
                    this.disconnect(tabId);
            }
        });
    }
    connect(tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.namespace && this.container) {
                if (this.isConnected(tabId)) {
                    return;
                }
                const tab = dockStore.getTabById(tabId);
                const api = new TerminalApi({
                    namespace: this.namespace,
                    pod: this.pod,
                    container: this.container,
                    shellType: this.shellType,
                    id: tabId,
                    node: tab.node,
                    colorTheme: themeStore.activeTheme.type,
                });
                const terminal = new Terminal(tabId, api);
                this.connections.set(tabId, api);
                this.terminals.set(tabId, terminal);
            }
            else {
                dockStore.closeTab(tabId);
            }
        });
    }
    disconnect(tabId) {
        if (!this.isConnected(tabId)) {
            return;
        }
        const terminal = this.terminals.get(tabId);
        const terminalApi = this.connections.get(tabId);
        terminal.destroy();
        terminalApi.destroy();
        this.connections.delete(tabId);
        this.terminals.delete(tabId);
    }
    reconnect(tabId) {
        const terminalApi = this.connections.get(tabId);
        if (terminalApi)
            terminalApi.connect();
    }
    isConnected(tabId) {
        return !!this.connections.get(tabId);
    }
    isDisconnected(tabId) {
        const terminalApi = this.connections.get(tabId);
        if (terminalApi) {
            return terminalApi.readyState === WebSocketApiState.CLOSED;
        }
    }
    sendCommand(command, options = {}) {
        const { enter, newTab, tabId } = options;
        const { selectTab, getTabById } = dockStore;
        const tab = tabId && getTabById(tabId);
        if (tab)
            selectTab(tabId);
        if (newTab)
            createTerminalTab();
        const terminalApi = this.connections.get(dockStore.selectedTabId);
        if (terminalApi) {
            terminalApi.emitStatus(command);
            if (enter) {
                const dataObj = { Data: command + (enter ? "\r" : "") };
                terminalApi.sendCommand(dataObj);
            }
        }
    }
    startTerminal(namespace, pod, container, shellType, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            this.namespace = namespace;
            this.pod = pod;
            this.container = container;
            this.shellType = shellType;
            const { newTab, tabId } = options;
            const { selectTab, getTabById } = dockStore;
            const tab = tabId && getTabById(tabId);
            if (tab)
                selectTab(tabId);
            if (newTab)
                createTerminalTab({ pod: this.pod, container: this.container });
        });
    }
    getTerminal(tabId) {
        return this.terminals.get(tabId);
    }
    reset() {
        [...this.connections].forEach(([tabId]) => {
            this.disconnect(tabId);
        });
    }
};
TerminalStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], TerminalStore);
export { TerminalStore };
export const terminalStore = new TerminalStore();
//# sourceMappingURL=terminal.store.js.map