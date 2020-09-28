import { IConfig } from "../../../server/common/config";
export declare const configApi: {
    getConfig(): import("../../utils/cancelableFetch").CancelablePromise<IConfig>;
};
