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
var KubeConfigDialog_1;
import "./kubeconfig-dialog.scss";
import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import jsYaml from "js-yaml";
import { AceEditor } from "../ace-editor";
import { kubeConfigApi } from "../../api/endpoints";
import { copyToClipboard, downloadFile, cssNames } from "../../utils";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Icon } from "../icon";
import { Notifications } from "../notifications";
import { Wizard, WizardStep } from "../wizard";
import { themeStore } from "../../theme.store";
let KubeConfigDialog = KubeConfigDialog_1 = class KubeConfigDialog extends React.Component {
    constructor() {
        super(...arguments);
        this.config = ""; // parsed kubeconfig in yaml format
        this.close = () => {
            KubeConfigDialog_1.close();
        };
        this.onOpen = () => {
            this.loadConfig();
        };
        this.copyToClipboard = () => {
            if (this.config && copyToClipboard(this.configTextArea)) {
                Notifications.ok(`Config copied to clipboard`);
            }
        };
        this.download = () => {
            downloadFile("config", this.config, "text/yaml");
        };
    }
    static open(data) {
        KubeConfigDialog_1.isOpen = true;
        KubeConfigDialog_1.data = data;
    }
    static close() {
        KubeConfigDialog_1.isOpen = false;
    }
    get data() {
        return KubeConfigDialog_1.data;
    }
    loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = yield this.data.loader().catch(err => {
                Notifications.error(err);
                this.close();
            });
            this.config = config ? jsYaml.dump(config) : "";
        });
    }
    render() {
        const { isOpen, data = {} } = KubeConfigDialog_1;
        const dialogProps = __rest(this.props, []);
        const yamlConfig = this.config;
        const header = <h5>{data.title || `Kubeconfig File`}</h5>;
        const buttons = (<div className="actions flex gaps">
        <Button plain onClick={this.copyToClipboard}>
          <Icon material="assignment"/> `Copy to clipboard`
        </Button>
        <Button plain onClick={this.download}>
          <Icon material="cloud_download"/> `Download file`
        </Button>
        <Button plain className="box right" onClick={this.close}>
          `Close`
        </Button>
      </div>);
        return (<Dialog {...dialogProps} className={cssNames("KubeConfigDialog", themeStore.activeTheme.type)} isOpen={isOpen} onOpen={this.onOpen} close={this.close}>
        <Wizard header={header}>
          <WizardStep customButtons={buttons} prev={this.close}>
            <AceEditor mode="yaml" value={yamlConfig} readOnly/>
            <textarea className="config-copy" readOnly defaultValue={yamlConfig} ref={e => this.configTextArea = e}/>
          </WizardStep>
        </Wizard>
      </Dialog>);
    }
};
KubeConfigDialog.isOpen = false;
KubeConfigDialog.data = null;
__decorate([
    observable.ref,
    __metadata("design:type", HTMLTextAreaElement)
], KubeConfigDialog.prototype, "configTextArea", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], KubeConfigDialog.prototype, "config", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], KubeConfigDialog, "isOpen", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], KubeConfigDialog, "data", void 0);
KubeConfigDialog = KubeConfigDialog_1 = __decorate([
    observer
], KubeConfigDialog);
export { KubeConfigDialog };
export function openUserKubeConfig() {
    KubeConfigDialog.open({
        loader: () => kubeConfigApi.getUserConfig()
    });
}
export function openServiceAccountKubeConfig(account) {
    const accountName = account.getName();
    const namespace = account.getNs();
    KubeConfigDialog.open({
        title: `{accountName} kubeconfig`,
        loader: () => {
            return kubeConfigApi.getServiceAccountConfig(accountName, namespace);
        }
    });
}
//# sourceMappingURL=kubeconfig-dialog.jsx.map