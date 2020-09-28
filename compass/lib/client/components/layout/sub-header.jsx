import "./sub-header.scss";
import * as React from "react";
import { cssNames } from "../../utils";
export class SubHeader extends React.Component {
    render() {
        const { withLine, compact, children } = this.props;
        let { className } = this.props;
        className = cssNames("SubHeader", {
            withLine,
            compact,
        }, className);
        return (<div className={className}>
        {children}
      </div>);
    }
}
//# sourceMappingURL=sub-header.jsx.map