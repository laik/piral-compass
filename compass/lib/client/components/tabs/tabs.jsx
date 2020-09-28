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
import "./tabs.scss";
import React from "react";
import { autobind, cssNames } from "../../utils";
import { Icon } from "../icon";
const TabsContext = React.createContext({});
export class Tabs extends React.PureComponent {
    bindRef(elem) {
        this.elem = elem;
    }
    render() {
        const _a = this.props, { center, wrap, onChange, value, autoFocus, scrollable = true } = _a, elemProps = __rest(_a, ["center", "wrap", "onChange", "value", "autoFocus", "scrollable"]);
        let { className } = this.props;
        className = cssNames("Tabs", className, {
            "center": center,
            "wrap": wrap,
            "scrollable": scrollable,
        });
        return (<TabsContext.Provider value={{ autoFocus, value, onChange }}>
        <div {...elemProps} className={className} ref={this.bindRef}/>
      </TabsContext.Provider>);
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLElement]),
    __metadata("design:returntype", void 0)
], Tabs.prototype, "bindRef", null);
export class Tab extends React.PureComponent {
    get isActive() {
        const { active, value } = this.props;
        return typeof active === "boolean" ? active : this.context.value === value;
    }
    focus() {
        this.elem.focus();
    }
    scrollIntoView() {
        this.elem.scrollIntoView({
            behavior: "smooth",
            inline: "center",
        });
    }
    onClick(evt) {
        const { value, active, disabled, onClick } = this.props;
        const { onChange } = this.context;
        if (disabled || active)
            return;
        if (onClick)
            onClick(evt);
        if (onChange)
            onChange(value);
    }
    onFocus(evt) {
        const { onFocus } = this.props;
        if (onFocus)
            onFocus(evt);
        this.scrollIntoView();
    }
    onKeyDown(evt) {
        const ENTER_KEY = evt.keyCode === 13;
        const SPACE_KEY = evt.keyCode === 32;
        if (SPACE_KEY || ENTER_KEY)
            this.elem.click();
        const { onKeyDown } = this.props;
        if (onKeyDown)
            onKeyDown(evt);
    }
    componentDidMount() {
        if (this.isActive && this.context.autoFocus) {
            this.focus();
        }
    }
    bindRef(elem) {
        this.elem = elem;
    }
    render() {
        const _a = this.props, { active, disabled, icon, label, value } = _a, elemProps = __rest(_a, ["active", "disabled", "icon", "label", "value"]);
        let { className } = this.props;
        className = cssNames("Tab flex gaps align-center", className, {
            "active": this.isActive,
            "disabled": disabled,
        });
        return (<div {...elemProps} className={className} tabIndex={0} onClick={this.onClick} onFocus={this.onFocus} onKeyDown={this.onKeyDown} ref={this.bindRef}>
        {typeof icon === "string" ? <Icon small material={icon}/> : icon}
        <div className="label">
          {label}
        </div>
      </div>);
    }
}
Tab.contextType = TabsContext;
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Tab.prototype, "onClick", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Tab.prototype, "onFocus", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Tab.prototype, "onKeyDown", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLElement]),
    __metadata("design:returntype", void 0)
], Tab.prototype, "bindRef", null);
//# sourceMappingURL=tabs.jsx.map