var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import "./button.scss";
import React from "react";
import { cssNames } from "../../utils";
import { withTooltip } from "../tooltip";
let Button = class Button extends React.PureComponent {
    render() {
        const _a = this.props, { className, waiting, label, primary, accent, plain, hidden, active, big, round, tooltip, children } = _a, props = __rest(_a, ["className", "waiting", "label", "primary", "accent", "plain", "hidden", "active", "big", "round", "tooltip", "children"]);
        const btnProps = props;
        if (hidden)
            return null;
        btnProps.className = cssNames('Button', className, {
            waiting, primary, accent, plain, active, big, round,
        });
        const btnContent = (<>
        {label}
        {children}
      </>);
        // render as link
        if (this.props.href) {
            return (<a {...btnProps} ref={e => this.link = e}>
          {btnContent}
        </a>);
        }
        // render as button
        return (<button type="button" {...btnProps} ref={e => this.button = e}>
        {btnContent}
      </button>);
    }
};
Button = __decorate([
    withTooltip
], Button);
export { Button };
//# sourceMappingURL=button.jsx.map