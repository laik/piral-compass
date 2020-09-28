// Base class for building all kubernetes apis
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import merge from "lodash/merge";
import { stringify } from "querystring";
import { KubeObject } from "./kube-object";
import { apiKube } from "./index";
import { kubeWatchApi } from "./kube-watch-api";
import { apiManager } from "./api-manager";
const attachUri = "/attach/";
export class KubeApi {
    constructor(options) {
        this.options = options;
        this.resourceVersions = new Map();
        const { kind, isNamespaced = false, objectConstructor = KubeObject, request = apiKube, } = options || {};
        const { apiBase, apiPrefix, apiGroup, apiVersion, apiVersionWithGroup, resource, } = KubeApi.parseApi(options.apiBase);
        this.kind = kind;
        this.isNamespaced = isNamespaced;
        this.apiBase = apiBase;
        this.apiPrefix = apiPrefix;
        this.apiGroup = apiGroup;
        this.apiVersion = apiVersion;
        this.apiVersionWithGroup = apiVersionWithGroup;
        this.apiResource = resource;
        this.request = request;
        this.objectConstructor = objectConstructor;
        this.parseResponse = this.parseResponse.bind(this);
        apiManager.registerApi(apiBase, this);
    }
    static parseApi(apiPath = "") {
        apiPath = new URL(apiPath, location.origin).pathname;
        const [, apiPrefix, apiGroup = "", apiVersion, namespace, resource, name] = apiPath.match(KubeApi.matcher) || [];
        const apiVersionWithGroup = [apiGroup, apiVersion]
            .filter((v) => v)
            .join("/");
        const apiBase = [apiPrefix, apiGroup, apiVersion, resource]
            .filter((v) => v)
            .join("/");
        return {
            apiBase,
            apiPrefix,
            apiGroup,
            apiVersion,
            apiVersionWithGroup,
            namespace,
            resource,
            name,
        };
    }
    static createLink(ref) {
        const { apiPrefix = "/apis", resource, apiVersion, name } = ref;
        let { namespace } = ref;
        if (namespace) {
            namespace = `namespaces/${namespace}`;
        }
        return [apiPrefix, apiVersion, namespace, resource, name]
            .filter((v) => !!v)
            .join("/");
    }
    static watchAll(...apis) {
        const disposers = apis.map((api) => api.watch());
        return () => disposers.forEach((unwatch) => unwatch());
    }
    setResourceVersion(namespace = "", newVersion) {
        this.resourceVersions.set(namespace, newVersion);
    }
    getResourceVersion(namespace = "") {
        return this.resourceVersions.get(namespace);
    }
    refreshResourceVersion(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.list(params, { limit: 1 });
        });
    }
    getPodSessionUrl({ namespace = "", pod = "", container = "", shellType = "", }) {
        if (namespace) {
            namespace = `namespace/${namespace}`;
        }
        if (pod) {
            pod = `pod/${pod}`;
        }
        if (container) {
            container = `container/${container}`;
        }
        return (attachUri +
            [namespace, pod, container, shellType].filter((v) => !!v).join("/"));
    }
    getUrl({ name = "", namespace = "" } = {}, query) {
        const { apiPrefix, apiVersionWithGroup, apiResource } = this;
        const resourcePath = KubeApi.createLink({
            apiPrefix: apiPrefix,
            apiVersion: apiVersionWithGroup,
            resource: apiResource,
            namespace: this.isNamespaced ? namespace : undefined,
            name: name,
        });
        return resourcePath + (query ? `?` + stringify(query) : "");
    }
    parseResponse(data, namespace) {
        const KubeObjectConstructor = this.objectConstructor;
        if (KubeObject.isJsonApiData(data)) {
            return new KubeObjectConstructor(data);
        }
        // process items list response
        else if (KubeObject.isJsonApiDataList(data)) {
            const { apiVersion, items, metadata } = data;
            this.setResourceVersion(namespace, metadata.resourceVersion);
            this.setResourceVersion("", metadata.resourceVersion);
            return items.map((item) => new KubeObjectConstructor(Object.assign({ kind: this.kind, apiVersion: apiVersion }, item)));
        }
        // custom apis might return array for list response, e.g. users, groups, etc.
        else if (Array.isArray(data)) {
            return data.map((data) => new KubeObjectConstructor(data));
        }
        else if (JSON.stringify(data).includes("Items")) {
            return [];
        }
        return data;
    }
    list({ namespace = "" } = {}, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request
                .get(this.getUrl({ namespace }), { query })
                .then((data) => this.parseResponse(data, namespace));
        });
    }
    get({ name = "", namespace = "default" } = {}, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request
                .get(this.getUrl({ namespace, name }), { query })
                .then(this.parseResponse);
        });
    }
    create({ name = "", namespace = "default", labels = new Map(), } = {}, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = this.getUrl({ namespace });
            return this.request
                .post(apiUrl, {
                data: merge({
                    kind: this.kind,
                    apiVersion: this.apiVersionWithGroup,
                    metadata: {
                        name,
                        namespace,
                        labels: Object.fromEntries(labels),
                    },
                }, data),
            })
                .then(this.parseResponse);
        });
    }
    update({ name = "", namespace = "default" } = {}, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = this.getUrl({ namespace, name });
            return this.request.put(apiUrl, { data }).then(this.parseResponse);
        });
    }
    delete({ name = "", namespace = "default" }) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = this.getUrl({ namespace, name });
            return this.request.del(apiUrl);
        });
    }
    getWatchUrl(namespace = "", query = {}) {
        return this.getUrl({ namespace }, Object.assign({ watch: 1, resourceVersion: this.getResourceVersion(namespace) }, query));
    }
    watch() {
        return kubeWatchApi.subscribe(this);
    }
}
KubeApi.matcher = /(\/apis?.*?)\/(?:(.*?)\/)?(v.*?)(?:\/namespaces\/(.+?))?\/([^\/]+)(?:\/([^\/?]+))?.*$/;
export function lookupApiLink(ref, parentObject) {
    const { kind, apiVersion, name, namespace = parentObject.getNs() } = ref;
    // search in registered apis by 'kind' & 'apiVersion'
    const api = apiManager.getApi((api) => api.kind === kind && api.apiVersionWithGroup == apiVersion);
    if (api) {
        return api.getUrl({ namespace, name });
    }
    // lookup api by generated resource link
    const apiPrefixes = ["/apis", "/api"];
    const resource = kind.toLowerCase() + kind.endsWith("s") ? "es" : "s";
    for (const apiPrefix of apiPrefixes) {
        const apiLink = KubeApi.createLink({
            apiPrefix,
            apiVersion,
            name,
            namespace,
            resource,
        });
        if (apiManager.getApi(apiLink)) {
            return apiLink;
        }
    }
    // resolve by kind only (hpa's might use refs to older versions of resources for example)
    const apiByKind = apiManager.getApi((api) => api.kind === kind);
    if (apiByKind) {
        return apiByKind.getUrl({ name, namespace });
    }
    // otherwise generate link with default prefix
    // resource still might exists in k8s, but api is not registered in the app
    return KubeApi.createLink({ apiVersion, name, namespace, resource });
}
//# sourceMappingURL=kube-api.js.map