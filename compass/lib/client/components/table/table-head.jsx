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
import "./table-head.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class TableHead extends React.Component {
    render() {
        const _a = this.props, { className, sticky, nowrap, showTopLine, children } = _a, headProps = __rest(_a, ["className", "sticky", "nowrap", "showTopLine", "children"]);
        const classNames = cssNames("TableHead", className, {
            sticky, nowrap,
            topLine: showTopLine,
        });
        return (<div className={classNames} {...headProps}>
        {children}
      </div>);
    }
}
TableHead.defaultProps = {
    sticky: true,
};
//# sourceMappingURL=table-head.jsx.map