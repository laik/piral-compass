var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
import './items-list.scss';
import * as React from 'react';
import { observer } from "mobx-react";
import { cssNames } from "../../utils";
import { Icon } from "../icon";
let ItemsList = class ItemsList extends React.Component {
    onClickItem(itemValue) {
        const { selectedValues, multiSelect, onSelectChange } = this.props;
        if (multiSelect) {
            const itemIndex = selectedValues.findIndex(value => value === itemValue);
            if (itemIndex > -1) {
                // remove
                const newSelectedValues = [...selectedValues];
                newSelectedValues.splice(itemIndex, 1);
                onSelectChange(itemValue, newSelectedValues);
            }
            else {
                // add
                const newSelectedValues = [].concat(selectedValues, itemValue);
                onSelectChange(itemValue, newSelectedValues);
            }
        }
        else {
            onSelectChange(itemValue, [itemValue]);
        }
    }
    render() {
        const { disabled, inline, selectable, selectedValues, showSelectedItems, showSelectedIcon } = this.props;
        let { className, children } = this.props;
        className = cssNames('ItemsList flex', className, {
            selectable: selectable,
            "inline wrap": inline,
            column: !inline,
        });
        if (selectable) {
            children = React.Children.toArray(children).map((item) => {
                const itemValue = item.props.value;
                const isSelected = selectedValues.includes(itemValue);
                const isDisabled = disabled !== undefined ? disabled : item.props.disabled;
                if (showSelectedItems === false && isSelected) {
                    return null;
                }
                const onClick = (evt) => {
                    if (item.props.onClick)
                        item.props.onClick(evt);
                    this.onClickItem(itemValue);
                };
                return React.cloneElement(item, {
                    showSelectedIcon: showSelectedIcon,
                    selected: isSelected,
                    disabled: isDisabled,
                    onClick: onClick,
                });
            });
        }
        return (<ul className={className}>
        {children}
      </ul>);
    }
};
ItemsList.defaultProps = {
    selectable: true,
    multiSelect: true,
    showSelectedIcon: false,
};
ItemsList = __decorate([
    observer
], ItemsList);
export { ItemsList };
const defaultProps = {
    showSelectedIcon: true,
};
export class Item extends React.Component {
    render() {
        const _a = this.props, { disabled, selected, value, showSelectedIcon, children } = _a, itemProps = __rest(_a, ["disabled", "selected", "value", "showSelectedIcon", "children"]);
        let { className } = this.props;
        className = cssNames('Item flex gaps', className, { disabled, selected });
        const actionIcon = selected ? "remove" : "add";
        return (<li {...itemProps} className={className}>
        <div className="value box grow">
          {children}
        </div>
        {showSelectedIcon && selected && (<Icon material="check" className="tick-icon box right"/>)}
        {!showSelectedIcon && (<Icon className="action-icon" material={actionIcon}/>)}
      </li>);
    }
}
Item.defaultProps = defaultProps;
//# sourceMappingURL=items-list.jsx.map