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
var ConfirmDialog_1;
import "./confirm-dialog.scss";
import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { cssNames, noop, prevDefault } from "../../utils";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Icon } from "../icon";
let ConfirmDialog = ConfirmDialog_1 = class ConfirmDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.isSaving = false;
        this.defaultParams = {
            ok: noop,
            labelOk: `Ok`,
            labelCancel: `Cancel`,
            icon: "warning",
        };
        this.ok = () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.isSaving = true;
                yield Promise.resolve(this.params.ok()).catch(noop);
            }
            finally {
                this.isSaving = false;
            }
            this.close();
        });
        this.onClose = () => {
            this.isSaving = false;
        };
        this.close = () => {
            ConfirmDialog_1.close();
        };
    }
    static open(params) {
        ConfirmDialog_1.isOpen = true;
        ConfirmDialog_1.params = params;
    }
    static close() {
        ConfirmDialog_1.isOpen = false;
    }
    get params() {
        return Object.assign({}, this.defaultParams, ConfirmDialog_1.params);
    }
    render() {
        const _a = this.props, { className } = _a, dialogProps = __rest(_a, ["className"]);
        const { icon, labelOk, labelCancel, message } = this.params;
        return (<Dialog {...dialogProps} className={cssNames("ConfirmDialog", className, icon)} isOpen={ConfirmDialog_1.isOpen} onClose={this.onClose} close={this.close}>
        <div className="confirm-content">
          <Icon big material={icon}/>
          {message}
        </div>
        <div className="confirm-buttons">
          <Button plain className="cancel" label={labelCancel} onClick={prevDefault(this.close)}/>
          <Button autoFocus primary className="ok" label={labelOk} onClick={prevDefault(this.ok)} waiting={this.isSaving}/>
        </div>
      </Dialog>);
    }
};
ConfirmDialog.isOpen = false;
__decorate([
    observable,
    __metadata("design:type", Object)
], ConfirmDialog.prototype, "isSaving", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ConfirmDialog, "isOpen", void 0);
__decorate([
    observable.ref,
    __metadata("design:type", Object)
], ConfirmDialog, "params", void 0);
ConfirmDialog = ConfirmDialog_1 = __decorate([
    observer
], ConfirmDialog);
export { ConfirmDialog };
//# sourceMappingURL=confirm-dialog.jsx.map