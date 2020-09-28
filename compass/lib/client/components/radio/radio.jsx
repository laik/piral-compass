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
import "./radio.scss";
import * as React from "react";
import { cssNames } from "../../utils";
import uniqueId from "lodash/uniqueId";
export class RadioGroup extends React.Component {
    render() {
        const name = uniqueId("radioGroup");
        const { value, asButtons, disabled, onChange } = this.props;
        let { className } = this.props;
        className = cssNames("RadioGroup", { buttonsView: asButtons }, className);
        const radios = React.Children.toArray(this.props.children);
        return (<div className={className}>
        {radios.map(radio => {
            return React.cloneElement(radio, {
                name: name,
                disabled: disabled !== undefined ? disabled : radio.props.disabled,
                checked: radio.props.value === value,
                onChange: onChange
            });
        })}
      </div>);
    }
}
export class Radio extends React.Component {
    constructor() {
        super(...arguments);
        this.onChange = () => {
            const { value, onChange, checked } = this.props;
            if (!checked && onChange) {
                onChange(value);
            }
        };
        this.onKeyDown = (e) => {
            const SPACE_KEY = e.keyCode === 32;
            const ENTER_KEY = e.keyCode === 13;
            if (SPACE_KEY || ENTER_KEY) {
                this.elem.click();
                e.preventDefault();
            }
        };
    }
    render() {
        const _a = this.props, { className, label, checked, children } = _a, inputProps = __rest(_a, ["className", "label", "checked", "children"]);
        const componentClass = cssNames('Radio flex align-center', className, {
            checked: checked,
            disabled: this.props.disabled,
        });
        return (<label className={componentClass} tabIndex={!checked ? 0 : null} onKeyDown={this.onKeyDown} ref={e => this.elem = e}>
        <input {...inputProps} type="radio" checked={checked} onChange={this.onChange}/>
        <i className="tick flex center"/>
        {label ? <div className="label">{label}</div> : null}
        {children}
      </label>);
    }
}
//# sourceMappingURL=radio.jsx.map