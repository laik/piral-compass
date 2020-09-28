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
// Wrapper for "react-select" component
// API docs: https://react-select.com/
import "./select.scss";
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { autobind, cssNames } from "../../utils";
import ReactSelect, { components as ReactSelectComponents } from "react-select";
import Creatable from "react-select/creatable";
export { ReactSelectComponents };
let Select = class Select extends React.Component {
    constructor() {
        super(...arguments);
        // private theme = this.props.themeName || "light"
        this.theme = "light";
        this.styles = {
            menuPortal: styles => (Object.assign(Object.assign({}, styles), { zIndex: "auto" })),
        };
    }
    isValidOption(opt) {
        return typeof opt === "object" && opt.value !== undefined;
    }
    get selectedOption() {
        const { value, isMulti } = this.props;
        if (isMulti) {
            return this.options.filter(opt => {
                const values = value ? [].concat(value) : [];
                return values.includes(opt) || values.includes(opt.value);
            });
        }
        return this.options.find(opt => opt === value || opt.value === value);
    }
    get options() {
        const { autoConvertOptions, options } = this.props;
        if (autoConvertOptions && Array.isArray(options)) {
            return options.map(opt => {
                return this.isValidOption(opt) ? opt : { value: opt, label: String(opt) };
            });
        }
        return options;
    }
    onChange(value, meta) {
        if (this.props.onChange) {
            this.props.onChange(value, meta);
        }
    }
    onKeyDown(evt) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(evt);
        }
        const escapeKey = evt.nativeEvent.code === "Escape";
        if (escapeKey)
            evt.stopPropagation(); // don't close the <Dialog/>
    }
    render() {
        const _a = this.props, { className, menuClass, isCreatable, autoConvertOptions, value, options, components = {} } = _a, props = __rest(_a, ["className", "menuClass", "isCreatable", "autoConvertOptions", "value", "options", "components"]);
        const themeClass = `theme-${this.theme}`;
        const selectProps = Object.assign(Object.assign({}, props), { styles: this.styles, value: autoConvertOptions ? this.selectedOption : value, options: autoConvertOptions ? this.options : options, onChange: this.onChange, onKeyDown: this.onKeyDown, className: cssNames("Select", themeClass, className), classNamePrefix: "Select", components: Object.assign(Object.assign({}, components), { Menu: props => (<ReactSelectComponents.Menu {...props} className={cssNames(menuClass, themeClass)}/>) }) });
        return isCreatable
            ? <Creatable {...selectProps}/>
            : <ReactSelect {...selectProps}/>;
    }
};
Select.defaultProps = {
    autoConvertOptions: true,
    menuPortalTarget: document.body,
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Select.prototype, "selectedOption", null);
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], Select.prototype, "options", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Select.prototype, "onChange", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Select.prototype, "onKeyDown", null);
Select = __decorate([
    observer
], Select);
export { Select };
//# sourceMappingURL=select.jsx.map