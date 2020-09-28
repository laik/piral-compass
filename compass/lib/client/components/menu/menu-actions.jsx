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
import "./menu-actions.scss";
import React, { isValidElement } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { autobind, cssNames } from "../../utils";
import { ConfirmDialog } from "../confirm-dialog";
import { Icon } from "../icon";
import { Menu, MenuItem } from "../menu";
import uniqueId from "lodash/uniqueId";
import isString from "lodash/isString";
import store from 'store';
let MenuActions = class MenuActions extends React.Component {
    constructor() {
        super(...arguments);
        this.id = uniqueId("menu_actions_");
        this.isOpen = !!this.props.toolbar;
        this.toggle = () => {
            if (this.props.toolbar)
                return;
            this.isOpen = !this.isOpen;
        };
    }
    remove() {
        const { removeAction } = this.props;
        let { removeConfirmationMessage } = this.props;
        if (typeof removeConfirmationMessage === "function") {
            removeConfirmationMessage = removeConfirmationMessage();
        }
        ConfirmDialog.open({
            ok: removeAction,
            labelOk: `Remove`,
            message: <div>{removeConfirmationMessage}</div>,
        });
    }
    renderTriggerIcon() {
        if (this.props.toolbar)
            return;
        const { triggerIcon = "more_vert" } = this.props;
        let className;
        if (isValidElement(triggerIcon)) {
            className = cssNames(triggerIcon.props.className, { active: this.isOpen });
            return React.cloneElement(triggerIcon, { id: this.id, className });
        }
        const iconProps = Object.assign({ id: this.id, interactive: true, material: isString(triggerIcon) ? triggerIcon : undefined, active: this.isOpen }, (typeof triggerIcon === "object" ? triggerIcon : {}));
        if (iconProps.tooltip && this.isOpen) {
            delete iconProps.tooltip; // don't show tooltip for icon when menu is open
        }
        return (<Icon {...iconProps}/>);
    }
    render() {
        const _a = this.props, { className, toolbar, children, updateAction, removeAction, triggerIcon, removeConfirmationMessage } = _a, menuProps = __rest(_a, ["className", "toolbar", "children", "updateAction", "removeAction", "triggerIcon", "removeConfirmationMessage"]);
        const menuClassName = cssNames("MenuActions flex", className, {
            toolbar: toolbar,
            gaps: toolbar,
        });
        const autoClose = !toolbar;
        let isClusterAdmin = false;
        const userConfig = store.get('u_config');
        if (userConfig) {
            isClusterAdmin = userConfig.isClusterAdmin;
        }
        return (<>
        {this.renderTriggerIcon()}
        <Menu htmlFor={this.id} isOpen={this.isOpen} open={this.toggle} close={this.toggle} className={menuClassName} usePortal={autoClose} closeOnScroll={autoClose} closeOnClickItem={autoClose} closeOnClickOutside={autoClose} {...menuProps}>
          {children}
          {updateAction && isClusterAdmin && (<MenuItem onClick={updateAction}>
              <Icon material="edit" interactive={toolbar} title={`Edi`}/>
              <span className="title">`Edi`</span>
            </MenuItem>)}
          {removeAction && (<MenuItem onClick={this.remove}>
              <Icon material="delete" interactive={toolbar} title={`Delete`}/>
              <span className="title">`Remove`</span>
            </MenuItem>)}
        </Menu>
      </>);
    }
};
MenuActions.defaultProps = {
    get removeConfirmationMessage() {
        return `Remove item?`;
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], MenuActions.prototype, "isOpen", void 0);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuActions.prototype, "remove", null);
MenuActions = __decorate([
    observer
], MenuActions);
export { MenuActions };
//# sourceMappingURL=menu-actions.jsx.map