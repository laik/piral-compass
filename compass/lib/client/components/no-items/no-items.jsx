import "./no-items.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export function NoItems(props) {
    const { className, children } = props;
    return (<div className={cssNames("NoItems flex box grow", className)}>
      <div className="box center">
        {children || `Item list is empty`}
      </div>
    </div>);
}
//# sourceMappingURL=no-items.jsx.map