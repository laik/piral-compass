var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./terminal-tab.scss";
import React from "react";
import { observer } from "mobx-react";
import { autobind, cssNames } from "../../utils";
import { DockTab } from "./dock-tab";
import { Icon } from "../icon";
import { terminalStore } from "./terminal.store";
let TerminalTab = class TerminalTab extends React.Component {
    get tabId() {
        return this.props.value.id;
    }
    get isDisconnected() {
        return terminalStore.isDisconnected(this.tabId);
    }
    reconnect() {
        terminalStore.reconnect(this.tabId);
    }
    render() {
        const tabIcon = <Icon material="keyboard"/>;
        const className = cssNames("TerminalTab", this.props.className, {
            disconnected: this.isDisconnected,
        });
        return (<DockTab {...this.props} className={className} icon={tabIcon} moreActions={this.isDisconnected && (<Icon small material="refresh" className="restart-icon" tooltip={`Restart session`} onClick={this.reconnect}/>)}/>);
    }
};
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TerminalTab.prototype, "reconnect", null);
TerminalTab = __decorate([
    observer
], TerminalTab);
export { TerminalTab };
//# sourceMappingURL=terminal-tab.jsx.map