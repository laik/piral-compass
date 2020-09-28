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
import { observable } from "mobx";
import { EventEmitter } from "../utils/eventEmitter";
import SockJS from "sockjs-client";
import { podsApi } from "../api/endpoints";
const welcome = `
Yame Container Cloud Platform === \r\n
             === == ==\r\n
 /"""""""""""""" //\\___/ === == == \r\n
{                       /  == = \r\n
 \\______ O           _ _/  == === == \r\n
   \\    \\         _ _/ == === ===\r\n
    \\____\\_______/__/__/ == == == \r\n
`;
export var WebSocketApiState;
(function (WebSocketApiState) {
    WebSocketApiState[WebSocketApiState["PENDING"] = -1] = "PENDING";
    WebSocketApiState[WebSocketApiState["OPEN"] = 0] = "OPEN";
    WebSocketApiState[WebSocketApiState["CONNECTING"] = 1] = "CONNECTING";
    WebSocketApiState[WebSocketApiState["RECONNECTING"] = 2] = "RECONNECTING";
    WebSocketApiState[WebSocketApiState["CLOSED"] = 3] = "CLOSED";
})(WebSocketApiState || (WebSocketApiState = {}));
export class WebSocketApi {
    constructor(params) {
        this.params = params;
        this.pendingCommands = [];
        this.pingMessage = "PING";
        this.readyState = WebSocketApiState.PENDING;
        this.onOpen = new EventEmitter();
        this.onData = new EventEmitter();
        this.onClose = new EventEmitter();
        this.params = Object.assign({}, WebSocketApi.defaultParams, params);
        const { namespace, pod, container, autoConnect, shellType, pingIntervalSeconds, } = this.params;
        this.namespace = namespace;
        this.pod = pod;
        this.container = container;
        this.shellType = shellType;
        if (autoConnect) {
            setTimeout(() => this.connect(), 3000);
        }
        // if (pingIntervalSeconds) {
        //     this.pingTimer = setInterval(() => this.ping(), pingIntervalSeconds * 1000);
        // }
    }
    get isConnected() {
        const state = this.socket ? this.socket.readyState : -1;
        return state === WebSocket.OPEN && this.isOnline;
    }
    get isOnline() {
        return navigator.onLine;
    }
    setParams(params) {
        Object.assign(this.params, params);
    }
    connect(url = this.params.url) {
        if (this.socket) {
            this.socket.close(); // close previous connection first
        }
        this.refreshSession();
        this.socket = new SockJS(url);
        this.socket.onopen = this._onOpen.bind(this);
        this.socket.onmessage = this._onMessage.bind(this);
        this.socket.onerror = this._onError.bind(this);
        this.socket.onclose = this._onClose.bind(this);
        this.readyState = WebSocketApiState.CONNECTING;
    }
    ping() {
        if (!this.isConnected)
            return;
        this.send(this.pingMessage);
    }
    reconnect() {
        const { reconnectDelaySeconds } = this.params;
        if (!reconnectDelaySeconds)
            return;
        this.writeLog("reconnect after", reconnectDelaySeconds + "ms");
        this.reconnectTimer = setTimeout(() => this.connect(), reconnectDelaySeconds * 1000);
        this.readyState = WebSocketApiState.RECONNECTING;
    }
    destroy() {
        if (!this.socket)
            return;
        this.socket.close();
        this.socket = null;
        // this.pendingCommands = [];
        this.removeAllListeners();
        clearTimeout(this.reconnectTimer);
        clearInterval(this.pingTimer);
        this.readyState = WebSocketApiState.PENDING;
    }
    refreshSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiSession = yield podsApi.getTerminalSession({
                namespace: this.namespace,
                pod: this.pod,
                container: this.container,
                shellType: this.shellType,
            });
            this.op = apiSession.op;
            this.sessionId = apiSession.sessionId;
        });
    }
    removeAllListeners() {
        this.onOpen.removeAllListeners();
        this.onData.removeAllListeners();
        this.onClose.removeAllListeners();
    }
    send(msg) {
        if (this.isConnected) {
            console.log("msg", msg, " socket", this.socket);
            this.socket.send(msg);
        }
    }
    flush() {
        this.pendingCommands.forEach((msg) => this.send(msg.data));
        this.pendingCommands.length = 0;
    }
    parseMessage(data) {
        return data;
    }
    _onOpen(evt) {
        const data = { Op: this.op, sessionID: this.sessionId };
        this.onData.emit(welcome);
        // if (this.params.flushOnOpen) this.flush();
        this.readyState = WebSocketApiState.OPEN;
        this.writeLog("%cOPEN", "color:green;font-weight:bold;", evt);
        this.writeLog("data", data);
        this.send(JSON.stringify(data));
    }
    _onMessage(evt) {
        const data = JSON.parse(evt.data);
        this.writeLog("%cMESSAGE", "color:black;font-weight:bold;", data);
        this.onData.emit(data.Data);
        this.readyState = WebSocketApiState.CONNECTING;
    }
    _onError(evt) {
        this.writeLog("%cERROR", "color:red;font-weight:bold;", evt);
    }
    _onClose(evt) {
        const error = evt.type == "close" || !evt.wasClean;
        this.onClose.emit();
        this.onData.emit(evt.reason);
        this.readyState = WebSocketApiState.CLOSED;
        this.writeLog("%cCLOSE", `color:${error ? "red" : "black"};font-weight:bold;`, evt);
    }
    writeLog(...data) {
        if (this.params.logging) {
            console.log(...data);
        }
    }
}
WebSocketApi.defaultParams = {
    namespace: "",
    pod: "",
    container: "",
    autoConnect: true,
    logging: false,
    shellType: "",
    reconnectDelaySeconds: 10,
    pingIntervalSeconds: 0,
    flushOnOpen: true,
};
__decorate([
    observable,
    __metadata("design:type", Object)
], WebSocketApi.prototype, "readyState", void 0);
//# sourceMappingURL=websocket-api.js.map