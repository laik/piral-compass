import { default as ChartJS } from "chart.js";
import moment from "moment";
export declare const ZebraStripes: {
    updated: moment.Moment;
    options: {};
    getOptions(chart: ChartJS): any;
    getLastUpdate(chart: ChartJS): moment.Moment;
    getStripesElem(chart: ChartJS): Element;
    removeStripesElem(chart: ChartJS): void;
    renderStripes(chart: ChartJS): void;
    afterInit(chart: ChartJS): void;
    afterUpdate(chart: ChartJS): void;
    resize(chart: ChartJS): void;
    afterDatasetUpdate(chart: ChartJS): void;
};
