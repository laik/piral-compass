declare type IMetricValues = [number, string][];
declare type IChartData = {
    x: number;
    y: string;
}[];
export declare function useRealTimeMetrics(metrics: IMetricValues, chartData: IChartData, params?: {
    fetchInterval: number;
    updateInterval: number;
}): {
    x: number;
    y: string;
}[];
export {};
