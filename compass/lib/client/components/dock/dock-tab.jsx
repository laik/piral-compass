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
import "./dock-tab.scss";
import React from "react";
import { observer } from "mobx-react";
import { autobind, cssNames, prevDefault } from "../../utils";
import { dockStore } from "./dock.store";
import { Tab } from "../tabs";
import { Icon } from "../icon";
let DockTab = class DockTab extends React.Component {
    get tabId() {
        return this.props.value.id;
    }
    close() {
        dockStore.closeTab(this.tabId);
    }
    render() {
        const _a = this.props, { className, moreActions } = _a, tabProps = __rest(_a, ["className", "moreActions"]);
        const { title, pinned } = tabProps.value;
        const label = (<div className="flex gaps align-center">
        <span className="title" title={title}>{title}</span>
        {moreActions}
        {!pinned && (<Icon small material="close" title={`Close (Ctrl+W)`} onClick={prevDefault(this.close)}/>)}
      </div>);
        return (<Tab {...tabProps} className={cssNames("DockTab", className, { pinned })} label={label}/>);
    }
};
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DockTab.prototype, "close", null);
DockTab = __decorate([
    observer
], DockTab);
export { DockTab };
//# sourceMappingURL=dock-tab.jsx.map