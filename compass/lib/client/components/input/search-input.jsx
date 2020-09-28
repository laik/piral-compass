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
import "./search-input.scss";
import React from "react";
import debounce from "lodash/debounce";
import { autorun, observable } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { Icon } from "../icon";
import { cssNames } from "../../utils";
import { Input } from "../input";
import { getSearch, setSearch } from "../../navigation";
const defaultProps = {
    autoFocus: true,
    get placeholder() {
        return `Search...`;
    },
};
let SearchInput = class SearchInput extends React.Component {
    constructor() {
        super(...arguments);
        this.updateInput = autorun(() => this.inputVal = getSearch());
        this.updateUrl = debounce((val) => setSearch(val), 250);
        this.setValue = (value) => {
            this.inputVal = value;
            this.updateUrl(value);
        };
        this.clear = () => {
            this.setValue("");
            this.updateUrl.flush();
        };
        this.onChange = (val, evt) => {
            this.setValue(val);
            if (this.props.onChange) {
                this.props.onChange(val, evt);
            }
        };
        this.onKeyDown = (evt) => {
            if (this.props.onKeyDown) {
                this.props.onKeyDown(evt);
            }
            // clear on escape-key
            const escapeKey = evt.nativeEvent.code === "Escape";
            if (escapeKey) {
                this.clear();
                evt.stopPropagation();
            }
        };
    }
    render() {
        const { inputVal } = this;
        const _a = this.props, { className, compact } = _a, inputProps = __rest(_a, ["className", "compact"]);
        const icon = inputVal
            ? <Icon small material="close" onClick={this.clear}/>
            : <Icon small material="search"/>;
        return (<Input {...inputProps} className={cssNames("SearchInput", className, { compact })} value={inputVal} onChange={this.onChange} onKeyDown={this.onKeyDown} iconRight={icon}/>);
    }
};
SearchInput.defaultProps = defaultProps;
__decorate([
    observable,
    __metadata("design:type", String)
], SearchInput.prototype, "inputVal", void 0);
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], SearchInput.prototype, "updateInput", void 0);
SearchInput = __decorate([
    observer
], SearchInput);
export { SearchInput };
//# sourceMappingURL=search-input.jsx.map