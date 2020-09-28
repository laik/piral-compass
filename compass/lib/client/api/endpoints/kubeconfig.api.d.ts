export declare const kubeConfigApi: {
    getUserConfig(): import("../../utils/cancelableFetch").CancelablePromise<import("../json-api").JsonApiData>;
    getServiceAccountConfig(account: string, namespace: string): import("../../utils/cancelableFetch").CancelablePromise<import("../json-api").JsonApiData>;
};
