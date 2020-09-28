var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// Base http-service / json-api class
import store from 'store';
import { stringify } from "querystring";
import { EventEmitter } from "../utils/eventEmitter";
import { cancelableFetch } from "../utils/cancelableFetch";
export class JsonApi {
    constructor(config, reqInit) {
        this.config = config;
        this.reqInit = reqInit;
        this.onData = new EventEmitter();
        this.onError = new EventEmitter();
        this.config = Object.assign({}, JsonApi.configDefault, config);
        this.reqInit = Object.assign({}, JsonApi.reqInitDefault, reqInit);
        this.parseResponse = this.parseResponse.bind(this);
    }
    get(path, params, reqInit = {}) {
        const userConfig = store.get('u_config');
        const token = userConfig.token;
        if (!token)
            return;
        let reqConfig = Object.assign(Object.assign({}, reqInit), { method: "get", headers: { Authorization: token } });
        return this.request(path, params, Object.assign({}, reqConfig));
    }
    post(path, params, reqInit = {}) {
        const userConfig = store.get('u_config');
        const token = userConfig.token;
        if (!token)
            return;
        let reqConfig = Object.assign(Object.assign({}, reqInit), { method: "post", headers: { Authorization: token } });
        return this.request(path, params, Object.assign({}, reqConfig));
    }
    put(path, params, reqInit = {}) {
        const userConfig = store.get('u_config');
        const token = userConfig.token;
        if (!token)
            return;
        let reqConfig = Object.assign(Object.assign({}, reqInit), { method: "put", headers: { Authorization: token } });
        return this.request(path, params, Object.assign({}, reqConfig));
    }
    patch(path, params, reqInit = {}) {
        const userConfig = store.get('u_config');
        const token = userConfig.token;
        if (!token)
            return;
        let reqConfig = Object.assign(Object.assign({}, reqInit), { method: "patch", headers: { Authorization: token } });
        return this.request(path, params, Object.assign({}, reqConfig));
    }
    del(path, params, reqInit = {}) {
        const userConfig = store.get('u_config');
        const token = userConfig.token;
        if (!token)
            return;
        let reqConfig = Object.assign(Object.assign({}, reqInit), { method: "delete", headers: { Authorization: token } });
        return this.request(path, params, Object.assign({}, reqConfig));
    }
    request(path, params, init = {}) {
        let reqUrl = this.config.apiPrefix + path;
        const reqInit = Object.assign(Object.assign({}, this.reqInit), init);
        const { data, query } = params || {};
        if (data && !reqInit.body) {
            reqInit.body = JSON.stringify(data);
        }
        if (query) {
            const queryString = stringify(query);
            reqUrl += (reqUrl.includes("?") ? "&" : "?") + queryString;
        }
        const infoLog = {
            method: reqInit.method.toUpperCase(),
            reqUrl: reqUrl,
            reqInit: reqInit,
        };
        return cancelableFetch(reqUrl, reqInit).then(res => {
            return this.parseResponse(res, infoLog);
        });
    }
    parseResponse(res, log) {
        const { status } = res;
        return res.text().then(text => {
            let data;
            try {
                data = text ? JSON.parse(text) : ""; // DELETE-requests might not have response-body
            }
            catch (e) {
                data = text;
            }
            if (status >= 200 && status < 300) {
                this.onData.emit(data, res);
                this.writeLog(Object.assign(Object.assign({}, log), { data }));
                return data;
            }
            else {
                const error = new JsonApiErrorParsed(data, this.parseError(data, res));
                this.onError.emit(error, res);
                this.writeLog(Object.assign(Object.assign({}, log), { error }));
                throw error;
            }
        });
    }
    parseError(error, res) {
        if (typeof error === "string") {
            return [error];
        }
        else if (Array.isArray(error.errors)) {
            return error.errors.map(error => error.title);
        }
        else if (error.message) {
            return [error.message];
        }
        return [res.statusText || "Error!"];
    }
    writeLog(log) {
        if (!this.config.debug)
            return;
        const { method, reqUrl } = log, params = __rest(log, ["method", "reqUrl"]);
        let textStyle = 'font-weight: bold;';
        if (params.data)
            textStyle += 'background: green; color: white;';
        if (params.error)
            textStyle += 'background: red; color: white;';
        console.log(`%c${method} ${reqUrl}`, textStyle, params);
    }
}
JsonApi.reqInitDefault = {
    headers: {
        'content-type': 'application/json'
    }
};
JsonApi.configDefault = {
    debug: false
};
export class JsonApiErrorParsed {
    constructor(error, messages) {
        this.error = error;
        this.messages = messages;
        this.isUsedForNotification = false;
    }
    get isAborted() {
        return this.error.code === DOMException.ABORT_ERR;
    }
    toString() {
        return this.messages.join("\n");
    }
}
//# sourceMappingURL=json-api.js.map