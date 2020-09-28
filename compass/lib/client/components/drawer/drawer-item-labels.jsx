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
import { DrawerItem } from "./drawer-item";
import { Badge } from "../badge";
export function DrawerItemLabels(props) {
    const { labels } = props, itemProps = __rest(props, ["labels"]);
    if (!labels || !labels.length) {
        return null;
    }
    return (<DrawerItem {...itemProps} labelsOnly>
      {labels.map(label => <Badge key={label} label={label} title={label}/>)}
    </DrawerItem>);
}
//# sourceMappingURL=drawer-item-labels.jsx.map