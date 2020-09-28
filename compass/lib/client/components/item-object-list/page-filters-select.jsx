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
import React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Select } from "../select";
import { FilterType, pageFilters } from "./page-filters.store";
import { namespaceStore } from "../+namespaces/namespace.store";
import { Icon } from "../icon";
import { FilterIcon } from "./filter-icon";
let PageFiltersSelect = class PageFiltersSelect extends React.Component {
    constructor() {
        super(...arguments);
        this.formatLabel = (option) => {
            const { label, value, type, selected } = option;
            return (<div className="flex gaps">
        <FilterIcon type={type}/>
        <span>{label || String(value)}</span>
        {selected && <Icon small material="check" className="box right"/>}
      </div>);
        };
        this.onSelect = (option) => {
            const { type, value, selected } = option;
            const { addFilter, removeFilter } = pageFilters;
            const filter = { type, value };
            if (!selected) {
                addFilter(filter);
            }
            else {
                removeFilter(filter);
            }
        };
    }
    get groupedOptions() {
        const options = [];
        const { disableFilters } = this.props;
        if (!disableFilters[FilterType.NAMESPACE]) {
            const selectedValues = pageFilters.getValues(FilterType.NAMESPACE);
            options.push({
                label: `Namespace`,
                options: namespaceStore.items.map(ns => {
                    const name = ns.getName();
                    return {
                        type: FilterType.NAMESPACE,
                        value: name,
                        icon: <Icon small material="layers"/>,
                        selected: selectedValues.includes(name),
                    };
                })
            });
        }
        return options;
    }
    get options() {
        return this.groupedOptions.reduce((options, optGroup) => {
            options.push(...optGroup.options);
            return options;
        }, []);
    }
    render() {
        const { groupedOptions, formatLabel, onSelect, options } = this;
        if (!options.length && this.props.allowEmpty) {
            return null;
        }
        const _a = this.props, { allowEmpty, disableFilters } = _a, selectProps = __rest(_a, ["allowEmpty", "disableFilters"]);
        const selectedOptions = options.filter(opt => opt.selected);
        return (<Select {...selectProps} placeholder={`Filters (${selectedOptions.length}/${options.length})`} noOptionsMessage={() => `No filters available.`} autoConvertOptions={false} tabSelectsValue={false} controlShouldRenderValue={false} options={groupedOptions} formatOptionLabel={formatLabel} onChange={onSelect}/>);
    }
};
PageFiltersSelect.defaultProps = {
    allowEmpty: true,
    disableFilters: {},
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], PageFiltersSelect.prototype, "groupedOptions", null);
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], PageFiltersSelect.prototype, "options", null);
PageFiltersSelect = __decorate([
    observer
], PageFiltersSelect);
export { PageFiltersSelect };
//# sourceMappingURL=page-filters-select.jsx.map