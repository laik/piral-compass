// Metrics api
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import moment from "moment";
import { apiBase } from "../index";
export const metricsApi = {
    getMetrics(query, reqParams = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { range = 3600, step = 60, namespace } = reqParams;
            let { start, end } = reqParams;
            if (!start && !end) {
                const timeNow = Date.now() / 1000;
                const now = moment.unix(timeNow).startOf('minute').unix(); // round date to minutes
                start = now - range;
                end = now;
            }
            return apiBase.post("/metrics", {
                data: query,
                query: {
                    start, end, step,
                    "kubernetes_namespace": namespace,
                }
            });
        });
    },
};
export function normalizeMetrics(metrics, frames = 60) {
    const { result } = metrics.data;
    if (result.length) {
        if (frames > 0) {
            // fill the gaps
            result.forEach(res => {
                if (!res.values || !res.values.length)
                    return;
                while (res.values.length < frames) {
                    const timestamp = moment.unix(res.values[0][0]).subtract(1, "minute").unix();
                    res.values.unshift([timestamp, "0"]);
                }
            });
        }
    }
    else {
        // always return at least empty values array
        result.push({
            metric: {},
            values: []
        });
    }
    return metrics;
}
export function isMetricsEmpty(metrics) {
    return Object.values(metrics).every(metric => !metric.data.result.length);
}
export function getItemMetrics(metrics, itemName) {
    if (!metrics)
        return;
    const itemMetrics = Object.assign({}, metrics);
    for (const metric in metrics) {
        const results = metrics[metric].data.result;
        const result = results.find(res => Object.values(res.metric)[0] == itemName);
        itemMetrics[metric].data.result = result ? [result] : [];
    }
    return itemMetrics;
}
export function getMetricLastPoints(metrics) {
    const result = {};
    if (!metrics) {
        return result;
    }
    Object.keys(metrics).forEach(metricName => {
        try {
            const metric = metrics[metricName];
            if (metric.data.result.length) {
                result[metricName] = +metric.data.result[0].values.slice(-1)[0][1];
            }
        }
        catch (e) {
        }
        return result;
    }, {});
    return result;
}
//# sourceMappingURL=metrics.api.js.map