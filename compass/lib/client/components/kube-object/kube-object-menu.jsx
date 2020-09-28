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
import React from "react";
import { autobind, cssNames } from "../../utils";
import { editResourceTab } from "../dock/edit-resource.store";
import { MenuActions } from "../menu/menu-actions";
import { hideDetails } from "../../navigation";
import { apiManager } from "../../api/api-manager";
export class KubeObjectMenu extends React.Component {
    get store() {
        const { object } = this.props;
        if (!object)
            return;
        return apiManager.getStore(object.selfLink);
    }
    get isEditable() {
        const { editable } = this.props;
        return editable !== undefined ? editable : !!(this.store && this.store.update);
    }
    get isRemovable() {
        const { removable } = this.props;
        return removable !== undefined ? removable : !!(this.store && this.store.remove);
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            hideDetails();
            editResourceTab(this.props.object);
        });
    }
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            hideDetails();
            const { object, removeAction } = this.props;
            if (removeAction)
                yield removeAction();
            else
                yield this.store.remove(object);
        });
    }
    renderRemoveMessage() {
        const { object } = this.props;
        const resourceKind = object.kind;
        const resourceName = object.getName();
        return (<p>`Remove {resourceKind} <b>{resourceName}</b>?`</p>);
    }
    render() {
        const { remove, update, renderRemoveMessage, isEditable, isRemovable } = this;
        const _a = this.props, { className, object, editable, removable } = _a, menuProps = __rest(_a, ["className", "object", "editable", "removable"]);
        return (<MenuActions className={cssNames("KubeObjectMenu", className)} updateAction={isEditable ? update : undefined} removeAction={isRemovable ? remove : undefined} removeConfirmationMessage={renderRemoveMessage} {...menuProps}/>);
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubeObjectMenu.prototype, "update", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubeObjectMenu.prototype, "remove", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KubeObjectMenu.prototype, "renderRemoveMessage", null);
//# sourceMappingURL=kube-object-menu.jsx.map