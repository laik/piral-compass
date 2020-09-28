import "./drawer-param-toggler.scss";
import * as React from "react";
import { Icon } from "../icon";
import { cssNames } from "../../utils";
export class DrawerParamToggler extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.toggle = () => {
            this.setState({ open: !this.state.open });
        };
    }
    render() {
        const { label, children } = this.props;
        const { open } = this.state;
        const icon = `arrow_drop_${open ? "up" : "down"}`;
        const link = open ? `Hide` : `Show`;
        return (<div className="DrawerParamToggler">
        <div className="flex gaps align-center">
          <div className="param-label">{label}</div>
          <div className="param-link" onClick={this.toggle}>
            <span className="param-link-text">{link}</span>
            <Icon material={icon}/>
          </div>
        </div>
        <div className={cssNames("param-content", { open })}>{children}</div>
      </div>);
    }
}
//# sourceMappingURL=drawer-param-toggler.jsx.map