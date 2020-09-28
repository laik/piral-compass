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
import { autobind, base64, EventEmitter } from "../utils";
import { WebSocketApi } from "./websocket-api";
import { configStore } from "../config.store";
import isEqual from "lodash/isEqual";
// tslint:disable-next-line:no-any
export var TerminalChannels;
(function (TerminalChannels) {
    TerminalChannels[TerminalChannels["STDIN"] = 1] = "STDIN";
    TerminalChannels[TerminalChannels["STDOUT"] = 2] = "STDOUT";
    TerminalChannels[TerminalChannels["TERMINAL_SIZE"] = 3] = "TERMINAL_SIZE";
    TerminalChannels[TerminalChannels["TOAST"] = 4] = "TOAST";
    TerminalChannels[TerminalChannels["INEXIT"] = 5] = "INEXIT";
    TerminalChannels[TerminalChannels["OUTEXIT"] = 6] = "OUTEXIT";
})(TerminalChannels || (TerminalChannels = {}));
var TerminalColor;
(function (TerminalColor) {
    TerminalColor["RED"] = "\u001B[31m";
    TerminalColor["GREEN"] = "\u001B[32m";
    TerminalColor["YELLOW"] = "\u001B[33m";
    TerminalColor["BLUE"] = "\u001B[34m";
    TerminalColor["MAGENTA"] = "\u001B[35m";
    TerminalColor["CYAN"] = "\u001B[36m";
    TerminalColor["GRAY"] = "\u001B[90m";
    TerminalColor["LIGHT_GRAY"] = "\u001B[37m";
    TerminalColor["NO_COLOR"] = "\u001B[0m";
})(TerminalColor || (TerminalColor = {}));
export class TerminalApi extends WebSocketApi {
    constructor(options) {
        super({
            namespace: options.namespace,
            pod: options.pod,
            container: options.container,
            shellType: options.shellType,
            logging: configStore.isDevelopment,
            autoConnect: true,
            flushOnOpen: false,
            pingIntervalSeconds: 30,
        });
        this.options = options;
        // protected tokenInterval = interval(60, this.sendNewToken); // refresh every minute
        this.onReady = new EventEmitter();
        this.isReady = false;
        setTimeout(() => {
            const dataObj = {
                Data: "export COLUMNS=1000000000 && export TERM=xterm" + "\r",
            };
            this.sendCommand(dataObj);
        }, 5000);
    }
    getUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            const { hostname, protocol } = location;
            const wss = `http${protocol === "https:" ? "s" : ""}://`;
            console.log(`${wss}${hostname}${configStore.serverPort}/workload/shell/pod`);
            return `${wss}${hostname}${configStore.serverPort}/workload/shell/pod`;
        });
    }
    connect() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = yield this.getUrl();
            const { colorTheme } = this.options;
            this.emitStatus("Connecting terminal.....", {
                color: colorTheme == "light" ? TerminalColor.GRAY : TerminalColor.LIGHT_GRAY,
            });
            this.onData.addListener(this._onReady, { prepend: true });
            return _super.connect.call(this, apiUrl);
        });
    }
    destroy() {
        if (!this.socket)
            return;
        const exitCode = String.fromCharCode(4); // ctrl+d
        const dataObj = { Data: exitCode };
        this.sendCommand(dataObj, TerminalChannels.INEXIT);
        setTimeout(() => super.destroy(), 2000);
    }
    removeAllListeners() {
        super.removeAllListeners();
        this.onReady.removeAllListeners();
    }
    _onReady(data) {
        if (!data)
            return;
        this.isReady = true;
        this.onReady.emit();
        this.onData.removeListener(this._onReady);
        // this.flush();
        this.onData.emit(data); // re-emit data
        return false; // prevent calling rest of listeners
    }
    reconnect() {
        const { reconnectDelaySeconds } = this.params;
        super.reconnect();
    }
    sendCommand(dataObj, channel = TerminalChannels.STDIN) {
        // this.onData.emit(dataObj)
        dataObj.Op = channel;
        const msg = JSON.stringify(dataObj);
        return this.send(msg);
    }
    sendTerminalSize(cols, rows) {
        const newSize = { Width: cols, Height: rows };
        if (!isEqual(this.size, newSize)) {
            this.sendCommand(newSize, TerminalChannels.TERMINAL_SIZE);
            this.size = newSize;
        }
    }
    parseMessage(data) {
        data = data.substr(1); // skip channel
        return base64.decode(data);
    }
    _onOpen(evt) {
        // Client should send terminal size in special channel 4,
        // But this size will be changed by terminal.fit()
        this.sendTerminalSize(120, 80);
        super._onOpen(evt);
    }
    _onClose(evt) {
        super._onClose(evt);
        this.isReady = false;
    }
    emitStatus(data, options = {}) {
        const { color, showTime } = options;
        if (color) {
            data = `${color}${data}${TerminalColor.NO_COLOR}`;
        }
        let time;
        if (showTime) {
            time = new Date().toLocaleString() + " ";
        }
        this.onData.emit(`${showTime ? time : ""}${data}\r\n`);
    }
    emitError(error) {
        this.emitStatus(error, {
            color: TerminalColor.RED,
        });
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TerminalApi.prototype, "_onReady", null);
//# sourceMappingURL=terminal-api.js.map