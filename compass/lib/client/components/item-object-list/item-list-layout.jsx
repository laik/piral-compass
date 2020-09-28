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
import "./item-list-layout.scss";
import groupBy from "lodash/groupBy";
import React from "react";
import { computed, observable, reaction, toJS, when } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { ConfirmDialog } from "../confirm-dialog";
import { Table, TableCell, TableHead, TableRow } from "../table";
import { autobind, createStorage, cssNames, isReactNode, noop, prevDefault, stopPropagation } from "../../utils";
import { AddRemoveButtons } from "../add-remove-buttons";
import { NoItems } from "../no-items";
import { Spinner } from "../spinner";
import { SearchInput } from "../input";
import { namespaceStore } from "../+namespaces/namespace.store";
import { FilterType, pageFilters } from "./page-filters.store";
import { PageFiltersList } from "./page-filters-list";
import { PageFiltersSelect } from "./page-filters-select";
import { NamespaceSelectFilter } from "../+namespaces/namespace-select";
import { themeStore } from "../../theme.store";
const defaultProps = {
    showHeader: true,
    isSearchable: true,
    isSelectable: true,
    copyClassNameFromHeadCells: true,
    dependentStores: [],
    filterItems: [],
    hasDetailsView: true,
    onDetails: noop,
    virtual: true
};
let ItemListLayout = class ItemListLayout extends React.Component {
    constructor(props) {
        super(props);
        this.isUnmounting = false;
        // default user settings (ui show-hide tweaks mostly)
        this.userSettings = {
            showAppliedFilters: true,
        };
        this.filterCallbacks = {
            [FilterType.SEARCH]: items => {
                const { searchFilters, isSearchable } = this.props;
                const search = pageFilters.getValues(FilterType.SEARCH)[0] || "";
                if (search && isSearchable && searchFilters) {
                    const normalizeText = (text) => String(text).toLowerCase();
                    const searchTexts = [search].map(normalizeText);
                    return items.filter(item => {
                        return searchFilters.some(getTexts => {
                            const sourceTexts = [getTexts(item)].flat().map(normalizeText);
                            return sourceTexts.some(source => searchTexts.some(search => source.includes(search)));
                        });
                    });
                }
                return items;
            },
            [FilterType.NAMESPACE]: items => {
                const filterValues = pageFilters.getValues(FilterType.NAMESPACE);
                if (filterValues.length > 0) {
                    return items.filter(item => filterValues.includes(item.getNs()));
                }
                return items;
            },
        };
        // keep ui user settings in local storage
        const defaultUserSettings = toJS(this.userSettings);
        const storage = createStorage("items_list_layout", defaultUserSettings);
        Object.assign(this.userSettings, storage.get()); // restore
        disposeOnUnmount(this, [
            reaction(() => toJS(this.userSettings), settings => storage.set(settings)),
        ]);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const { store, dependentStores, isClusterScoped } = this.props;
            const stores = [store, ...dependentStores];
            if (!isClusterScoped)
                stores.push(namespaceStore);
            const loadingStores = stores.filter(store => !store.isLoaded);
            loadingStores.forEach(store => store.loadAll());
            yield when(() => loadingStores.every(store => !store.isLoading));
            const subscriptions = stores.map(store => store.subscribe());
            yield when(() => this.isUnmounting);
            subscriptions.forEach(dispose => dispose()); // unsubscribe all
        });
    }
    componentWillUnmount() {
        this.isUnmounting = true;
        const { store, isSelectable } = this.props;
        if (isSelectable)
            store.resetSelection();
    }
    get isReady() {
        const { isReady, store } = this.props;
        return typeof isReady == "boolean" ? isReady : store.isLoaded;
    }
    get filters() {
        let { activeFilters } = pageFilters;
        const { isClusterScoped, isSearchable, searchFilters } = this.props;
        if (isClusterScoped) {
            activeFilters = activeFilters.filter(({ type }) => type !== FilterType.NAMESPACE);
        }
        if (!(isSearchable && searchFilters)) {
            activeFilters = activeFilters.filter(({ type }) => type !== FilterType.SEARCH);
        }
        return activeFilters;
    }
    applyFilters(filters, items) {
        if (!filters || !filters.length)
            return items;
        return filters.reduce((items, filter) => filter(items), items);
    }
    get allItems() {
        const { filterItems, store } = this.props;
        return this.applyFilters(filterItems, store.items);
    }
    get items() {
        const { allItems, filters, filterCallbacks } = this;
        const filterItems = [];
        const filterGroups = groupBy(filters, ({ type }) => type);
        Object.entries(filterGroups).forEach(([type, filtersGroup]) => {
            const filterCallback = filterCallbacks[type];
            if (filterCallback && filtersGroup.length > 0) {
                filterItems.push(filterCallback);
            }
        });
        return this.applyFilters(filterItems, allItems);
    }
    getRow(uid) {
        const { isSelectable, renderTableHeader, renderTableContents, renderItemMenu, store, hasDetailsView, onDetails, copyClassNameFromHeadCells, customizeTableRowProps, detailsItem, } = this.props;
        const { isSelected } = store;
        const item = this.items.find(item => item.getId() == uid);
        if (!item)
            return;
        const itemId = item.getId();
        return (<TableRow key={itemId} nowrap searchItem={item} sortItem={item} selected={detailsItem && detailsItem.getId() === itemId} onClick={hasDetailsView ? prevDefault(() => onDetails(item)) : undefined} {...(customizeTableRowProps ? customizeTableRowProps(item) : {})}>
        {isSelectable && (<TableCell checkbox isChecked={isSelected(item)} onClick={prevDefault(() => store.toggleSelection(item))}/>)}
        {renderTableContents(item)
            .map((content, index) => {
            const cellProps = isReactNode(content) ? { children: content } : content;
            if (copyClassNameFromHeadCells && renderTableHeader) {
                const headCell = renderTableHeader[index];
                if (headCell) {
                    cellProps.className = cssNames(cellProps.className, headCell.className);
                }
            }
            return <TableCell key={index} {...cellProps}/>;
        })}
        {renderItemMenu && (<TableCell className="menu" onClick={stopPropagation}>
            {renderItemMenu(item, store)}
          </TableCell>)}
      </TableRow>);
    }
    removeItemsDialog() {
        const { customizeRemoveDialog, store } = this.props;
        const { selectedItems, removeSelectedItems } = store;
        const visibleMaxNamesCount = 5;
        const selectedNames = selectedItems.map(ns => ns.getName()).slice(0, visibleMaxNamesCount).join(", ");
        const dialogCustomProps = customizeRemoveDialog ? customizeRemoveDialog(selectedItems) : {};
        const selectedCount = selectedItems.length;
        const tailCount = selectedCount > visibleMaxNamesCount ? selectedCount - visibleMaxNamesCount : 0;
        const tail = tailCount > 0 ? `and <b>{tailCount}</b> more` : null;
        ConfirmDialog.open(Object.assign({ ok: removeSelectedItems, labelOk: `Remove`, message: (<></>) }, dialogCustomProps));
    }
    renderFilters() {
        const { hideFilters } = this.props;
        const { isReady, userSettings, filters } = this;
        if (!isReady || !filters.length || hideFilters || !userSettings.showAppliedFilters) {
            return;
        }
        return <PageFiltersList filters={filters}/>;
    }
    renderNoItems() {
        const { allItems, items, filters } = this;
        const allItemsCount = allItems.length;
        const itemsCount = items.length;
        const isFiltered = filters.length > 0 && allItemsCount > itemsCount;
        if (isFiltered) {
            return (<NoItems>
          `No items found.`
          <p>
            <a onClick={() => pageFilters.reset()} className="contrast">
              `Reset filters?`
            </a>
          </p>
        </NoItems>);
        }
        return <NoItems />;
    }
    renderHeaderContent(placeholders) {
        const { title, filters, search, info } = placeholders;
        return (<>
        {title}
        <div className="info-panel box grow">
          {this.isReady && info}
        </div>
        {filters}
        {search}
      </>);
    }
    renderInfo() {
        const { allItems, items, isReady, userSettings, filters } = this;
        const allItemsCount = allItems.length;
        const itemsCount = items.length;
        const isFiltered = isReady && filters.length > 0;
        if (isFiltered) {
            const toggleFilters = () => userSettings.showAppliedFilters = !userSettings.showAppliedFilters;
            return (`
          <a onClick={toggleFilters}>Filtered</a>: {itemsCount} / {allItemsCount}
        `);
        }
        return (<></>);
    }
    renderHeader() {
        const { showHeader, customizeHeader, renderHeaderTitle, headerClassName, isClusterScoped } = this.props;
        if (!showHeader)
            return;
        const title = typeof renderHeaderTitle === "function" ? renderHeaderTitle(this) : renderHeaderTitle;
        const placeholders = {
            title: <h5 className="title">{title}</h5>,
            info: this.renderInfo(),
            filters: <>
        {!isClusterScoped && <NamespaceSelectFilter />}
        <PageFiltersSelect allowEmpty disableFilters={{
                [FilterType.NAMESPACE]: true,
            }}/>
      </>,
            search: <SearchInput />,
        };
        let header = this.renderHeaderContent(placeholders);
        if (customizeHeader) {
            const modifiedHeader = customizeHeader(placeholders, header);
            if (isReactNode(modifiedHeader)) {
                header = modifiedHeader;
            }
            else {
                header = this.renderHeaderContent(Object.assign(Object.assign({}, placeholders), modifiedHeader));
            }
        }
        return (<div className={cssNames("header flex gaps align-center", headerClassName)}>
        {header}
      </div>);
    }
    renderList() {
        const { isSelectable, tableProps = {}, renderTableHeader, renderItemMenu, store, hasDetailsView, addRemoveButtons = {}, virtual, sortingCallbacks, detailsItem } = this.props;
        const { isReady, removeItemsDialog, items } = this;
        const { selectedItems } = store;
        const selectedItemId = detailsItem && detailsItem.getId();
        return (<div className="items box grow flex column">
        {!isReady && (<Spinner center/>)}
        {isReady && (<Table virtual={virtual} selectable={hasDetailsView} sortable={sortingCallbacks} getTableRow={this.getRow} items={items} selectedItemId={selectedItemId} noItems={this.renderNoItems()} {...(Object.assign(Object.assign({}, tableProps), { className: cssNames("box grow", tableProps.className, themeStore.activeTheme.type) }))}>
            {renderTableHeader && (<TableHead showTopLine nowrap>
                {isSelectable && (<TableCell checkbox isChecked={store.isSelectedAll(items)} onClick={prevDefault(() => store.toggleSelectionAll(items))}/>)}
                {renderTableHeader.map((cellProps, index) => <TableCell key={index} {...cellProps}/>)}
                {renderItemMenu && <TableCell className="menu"/>}
              </TableHead>)}
            {!virtual && items.map(item => this.getRow(item.getId()))}
          </Table>)}
        <AddRemoveButtons onRemove={selectedItems.length ? removeItemsDialog : null} removeTooltip={`Remove selected items ({selectedItems.length})`} {...addRemoveButtons}/>
      </div>);
    }
    renderFooter() {
        if (this.props.renderFooter) {
            return this.props.renderFooter(this);
        }
    }
    render() {
        const { className } = this.props;
        return (<div className={cssNames("ItemListLayout flex column", className)}>
        {this.renderHeader()}
        {this.renderFilters()}
        {this.renderList()}
        {this.renderFooter()}
      </div>);
    }
};
ItemListLayout.defaultProps = defaultProps;
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemListLayout.prototype, "isUnmounting", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemListLayout.prototype, "userSettings", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ItemListLayout.prototype, "isReady", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ItemListLayout.prototype, "filters", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ItemListLayout.prototype, "allItems", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ItemListLayout.prototype, "items", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemListLayout.prototype, "getRow", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemListLayout.prototype, "removeItemsDialog", null);
ItemListLayout = __decorate([
    observer,
    __metadata("design:paramtypes", [Object])
], ItemListLayout);
export { ItemListLayout };
//# sourceMappingURL=item-list-layout.jsx.map