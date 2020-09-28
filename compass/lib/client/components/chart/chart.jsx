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
import "./chart.scss";
import React, { createRef, PureComponent } from "react";
import isEqual from "lodash/isEqual";
import remove from "lodash/remove";
import * as ChartJS from "chart.js";
// import { ChartData as ChartDataOrig, ChartDataSets, ChartOptions } from "chart.js";
import { StatusBrick } from "../status-brick";
import { cssNames } from "../../utils";
import { Badge } from "../badge";
export var ChartKind;
(function (ChartKind) {
    ChartKind["PIE"] = "pie";
    ChartKind["BAR"] = "bar";
    ChartKind["LINE"] = "line";
    ChartKind["DOUGHNUT"] = "doughnut";
})(ChartKind || (ChartKind = {}));
const defaultProps = {
    type: ChartKind.DOUGHNUT,
    options: {},
    showChart: true,
    showLegend: true,
    legendPosition: "bottom",
    plugins: [],
    redraw: false
};
export class Chart extends PureComponent {
    constructor() {
        super(...arguments);
        this.canvas = createRef();
    }
    componentDidMount() {
        const { showChart } = this.props;
        if (!showChart)
            return;
        this.renderChart();
    }
    componentDidUpdate(prevProps) {
        const { data, showChart, redraw } = this.props;
        if (redraw) {
            this.chart.destroy();
            this.renderChart();
            return;
        }
        if (!isEqual(prevProps.data, data) && showChart) {
            if (!this.chart)
                this.renderChart();
            else
                this.updateChart();
        }
    }
    memoizeDataProps() {
        const { data } = this.props;
        this.currentChartData = Object.assign(Object.assign({}, data), { datasets: data.datasets && data.datasets.map(set => {
                return Object.assign({}, set);
            }) });
    }
    updateChart() {
        const { options } = this.props;
        if (!this.chart)
            return;
        this.chart.options = ChartJS.helpers.configMerge(this.chart.options, options);
        this.memoizeDataProps();
        // const datasets: ChartDataSet[] = this.chart.config.data.datasets
        // const nextDatasets: ChartDataSet[] = this.currentChartData.datasets || []
        const datasets = this.chart.config.data.datasets;
        const nextDatasets = this.currentChartData.datasets || [];
        // Remove stale datasets if they're not available in nextDatasets
        if (datasets.length > nextDatasets.length) {
            const sets = [...datasets];
            sets.forEach(set => {
                if (!nextDatasets.find(next => next.id === set.id)) {
                    remove(datasets, (item => item.id === set.id));
                }
            });
        }
        // Mutating inner chart datasets to enable seamless transitions
        nextDatasets.forEach((next, datasetIndex) => {
            const index = datasets.findIndex(set => set.id === next.id);
            if (index !== -1) {
                datasets[index].data = datasets[index].data.slice(); // "Clean" mobx observables data to use in ChartJS
                datasets[index].data.splice(next.data.length);
                next.data.forEach((point, dataIndex) => {
                    datasets[index].data[dataIndex] = next.data[dataIndex];
                });
                // Merge other fields
                const { data } = next, props = __rest(next, ["data"]);
                datasets[index] = Object.assign(Object.assign({}, datasets[index]), props);
            }
            else {
                datasets[datasetIndex] = next;
            }
        });
        this.chart.update();
    }
    renderLegend() {
        if (!this.props.showLegend)
            return null;
        const { data, legendColors } = this.props;
        const { labels, datasets } = data;
        const labelElem = (title, color, tooltip) => (<Badge key={title} className="flex gaps align-center" label={(<div>
            <StatusBrick style={{ backgroundColor: color }}/>
            <span>{title}</span>
          </div>)} tooltip={tooltip}/>);
        return (<div className="legend flex wrap gaps">
        {labels && labels.map((label, index) => {
            const { backgroundColor } = datasets[0];
            const color = legendColors ? legendColors[index] : backgroundColor[index];
            return labelElem(label, color);
        })}
        {!labels && datasets.map(({ borderColor, label, tooltip }) => labelElem(label, borderColor, tooltip))}
      </div>);
    }
    renderChart() {
        const { type, options, plugins } = this.props;
        this.memoizeDataProps();
        this.chart = new ChartJS(this.canvas.current, {
            type,
            plugins,
            options: Object.assign(Object.assign({}, options), { legend: {
                    display: false
                } }),
            data: this.currentChartData,
        });
    }
    render() {
        const { width, height, showChart, title, className } = this.props;
        return (<>
        <div className={cssNames("Chart", className)}>
          {title && <div className="chart-title">{title}</div>}
          {showChart &&
            <div className="chart-container">
            <canvas ref={this.canvas} width={width} height={height}/>
            <div className="chartjs-tooltip flex column"></div>
          </div>}
          {this.renderLegend()}
        </div>
      </>);
    }
}
Chart.defaultProps = defaultProps;
//# sourceMappingURL=chart.jsx.map