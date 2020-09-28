import { EventEmitter } from "../utils/eventEmitter";
export interface JsonApiData {
}
export interface JsonApiError {
    code?: number;
    message?: string;
    errors?: {
        id: string;
        title: string;
        status?: number;
    }[];
}
export interface JsonApiParams<D = any> {
    query?: {
        [param: string]: string | number | any;
    };
    data?: D;
}
export interface JsonApiLog {
    method: string;
    reqUrl: string;
    reqInit: RequestInit;
    data?: any;
    error?: any;
}
export interface JsonApiConfig {
    apiPrefix: string;
    debug?: boolean;
}
export declare class JsonApi<D = JsonApiData, P extends JsonApiParams = JsonApiParams> {
    protected config: JsonApiConfig;
    protected reqInit?: RequestInit;
    static reqInitDefault: RequestInit;
    static configDefault: Partial<JsonApiConfig>;
    constructor(config: JsonApiConfig, reqInit?: RequestInit);
    onData: EventEmitter<[D, Response]>;
    onError: EventEmitter<[JsonApiErrorParsed, Response]>;
    get<T = D>(path: string, params?: P, reqInit?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<T>;
    post<T = D>(path: string, params?: P, reqInit?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<T>;
    put<T = D>(path: string, params?: P, reqInit?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<T>;
    patch<T = D>(path: string, params?: P, reqInit?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<T>;
    del<T = D>(path: string, params?: P, reqInit?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<T>;
    protected request<D>(path: string, params?: P, init?: RequestInit): import("../utils/cancelableFetch").CancelablePromise<D>;
    protected parseResponse<D>(res: Response, log: JsonApiLog): Promise<D>;
    protected parseError(error: JsonApiError | string, res: Response): string[];
    protected writeLog(log: JsonApiLog): void;
}
export declare class JsonApiErrorParsed {
    private error;
    private messages;
    isUsedForNotification: boolean;
    constructor(error: JsonApiError | DOMException, messages: string[]);
    get isAborted(): boolean;
    toString(): string;
}
