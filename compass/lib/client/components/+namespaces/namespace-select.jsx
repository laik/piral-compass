var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
import "./namespace-select.scss";
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { Select } from "../select";
import { cssNames, noop } from "../../utils";
import { Icon } from "../icon";
import { namespaceStore } from "./namespace.store";
import { FilterIcon } from "../item-object-list/filter-icon";
import { FilterType } from "../item-object-list/page-filters.store";
import { themeStore } from "../../theme.store";
const defaultProps = {
    required: false,
    showIcons: true,
    showClusterOption: false,
    get clusterOptionLabel() {
        return `Cluster`;
    },
};
let NamespaceSelect = class NamespaceSelect extends React.Component {
    constructor() {
        super(...arguments);
        this.unsubscribe = noop;
        this.formatOptionLabel = (option) => {
            const { showIcons } = this.props;
            const { value, label } = option;
            return label || (<>
        {showIcons && <Icon small material="layers"/>}
        {value}
      </>);
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (true)
                yield namespaceStore.loadAll();
            this.unsubscribe = namespaceStore.subscribe();
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    get options() {
        const { customizeOptions, showClusterOption, clusterOptionLabel } = this.props;
        let options = namespaceStore.items.map(ns => ({ value: ns.getName() }));
        options = customizeOptions ? customizeOptions(options) : options;
        if (showClusterOption) {
            options.unshift({ value: null, label: clusterOptionLabel });
        }
        return options;
    }
    render() {
        const _a = this.props, { className, showIcons, showClusterOption, clusterOptionLabel, customizeOptions, required } = _a, selectProps = __rest(_a, ["className", "showIcons", "showClusterOption", "clusterOptionLabel", "customizeOptions", "required"]);
        return (<>
        <Select className={cssNames("NamespaceSelect", className)} menuClass="NamespaceSelectMenu" required={required} formatOptionLabel={this.formatOptionLabel} options={this.options} themeName={themeStore.activeThemeId === "kontena-dark" ? "dark" : "light"} {...selectProps}/>
      </>);
    }
};
NamespaceSelect.defaultProps = defaultProps;
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], NamespaceSelect.prototype, "options", null);
NamespaceSelect = __decorate([
    observer
], NamespaceSelect);
export { NamespaceSelect };
let NamespaceSelectFilter = class NamespaceSelectFilter extends React.Component {
    render() {
        const { contextNs, hasContext, toggleContext } = namespaceStore;
        let placeholder = `All namespaces`;
        if (contextNs.length == 1)
            placeholder = `Namespace: {contextNs[0]}`;
        if (contextNs.length >= 2)
            placeholder = `Namespaces: {contextNs.join(", ")}`;
        return (<NamespaceSelect placeholder={placeholder} isOptionSelected={() => false} controlShouldRenderValue={false} onChange={({ value: namespace }) => toggleContext(namespace)} formatOptionLabel={({ value: namespace }) => {
            const isSelected = hasContext(namespace);
            return (<div className="flex gaps align-center">
              <FilterIcon type={FilterType.NAMESPACE}/>
              <span>{namespace}</span>
              {isSelected && <Icon small material="check" className="box right"/>}
            </div>);
        }}/>);
    }
};
NamespaceSelectFilter = __decorate([
    observer
], NamespaceSelectFilter);
export { NamespaceSelectFilter };
//# sourceMappingURL=namespace-select.jsx.map