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
import { Icon } from "../icon";
import { FilterType } from "./page-filters.store";
export function FilterIcon(props) {
    const { type } = props, iconProps = __rest(props, ["type"]);
    switch (type) {
        case FilterType.NAMESPACE:
            return <Icon small material="layers" {...iconProps}/>;
        case FilterType.SEARCH:
            return <Icon small material="search" {...iconProps}/>;
        default:
            return <Icon small material="filter_list" {...iconProps}/>;
    }
}
//# sourceMappingURL=filter-icon.jsx.map