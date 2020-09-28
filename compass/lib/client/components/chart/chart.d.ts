import "./chart.scss";
import { PureComponent } from "react";
import * as ChartJS from "chart.js";
export interface ChartData extends ChartJS.ChartData {
    datasets?: ChartDataSets[];
}
export interface ChartDataSets extends ChartJS.ChartDataSets {
    id?: string;
    tooltip?: string;
}
export interface ChartProps {
    data: ChartData;
    options?: ChartJS.ChartOptions;
    width?: number | string;
    height?: number | string;
    type?: ChartKind;
    showChart?: boolean;
    showLegend?: boolean;
    legendPosition?: "bottom";
    legendColors?: string[];
    plugins?: any[];
    redraw?: boolean;
    title?: string;
    className?: string;
}
export declare enum ChartKind {
    PIE = "pie",
    BAR = "bar",
    LINE = "line",
    DOUGHNUT = "doughnut"
}
export declare class Chart extends PureComponent<ChartProps> {
    static defaultProps: object;
    private canvas;
    private chart;
    private currentChartData;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ChartProps): void;
    memoizeDataProps(): void;
    updateChart(): void;
    renderLegend(): JSX.Element;
    renderChart(): void;
    render(): JSX.Element;
}
