import { IMetricsQuery } from "../../../server/common/metrics";
export interface IMetrics {
    status: string;
    data: {
        resultType: string;
        result: IMetricsResult[];
    };
}
export interface IMetricsResult {
    metric: {
        [name: string]: string;
        instance: string;
        node?: string;
        pod?: string;
        kubernetes?: string;
        kubernetes_node?: string;
        kubernetes_namespace?: string;
    };
    values: [number, string][];
}
export interface IMetricsReqParams {
    start?: number | string;
    end?: number | string;
    step?: number;
    range?: number;
    namespace?: string;
}
export declare const metricsApi: {
    getMetrics<T = IMetricsQuery>(query: T, reqParams?: IMetricsReqParams): Promise<T extends object ? { [K in keyof T]: IMetrics; } : IMetrics>;
};
export declare function normalizeMetrics(metrics: IMetrics, frames?: number): IMetrics;
export declare function isMetricsEmpty(metrics: {
    [key: string]: IMetrics;
}): boolean;
export declare function getItemMetrics(metrics: {
    [key: string]: IMetrics;
}, itemName: string): {
    [x: string]: IMetrics;
};
export declare function getMetricLastPoints(metrics: {
    [key: string]: IMetrics;
}): Partial<{
    [metric: string]: number;
}>;
