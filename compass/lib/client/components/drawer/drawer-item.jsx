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
import "./drawer-item.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class DrawerItem extends React.Component {
    render() {
        const _a = this.props, { name, title, labelsOnly, children, hidden } = _a, elemProps = __rest(_a, ["name", "title", "labelsOnly", "children", "hidden"]);
        let { className } = this.props;
        if (hidden)
            return null;
        className = cssNames("DrawerItem", className, { labelsOnly });
        return (<div {...elemProps} className={className} title={title}>
        <span className="name">{name}</span>
        <span className="value">{children}</span>
      </div>);
    }
}
//# sourceMappingURL=drawer-item.jsx.map