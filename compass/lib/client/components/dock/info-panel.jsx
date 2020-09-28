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
import "./info-panel.scss";
import React, { Component } from "react";
import { computed, observable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { cssNames } from "../../utils";
import { Button } from "../button";
import { Icon } from "../icon";
import { Spinner } from "../spinner";
import { dockStore } from "./dock.store";
import { Notifications } from "../notifications";
let InfoPanel = class InfoPanel extends Component {
    constructor() {
        super(...arguments);
        this.error = "";
        this.waiting = false;
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            const { showNotifications } = this.props;
            this.result = "";
            this.error = "";
            this.waiting = true;
            try {
                this.result = yield this.props.submit().finally(() => {
                    this.waiting = false;
                });
                if (showNotifications)
                    Notifications.ok(this.result);
            }
            catch (error) {
                this.error = error.toString();
                if (showNotifications)
                    Notifications.error(this.error);
                throw error;
            }
        });
        this.submitAndClose = () => __awaiter(this, void 0, void 0, function* () {
            yield this.submit();
            this.close();
        });
        this.close = () => {
            dockStore.closeTab(this.props.tabId);
        };
    }
    componentDidMount() {
        disposeOnUnmount(this, [
            reaction(() => this.props.tabId, () => {
                this.result = "";
                this.error = "";
                this.waiting = false;
            })
        ]);
    }
    get errorInfo() {
        return this.error || this.props.error;
    }
    renderInfo() {
        if (!this.props.showInlineInfo) {
            return;
        }
        const { result, errorInfo } = this;
        return (<>
        {result && (<div className="success flex align-center">
            <Icon material="done"/> <span>{result}</span>
          </div>)}
        {errorInfo && (<div className="error flex align-center">
            <Icon material="error_outline"/>
            <span>{errorInfo}</span>
          </div>)}
      </>);
    }
    render() {
        const { className, controls, submitLabel, disableSubmit, error, submittingMessage, showSubmitClose } = this.props;
        const { submit, close, submitAndClose, waiting } = this;
        const isDisabled = !!(disableSubmit || waiting || error);
        return (<div className={cssNames("InfoPanel flex gaps align-center", className)}>
        <div className="controls">
          {controls}
        </div>
        <div className="info flex gaps align-center">
          {waiting ? <><Spinner /> {submittingMessage}</> : this.renderInfo()}
        </div>
        <Button plain label={`Cancel`} onClick={close}/>
        <Button primary active label={submitLabel} onClick={submit} disabled={isDisabled}/>
        {showSubmitClose && (<Button primary active label={`{submitLabel} & Close`} onClick={submitAndClose} disabled={isDisabled}/>)}
      </div>);
    }
};
InfoPanel.defaultProps = {
    submitLabel: `Submit`,
    submittingMessage: `Submitting..`,
    showSubmitClose: true,
    showInlineInfo: true,
    showNotifications: true,
};
__decorate([
    observable.ref,
    __metadata("design:type", Object)
], InfoPanel.prototype, "result", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], InfoPanel.prototype, "error", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], InfoPanel.prototype, "waiting", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InfoPanel.prototype, "errorInfo", null);
InfoPanel = __decorate([
    observer
], InfoPanel);
export { InfoPanel };
//# sourceMappingURL=info-panel.jsx.map