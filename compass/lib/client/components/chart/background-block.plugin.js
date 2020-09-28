import get from "lodash/get";
const defaultOptions = {
    interval: 61,
    coverBars: 3,
    borderColor: "#44474A",
    backgroundColor: "#00000033"
};
export const BackgroundBlock = {
    options: {},
    getOptions(chart) {
        return get(chart, "options.plugins.BackgroundBlock");
    },
    afterInit(chart) {
        this.options = Object.assign(Object.assign({}, defaultOptions), this.getOptions(chart));
    },
    beforeDraw(chart) {
        if (!chart.chartArea)
            return;
        const { interval, coverBars, borderColor, backgroundColor } = this.options;
        const { ctx, chartArea } = chart;
        const { left, right, top, bottom } = chartArea;
        const blockWidth = (right - left) / interval * coverBars;
        ctx.save();
        ctx.fillStyle = backgroundColor;
        ctx.strokeStyle = borderColor;
        ctx.fillRect(right - blockWidth, top, blockWidth, bottom - top);
        ctx.beginPath();
        ctx.moveTo(right - blockWidth + 1.5, top);
        ctx.lineTo(right - blockWidth + 1.5, bottom);
        ctx.stroke();
        ctx.restore();
    }
};
//# sourceMappingURL=background-block.plugin.js.map