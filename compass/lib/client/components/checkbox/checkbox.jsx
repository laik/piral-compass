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
import './checkbox.scss';
import React from 'react';
import { autobind, cssNames } from "../../utils";
export class Checkbox extends React.PureComponent {
    onChange(evt) {
        if (this.props.onChange) {
            this.props.onChange(this.input.checked, evt);
        }
    }
    getValue() {
        if (this.props.value !== undefined)
            return this.props.value;
        return this.input.checked;
    }
    render() {
        const _a = this.props, { label, inline, className, value, theme, children } = _a, inputProps = __rest(_a, ["label", "inline", "className", "value", "theme", "children"]);
        const componentClass = cssNames('Checkbox flex', className, {
            inline: inline,
            checked: value,
            disabled: this.props.disabled,
            ["theme-" + theme]: theme,
        });
        return (<label className={componentClass}>
        <input {...inputProps} type="checkbox" checked={value} onChange={this.onChange} ref={e => this.input = e}/>
        <i className="box flex align-center"/>
        {label ? <span className="label">{label}</span> : null}
        {children}
      </label>);
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Checkbox.prototype, "onChange", null);
//# sourceMappingURL=checkbox.jsx.map