import "./sub-title.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class SubTitle extends React.Component {
    render() {
        const { compact, title, children } = this.props;
        let { className } = this.props;
        className = cssNames("SubTitle", className, {
            compact,
        });
        return (<div className={className}>
        {title} {children} 
      </div>);
    }
}
//# sourceMappingURL=sub-title.jsx.map