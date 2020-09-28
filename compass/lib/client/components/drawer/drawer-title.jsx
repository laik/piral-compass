import "./drawer-title.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class DrawerTitle extends React.Component {
    render() {
        const { title, children, className } = this.props;
        return (<div className={cssNames("DrawerTitle", className)}>
        {title || children}
      </div>);
    }
}
//# sourceMappingURL=drawer-title.jsx.map