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
var AddNamespaceDialog_1;
import "./add-namespace-dialog.scss";
import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Dialog } from "../dialog";
import { Wizard, WizardStep } from "../wizard";
import { namespaceStore } from "./namespace.store";
import { Input } from "../input";
import { systemName } from "../input/input.validators";
import { Notifications } from "../notifications";
let AddNamespaceDialog = AddNamespaceDialog_1 = class AddNamespaceDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.namespace = "";
        this.close = () => {
            AddNamespaceDialog_1.close();
        };
        this.addNamespace = () => __awaiter(this, void 0, void 0, function* () {
            const { namespace } = this;
            const { onSuccess, onError } = this.props;
            try {
                yield namespaceStore.create({ name: namespace }).then(onSuccess);
                Notifications.ok(<>Namespace {namespace} save succeeded</>);
                this.close();
            }
            catch (err) {
                Notifications.error(err);
                onError && onError(err);
            }
        });
    }
    static open() {
        AddNamespaceDialog_1.isOpen = true;
    }
    static close() {
        AddNamespaceDialog_1.isOpen = false;
    }
    render() {
        const dialogProps = __rest(this.props, []);
        const { namespace } = this;
        const header = <h5>`Create Namespace`</h5>;
        return (<Dialog {...dialogProps} className="AddNamespaceDialog" isOpen={AddNamespaceDialog_1.isOpen} close={this.close}>
        <Wizard header={header} done={this.close}>
          <WizardStep contentClass="flex gaps column" nextLabel={`Create`} next={this.addNamespace}>
            <Input required autoFocus iconLeft="layers" placeholder={`Namespace`} validators={systemName} value={namespace} onChange={v => this.namespace = v.toLowerCase()}/>
          </WizardStep>
        </Wizard>
      </Dialog>);
    }
};
AddNamespaceDialog.isOpen = false;
__decorate([
    observable,
    __metadata("design:type", Object)
], AddNamespaceDialog.prototype, "namespace", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], AddNamespaceDialog, "isOpen", void 0);
AddNamespaceDialog = AddNamespaceDialog_1 = __decorate([
    observer
], AddNamespaceDialog);
export { AddNamespaceDialog };
//# sourceMappingURL=add-namespace-dialog.jsx.map