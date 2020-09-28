// Tooltip decorator for simple composition with other components
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
import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { Tooltip } from "./tooltip";
import { isReactNode } from "../../utils/isReactNode";
import uniqueId from "lodash/uniqueId";
export function withTooltip(Target) {
    var _a;
    const DecoratedComponent = (_a = class extends React.Component {
            constructor() {
                super(...arguments);
                this.tooltipId = uniqueId("tooltip_target_");
            }
            render() {
                const _a = this.props, { tooltip } = _a, targetProps = __rest(_a, ["tooltip"]);
                if (tooltip) {
                    const tooltipId = targetProps.id || this.tooltipId;
                    const tooltipProps = Object.assign({ htmlFor: tooltipId, following: true }, (isReactNode(tooltip) ? { children: tooltip } : tooltip));
                    if (!tooltipProps.following) {
                        targetProps.style = Object.assign({ position: "relative" }, (targetProps.style || {}));
                    }
                    targetProps.id = tooltipId;
                    targetProps.children = (<>
            {targetProps.children}
            <Tooltip {...tooltipProps}/>
          </>);
                }
                return <Target {...targetProps}/>;
            }
        },
        _a.displayName = `withTooltip(${Target.displayName || Target.name})`,
        _a);
    return hoistNonReactStatics(DecoratedComponent, Target);
}
//# sourceMappingURL=withTooltip.jsx.map