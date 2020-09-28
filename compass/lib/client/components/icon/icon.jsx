var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import './icon.scss';
import React from "react";
import { findDOMNode } from "react-dom";
import { NavLink } from "react-router-dom";
import { autobind, cssNames } from "../../utils";
import { withTooltip } from "../tooltip";
import isNumber from "lodash/isNumber";
let Icon = class Icon extends React.PureComponent {
    get isInteractive() {
        const { interactive, onClick, href, link } = this.props;
        return interactive || !!(onClick || href || link);
    }
    onClick(evt) {
        if (this.props.disabled) {
            return;
        }
        if (this.props.onClick) {
            this.props.onClick(evt);
        }
    }
    onKeyDown(evt) {
        switch (evt.nativeEvent.code) {
            case "Space":
            case "Enter":
                const icon = findDOMNode(this);
                setTimeout(() => icon.click());
                evt.preventDefault();
                break;
        }
        if (this.props.onKeyDown) {
            this.props.onKeyDown(evt);
        }
    }
    render() {
        const { isInteractive } = this;
        const _a = this.props, { 
        // skip passing props to icon's html element
        className, href, link, material, svg, size, small, big, disabled, sticker, active, focusable, children, interactive: _interactive, onClick: _onClick, onKeyDown: _onKeyDown } = _a, elemProps = __rest(_a, ["className", "href", "link", "material", "svg", "size", "small", "big", "disabled", "sticker", "active", "focusable", "children", "interactive", "onClick", "onKeyDown"]);
        let iconContent;
        const iconProps = Object.assign({ className: cssNames("Icon", className, { svg, material, interactive: isInteractive, disabled, sticker, active, focusable }, !size ? { small, big } : {}), onClick: isInteractive ? this.onClick : undefined, onKeyDown: isInteractive ? this.onKeyDown : undefined, tabIndex: isInteractive && focusable && !disabled ? 0 : undefined, style: size ? { "--size": size + (isNumber(size) ? "px" : "") } : undefined }, elemProps);
        // render as inline svg-icon
        if (svg) {
            const svgIconText = require("!!raw-loader!./" + svg + ".svg").default;
            iconContent = <span dangerouslySetInnerHTML={{ __html: svgIconText }}/>;
        }
        // render as material-icon
        if (material) {
            iconContent = <span className="material-icons">{material}</span>;
        }
        // wrap icon's content passed from decorator
        iconProps.children = (<>
        {iconContent}
        {children}
      </>);
        // render icon type
        if (link) {
            return <NavLink {...iconProps} to={link}/>;
        }
        if (href) {
            return <a {...iconProps} href={href}/>;
        }
        return <i {...iconProps}/>;
    }
};
Icon.defaultProps = {
    focusable: true,
};
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Icon.prototype, "onClick", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Icon.prototype, "onKeyDown", null);
Icon = __decorate([
    withTooltip
], Icon);
export { Icon };
//# sourceMappingURL=icon.jsx.map