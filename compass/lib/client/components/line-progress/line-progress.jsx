var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import "./line-progress.scss";
import * as React from "react";
import { cssNames } from "../../utils";
import { withTooltip } from "../tooltip";
let LineProgress = class LineProgress extends React.PureComponent {
    render() {
        const _a = this.props, { className, min, max, value, precise, children } = _a, props = __rest(_a, ["className", "min", "max", "value", "precise", "children"]);
        let valuePercents = Math.min(100, value / (max - min) * 100);
        const valuePercentsRounded = +valuePercents.toFixed(precise);
        if (valuePercentsRounded) {
            valuePercents = valuePercentsRounded;
        }
        return (<div className={cssNames("LineProgress", className)} {...props}>
        <div className="line" style={{ width: valuePercents + "%" }}></div>
        {children}
      </div>);
    }
};
LineProgress.defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    precise: 2,
};
LineProgress = __decorate([
    withTooltip
], LineProgress);
export { LineProgress };
//# sourceMappingURL=line-progress.jsx.map