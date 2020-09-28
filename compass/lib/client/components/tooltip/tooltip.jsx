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
import './tooltip.scss';
import React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { createPortal } from "react-dom";
import { autobind, cssNames } from "../../utils";
import { Animate } from "../animate";
const defaultProps = {
    useAnimation: true,
    position: {
        center: true,
        bottom: true,
    }
};
let Tooltip = class Tooltip extends React.Component {
    constructor() {
        super(...arguments);
        this.isVisible = false;
    }
    componentDidMount() {
        const { htmlFor } = this.props;
        this.anchor = htmlFor ? document.getElementById(htmlFor) : this.elem.parentElement;
        if (this.anchor) {
            if (window.getComputedStyle(this.anchor).position === "static") {
                this.anchor.style.position = "relative";
            }
            this.anchor.addEventListener("mouseenter", this.onMouseEnter);
            this.anchor.addEventListener("mouseleave", this.onMouseLeave);
            this.anchor.addEventListener("mousemove", this.onMouseMove);
        }
    }
    componentWillUnmount() {
        if (this.anchor) {
            this.anchor.removeEventListener("mouseenter", this.onMouseEnter);
            this.anchor.removeEventListener("mouseleave", this.onMouseLeave);
            this.anchor.removeEventListener("mousemove", this.onMouseMove);
        }
    }
    onMouseEnter(evt) {
        this.isVisible = true;
        this.onMouseMove(evt);
    }
    onMouseLeave(evt) {
        this.isVisible = false;
    }
    onMouseMove(evt) {
        if (!this.props.following) {
            return;
        }
        const offsetX = -10;
        const offsetY = 10;
        const { clientX, clientY } = evt;
        const { innerWidth, innerHeight } = window;
        const initialPos = {
            top: "auto",
            left: "auto",
            right: (innerWidth - clientX + offsetX) + "px",
            bottom: (innerHeight - clientY + offsetY) + "px",
        };
        Object.assign(this.elem.style, initialPos);
        // correct position if not fits to viewport
        const { left, top } = this.elem.getBoundingClientRect();
        if (left < 0) {
            this.elem.style.left = clientX + offsetX + "px";
            this.elem.style.right = "auto";
        }
        if (top < 0) {
            this.elem.style.top = clientY + offsetY + "px";
            this.elem.style.bottom = "auto";
        }
    }
    bindRef(elem) {
        this.elem = elem;
    }
    render() {
        const { isVisible } = this;
        const { useAnimation, position, following, style, children } = this.props;
        let { className } = this.props;
        className = cssNames('Tooltip', position, { following }, className);
        const tooltip = (<Animate enter={isVisible} enabled={useAnimation}>
        <div className={className} ref={this.bindRef} style={style}>
          {children}
        </div>
      </Animate>);
        if (following) {
            return createPortal(tooltip, document.body);
        }
        return tooltip;
    }
};
Tooltip.defaultProps = defaultProps;
__decorate([
    observable,
    __metadata("design:type", Object)
], Tooltip.prototype, "isVisible", void 0);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Tooltip.prototype, "onMouseEnter", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Tooltip.prototype, "onMouseLeave", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], Tooltip.prototype, "onMouseMove", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLElement]),
    __metadata("design:returntype", void 0)
], Tooltip.prototype, "bindRef", null);
Tooltip = __decorate([
    observer
], Tooltip);
export { Tooltip };
export class TooltipContent extends React.Component {
    render() {
        const _a = this.props, { className, children } = _a, modifiers = __rest(_a, ["className", "children"]);
        return (<div className={cssNames("TooltipContent", className, modifiers)}>
        {children}
      </div>);
    }
}
//# sourceMappingURL=tooltip.jsx.map