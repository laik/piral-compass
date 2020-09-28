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
// Kubernetes watch-api consumer
import store from 'store';
import { computed, observable, reaction } from "mobx";
import { stringify } from "querystring";
import { autobind, EventEmitter, interval } from "../utils";
import { KubeApi } from "./kube-api";
import { configStore } from "../config.store";
import { apiManager } from "./api-manager";
const obj = require('event-source-polyfill/src/eventsource.min.js');
let EventSource = obj.EventSourcePolyfill;
let KubeWatchApi = class KubeWatchApi {
    constructor() {
        this.onData = new EventEmitter();
        this.apiUrl = configStore.apiPrefix.BASE + "/watch";
        this.subscribers = observable.map();
        this.reconnectInterval = interval(60 * 5, this.reconnect); // background reconnect every 5min
        this.reconnectTimeoutMs = 5000;
        this.maxReconnectsOnError = 10;
        this.reconnectAttempts = this.maxReconnectsOnError;
        reaction(() => this.activeApis, () => this.connect(), {
            fireImmediately: true,
            delay: 500,
        });
    }
    get activeApis() {
        return Array.from(this.subscribers.keys());
    }
    getSubscribersCount(api) {
        return this.subscribers.get(api) || 0;
    }
    subscribe(...apis) {
        apis.forEach(api => {
            this.subscribers.set(api, this.getSubscribersCount(api) + 1);
        });
        return () => apis.forEach(api => {
            const count = this.getSubscribersCount(api) - 1;
            if (count <= 0)
                this.subscribers.delete(api);
            else
                this.subscribers.set(api, count);
        });
    }
    getQuery() {
        const { isClusterAdmin, allowedNamespaces } = configStore;
        return {
            api: this.activeApis.map(api => {
                if (isClusterAdmin)
                    return api.getWatchUrl();
                return allowedNamespaces.map(namespace => api.getWatchUrl(namespace));
            }).flat()
        };
    }
    // todo: maybe switch to websocket to avoid often reconnects
    connect() {
        if (this.evtSource)
            this.disconnect(); // close previous connection
        if (!this.activeApis.length) {
            return;
        }
        const query = this.getQuery();
        const apiUrl = this.apiUrl + "?" + stringify(query);
        const userConfig = store.get('u_config');
        this.evtSource = new EventSource(apiUrl, {
            headers: {
                "Authorization": userConfig.token
            }
        });
        this.evtSource.onmessage = this.onMessage;
        this.evtSource.onerror = this.onError;
        this.writeLog("CONNECTING", query.api);
    }
    reconnect() {
        if (!this.evtSource || this.evtSource.readyState !== EventSource.OPEN) {
            this.reconnectAttempts = this.maxReconnectsOnError;
            this.connect();
        }
    }
    disconnect() {
        if (!this.evtSource)
            return;
        this.evtSource.close();
        this.evtSource.onmessage = null;
        this.evtSource = null;
    }
    onMessage(evt) {
        if (!evt.data)
            return;
        let data = JSON.parse(evt.data);
        if (data.object) {
            this.onData.emit(data);
        }
        else {
            this.onRouteEvent(data);
        }
    }
    onRouteEvent({ type, url }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "STREAM_END") {
                this.disconnect();
                const { apiBase, namespace } = KubeApi.parseApi(url);
                const api = apiManager.getApi(apiBase);
                if (api) {
                    yield api.refreshResourceVersion({ namespace });
                    this.reconnect();
                }
            }
        });
    }
    onError(evt) {
        const { reconnectAttempts: attemptsRemain, reconnectTimeoutMs } = this;
        if (evt.eventPhase === EventSource.CLOSED) {
            if (attemptsRemain > 0) {
                this.reconnectAttempts--;
                setTimeout(() => this.connect(), reconnectTimeoutMs);
            }
        }
    }
    writeLog(...data) {
        if (configStore.isDevelopment) {
            console.log('%cKUBE-WATCH-API:', `font-weight: bold`, ...data);
        }
    }
    addListener(store, callback) {
        const listener = (evt) => {
            const { selfLink, namespace, resourceVersion } = evt.object.metadata;
            const api = apiManager.getApi(selfLink);
            api.setResourceVersion(namespace, resourceVersion);
            api.setResourceVersion("", resourceVersion);
            if (store == apiManager.getStore(api)) {
                callback(evt);
            }
        };
        this.onData.addListener(listener);
        return () => this.onData.removeListener(listener);
    }
    reset() {
        this.subscribers.clear();
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], KubeWatchApi.prototype, "activeApis", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KubeWatchApi.prototype, "connect", null);
KubeWatchApi = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], KubeWatchApi);
export { KubeWatchApi };
export const kubeWatchApi = new KubeWatchApi();
//# sourceMappingURL=kube-watch-api.js.map