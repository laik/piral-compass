var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./table.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import { autobind, cssNames, noop } from "../../utils";
import { TableRow } from "./table-row";
import { TableHead } from "./table-head";
import { VirtualList } from "../virtual-list";
import { navigation, setQueryParams } from "../../navigation";
import orderBy from "lodash/orderBy";
let Table = class Table extends React.Component {
    constructor() {
        super(...arguments);
        this.sortParamsLocal = this.props.sortByDefault;
    }
    get sortParams() {
        if (this.props.sortSyncWithUrl) {
            const sortBy = navigation.searchParams.get("sortBy");
            const orderBy = navigation.searchParams.get("orderBy");
            return { sortBy, orderBy };
        }
        return this.sortParamsLocal || {};
    }
    renderHead() {
        const { sortable, children } = this.props;
        const content = React.Children.toArray(children);
        const headElem = content.find(elem => elem.type === TableHead);
        if (headElem) {
            if (sortable) {
                const columns = React.Children.toArray(headElem.props.children);
                return React.cloneElement(headElem, {
                    children: columns.map(elem => {
                        if (elem.props.checkbox) {
                            return elem;
                        }
                        const title = elem.props.title || (
                        // copy cell content to title if it's a string
                        // usable if part of TableCell's content is hidden when there is not enough space
                        typeof elem.props.children === "string" ? elem.props.children : undefined);
                        return React.cloneElement(elem, {
                            title: title,
                            _sort: this.sort,
                            _sorting: this.sortParams,
                            _nowrap: headElem.props.nowrap,
                        });
                    })
                });
            }
            return headElem;
        }
    }
    getSorted(items) {
        const { sortParams } = this;
        const sortingCallback = this.props.sortable[sortParams.sortBy] || noop;
        return orderBy(items, sortingCallback, sortParams.orderBy);
    }
    onSort(params) {
        const { sortSyncWithUrl, onSort } = this.props;
        if (sortSyncWithUrl) {
            setQueryParams(params);
        }
        else {
            this.sortParamsLocal = params;
        }
        if (onSort) {
            onSort(params);
        }
    }
    sort(colName) {
        const { sortBy, orderBy } = this.sortParams;
        const sameColumn = sortBy == colName;
        const newSortBy = colName;
        const newOrderBy = (!orderBy || !sameColumn || orderBy === "desc") ? "asc" : "desc";
        this.onSort({
            sortBy: String(newSortBy),
            orderBy: newOrderBy,
        });
    }
    renderRows() {
        const { sortable, noItems, children, virtual, customRowHeights, rowLineHeight, rowPadding, items, getTableRow, selectedItemId, className } = this.props;
        const content = React.Children.toArray(children);
        let rows = content.filter(elem => elem.type === TableRow);
        let sortedItems = rows.length ? rows.map(row => row.props.sortItem) : [...items];
        if (sortable) {
            sortedItems = this.getSorted(sortedItems);
            if (rows.length) {
                rows = sortedItems.map(item => rows.find(row => {
                    return item == row.props.sortItem;
                }));
            }
        }
        if (!rows.length && !items.length && noItems) {
            return noItems;
        }
        if (virtual) {
            const lineHeight = parseFloat(rowLineHeight);
            const padding = parseFloat(rowPadding);
            let rowHeights = Array(items.length).fill(lineHeight + padding * 2);
            if (customRowHeights) {
                rowHeights = sortedItems.map(item => {
                    return customRowHeights(item, lineHeight, padding * 2);
                });
            }
            return (<VirtualList items={sortedItems} rowHeights={rowHeights} getTableRow={getTableRow} selectedItemId={selectedItemId} className={className}/>);
        }
        return rows;
    }
    render() {
        const { selectable, scrollable, sortable, autoSize, virtual } = this.props;
        let { className } = this.props;
        className = cssNames("Table flex column", className, {
            selectable, scrollable, sortable, autoSize, virtual,
        });
        return (<div className={className}>
        {this.renderHead()}
        {this.renderRows()}
      </div>);
    }
};
Table.defaultProps = {
    scrollable: true,
    autoSize: true,
    rowPadding: "8px",
    rowLineHeight: "17px",
    sortSyncWithUrl: true,
};
__decorate([
    observable,
    __metadata("design:type", Object)
], Table.prototype, "sortParamsLocal", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Table.prototype, "sortParams", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Table.prototype, "onSort", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Table.prototype, "sort", null);
Table = __decorate([
    observer
], Table);
export { Table };
//# sourceMappingURL=table.jsx.map