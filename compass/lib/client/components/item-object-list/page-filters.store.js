var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { computed, observable, reaction } from "mobx";
import { autobind } from "../../utils";
import { getSearch, setSearch } from "../../navigation";
import { namespaceStore } from "../+namespaces/namespace.store";
export var FilterType;
(function (FilterType) {
    FilterType["SEARCH"] = "search";
    FilterType["NAMESPACE"] = "namespace";
})(FilterType || (FilterType = {}));
let PageFiltersStore = class PageFiltersStore {
    constructor() {
        this.filters = observable.array([], { deep: false });
        this.isDisabled = observable.map();
        this.syncWithGlobalSearch();
        this.syncWithContextNamespace();
    }
    get activeFilters() {
        return this.filters.filter(filter => !this.isDisabled.get(filter.type));
    }
    syncWithContextNamespace() {
        const disposers = [
            reaction(() => this.getValues(FilterType.NAMESPACE), filteredNs => {
                if (filteredNs.length !== namespaceStore.contextNs.length) {
                    namespaceStore.setContext(filteredNs);
                }
            }),
            reaction(() => namespaceStore.contextNs.toJS(), contextNs => {
                const filteredNs = this.getValues(FilterType.NAMESPACE);
                const isChanged = contextNs.length !== filteredNs.length;
                if (isChanged) {
                    this.filters.replace([
                        ...this.filters.filter(({ type }) => type !== FilterType.NAMESPACE),
                        ...contextNs.map(ns => ({ type: FilterType.NAMESPACE, value: ns })),
                    ]);
                }
            }, {
                fireImmediately: true
            })
        ];
        return () => disposers.forEach(dispose => dispose());
    }
    syncWithGlobalSearch() {
        const disposers = [
            reaction(() => this.getValues(FilterType.SEARCH)[0], setSearch),
            reaction(() => getSearch(), search => {
                const filter = this.getByType(FilterType.SEARCH);
                if (filter) {
                    this.removeFilter(filter); // search filter might occur once
                }
                if (search) {
                    this.addFilter({ type: FilterType.SEARCH, value: search }, true);
                }
            }, {
                fireImmediately: true
            })
        ];
        return () => disposers.forEach(dispose => dispose());
    }
    addFilter(filter, begin = false) {
        if (begin)
            this.filters.unshift(filter);
        else {
            this.filters.push(filter);
        }
    }
    removeFilter(filter) {
        if (!this.filters.remove(filter)) {
            const filterCopy = this.filters.find(f => f.type === filter.type && f.value === filter.value);
            if (filterCopy)
                this.filters.remove(filterCopy);
        }
    }
    getByType(type, value) {
        return this.filters.find(filter => filter.type === type && (arguments.length > 1 ? filter.value === value : true));
    }
    getValues(type) {
        return this.filters
            .filter(filter => filter.type === type)
            .map(filter => filter.value);
    }
    isEnabled(type) {
        return !this.isDisabled.get(type);
    }
    disable(type) {
        [type].flat().forEach(type => this.isDisabled.set(type, true));
        return () => this.enable(type);
    }
    enable(type) {
        [type].flat().forEach(type => this.isDisabled.delete(type));
        return () => this.disable(type);
    }
    reset() {
        this.filters.length = 0;
        this.isDisabled.clear();
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], PageFiltersStore.prototype, "activeFilters", null);
PageFiltersStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], PageFiltersStore);
export { PageFiltersStore };
export const pageFilters = new PageFiltersStore();
//# sourceMappingURL=page-filters.store.js.map