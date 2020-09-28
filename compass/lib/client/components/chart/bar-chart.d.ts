/// <reference types="react" />
import { ChartProps } from "./chart";
import { ChartOptions } from "chart.js";
interface Props extends ChartProps {
    name?: string;
    title?: string;
    timeLabelStep?: number;
}
export declare function BarChart(props: Props): JSX.Element;
export declare namespace BarChart {
    var defaultProps: Partial<Props>;
}
export declare const memoryOptions: ChartOptions;
export declare const cpuOptions: ChartOptions;
export {};
