var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import "./pie-chart.scss";
import * as React from "react";
import * as ChartJS from "chart.js";
import { Chart } from "./chart";
import { cssNames } from "../../utils";
import { themeStore } from "../../theme.store";
export class PieChart extends React.Component {
    render() {
        const _a = this.props, { data, className, options } = _a, settings = __rest(_a, ["data", "className", "options"]);
        const { contentColor } = themeStore.activeTheme.colors;
        const cutouts = [88, 76, 63];
        const opts = this.props.showChart === false ? {} : Object.assign({ maintainAspectRatio: false, tooltips: {
                mode: "index",
                callbacks: {
                    title: () => "",
                    label: (tooltipItem, data) => {
                        const dataset = data["datasets"][tooltipItem.datasetIndex];
                        const metaData = Object.values(dataset["_meta"])[0];
                        const percent = Math.round((dataset["data"][tooltipItem["index"]] / metaData.total) * 100);
                        if (isNaN(percent))
                            return "N/A";
                        return percent + "%";
                    },
                },
                filter: ({ datasetIndex, index }, { datasets }) => {
                    const { data } = datasets[datasetIndex];
                    if (datasets.length === 1)
                        return true;
                    return index !== data.length - 1;
                },
                position: "cursor",
            }, elements: {
                arc: {
                    borderWidth: 1,
                    borderColor: contentColor
                },
            }, cutoutPercentage: cutouts[data.datasets.length - 1] || 50, responsive: true }, options);
        return (<Chart className={cssNames("PieChart flex column align-center", className)} data={data} options={opts} {...settings}/>);
    }
}
ChartJS.Tooltip.positioners.cursor = function (elements, position) {
    return position;
};
//# sourceMappingURL=pie-chart.jsx.map