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
import "./stepper.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class Stepper extends React.Component {
    render() {
        const _a = this.props, { className, steps } = _a, props = __rest(_a, ["className", "steps"]);
        const stepsCount = steps.length;
        let { step } = this.props;
        step = Math.min(Math.max(1, step), stepsCount);
        return (<div {...props} className={cssNames('Stepper flex auto', className)}>
        {steps.map(({ title }, i) => {
            const stepNumber = i + 1;
            const isLast = i === stepsCount - 1;
            const stepClass = {
                done: stepNumber < step,
                active: stepNumber === step
            };
            return (<div key={i} className={cssNames("box step", stepClass)}>
              {!isLast ? <span className="line"/> : null}
              <div className="point">{stepNumber}</div>
              <span className="step-title">{title}</span>
            </div>);
        })}
      </div>);
    }
}
//# sourceMappingURL=stepper.jsx.map