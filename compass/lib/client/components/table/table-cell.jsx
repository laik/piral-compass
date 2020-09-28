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
import "./table-cell.scss";
import React from "react";
import { autobind, cssNames } from "../../utils";
import { Icon } from "../icon";
import { Checkbox } from "../checkbox";
export class TableCell extends React.Component {
    onClick(evt) {
        if (this.props.onClick) {
            this.props.onClick(evt);
        }
        if (this.isSortable) {
            this.props._sort(this.props.sortBy);
        }
    }
    get isSortable() {
        const { _sorting, sortBy } = this.props;
        return _sorting && sortBy !== undefined;
    }
    renderSortIcon() {
        const { sortBy, _sorting } = this.props;
        if (!this.isSortable)
            return;
        const sortActive = _sorting.sortBy === sortBy;
        const sortIconName = (!sortActive || _sorting.orderBy === "desc") ? "arrow_drop_down" : "arrow_drop_up";
        return (<Icon className={cssNames("sortIcon", { enabled: sortActive })} material={sortIconName}/>);
    }
    renderCheckbox() {
        const { checkbox, isChecked } = this.props;
        const showCheckbox = isChecked !== undefined;
        if (checkbox && showCheckbox) {
            return <Checkbox value={isChecked}/>;
        }
    }
    render() {
        const _a = this.props, { className, checkbox, isChecked, sortBy, _sort, _sorting, _nowrap, children, title } = _a, cellProps = __rest(_a, ["className", "checkbox", "isChecked", "sortBy", "_sort", "_sorting", "_nowrap", "children", "title"]);
        const classNames = cssNames("TableCell", className, {
            checkbox: checkbox,
            nowrap: _nowrap,
            sorting: this.isSortable,
        });
        const content = title || children;
        return (<div {...cellProps} className={classNames} onClick={this.onClick}>
        {this.renderCheckbox()}
        {_nowrap ? <div className="content">{content}</div> : content}
        {this.renderSortIcon()}
      </div>);
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TableCell.prototype, "onClick", null);
//# sourceMappingURL=table-cell.jsx.map