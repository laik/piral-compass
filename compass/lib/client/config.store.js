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
// Client-side config
import { observable, when, action } from "mobx";
import { autobind, interval } from "./utils";
import { configApi } from "./api/endpoints/config.api";
const { IS_PRODUCTION, API_PREFIX, LOCAL_SERVER_PORT, BUILD_VERSION, } = process.env;
let ConfigStore = class ConfigStore {
    constructor() {
        this.isDevelopment = !IS_PRODUCTION;
        this.apiPrefix = API_PREFIX;
        this.buildVersion = BUILD_VERSION;
        // auto-update config
        this.updater = interval(5, this.load);
        this.config = {};
        this.isLoaded = false;
        // this.updater.start();
    }
    load() {
        this.updater.start();
        return configApi.getConfig().then((config) => {
            this.config = config;
            this.isLoaded = true;
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            yield when(() => this.isLoaded);
            return this.config.token;
        });
    }
    getConfigToken() {
        return this.config.token;
    }
    get serverPort() {
        const port = location.port;
        return port ? `:${port}` : "";
    }
    get allowedNamespaces() {
        return this.config.allowedNamespaces || [];
    }
    get userName() {
        return this.config.userName;
    }
    get isClusterAdmin() {
        return this.config.isClusterAdmin;
    }
    getDefaultNamespace() {
        return this.config.defaultNamespace != "" ? this.config.defaultNamespace : 'admin';
    }
    getOpsNamespace() {
        return this.getDefaultNamespace() + "-" + "ops";
    }
    getAllowedNamespaces() {
        return this.config.allowedNamespaces;
    }
    setConfig(res) {
        this.config = res;
    }
    reset() {
        this.isLoaded = false;
        this.config = {};
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], ConfigStore.prototype, "config", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ConfigStore.prototype, "isLoaded", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConfigStore.prototype, "setConfig", null);
ConfigStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], ConfigStore);
export { ConfigStore };
export const configStore = new ConfigStore();
//# sourceMappingURL=config.store.js.map