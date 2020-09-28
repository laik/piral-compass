import { JsonApi } from "./json-api";
import { KubeJsonApi } from "./kube-json-api";
export declare const apiBase: JsonApi<import("./json-api").JsonApiData, import("./json-api").JsonApiParams<any>>;
export declare const apiPermission: JsonApi<import("./json-api").JsonApiData, import("./json-api").JsonApiParams<any>>;
export declare const apiTenant: KubeJsonApi;
export declare const apiKube: KubeJsonApi;
export declare const apiKubeUsers: KubeJsonApi;
export declare const apiKubeHelm: KubeJsonApi;
export declare const apiKubeResourceApplier: KubeJsonApi;
