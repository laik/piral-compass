var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./dock.scss";
import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { autobind, cssNames, prevDefault } from "../../utils";
import { Draggable } from "../draggable";
import { Icon } from "../icon";
import { Tabs } from "../tabs/tabs";
import { MenuItem } from "../menu";
import { MenuActions } from "../menu/menu-actions";
import { dockStore } from "./dock.store";
import { DockTab } from "./dock-tab";
import { TerminalTab } from "./terminal-tab";
import { TerminalWindow } from "./terminal-window";
import { CreateResource } from "./create-resource";
import { EditResource } from "./edit-resource";
import { isTerminalTab } from "./terminal.store";
import { createResourceTab, isCreateResourceTab } from "./create-resource.store";
import { isEditResourceTab } from "./edit-resource.store";
import store from 'store';
let Dock = class Dock extends React.Component {
    constructor() {
        super(...arguments);
        this.onResizeStart = () => {
            const { isOpen, open, setHeight, minHeight } = dockStore;
            if (!isOpen) {
                open();
                setHeight(minHeight);
            }
        };
        this.onResize = ({ offsetY }) => {
            const { isOpen, close, height, setHeight, minHeight, defaultHeight } = dockStore;
            const newHeight = height + offsetY;
            if (height > newHeight && newHeight < minHeight) {
                setHeight(defaultHeight);
                close();
            }
            else if (isOpen) {
                setHeight(newHeight);
            }
        };
        this.onKeydown = (evt) => {
            const { close, closeTab, selectedTab, fullSize, toggleFillSize } = dockStore;
            if (!selectedTab)
                return;
            const { code, ctrlKey, shiftKey } = evt.nativeEvent;
            if (shiftKey && code === "Escape") {
                close();
            }
            if (ctrlKey && code === "KeyW") {
                if (selectedTab.pinned)
                    close();
                else
                    closeTab(selectedTab.id);
            }
        };
        this.onChangeTab = (tab) => {
            const { open, selectTab } = dockStore;
            open();
            selectTab(tab.id);
        };
    }
    renderTab(tab) {
        if (isTerminalTab(tab)) {
            return <TerminalTab value={tab}/>;
        }
        if (isCreateResourceTab(tab) || isEditResourceTab(tab)) {
            return <DockTab value={tab} icon="edit"/>;
        }
    }
    renderTabContent() {
        const { isOpen, height, selectedTab: tab } = dockStore;
        if (!isOpen || !tab)
            return;
        return (<div className="tab-content" style={{ flexBasis: height }}>
        {isCreateResourceTab(tab) && <CreateResource tab={tab}/>}
        {isEditResourceTab(tab) && <EditResource tab={tab}/>}
        {isTerminalTab(tab) && <TerminalWindow tab={tab}/>}
      </div>);
    }
    render() {
        const { className } = this.props;
        const { isOpen, toggle, tabs, toggleFillSize, selectedTab, hasTabs, fullSize } = dockStore;
        let isClusterAdmin = false;
        const userConfig = store.get('u_config');
        if (userConfig) {
            isClusterAdmin = userConfig.isClusterAdmin;
        }
        return (<div className={cssNames("Dock", className, { isOpen, fullSize })} onKeyDown={this.onKeydown} tabIndex={-1}>
        <Draggable className={cssNames("resizer", { disabled: !hasTabs() })} horizontal={false} onStart={this.onResizeStart} onEnter={this.onResize}/>
        <div className="tabs-container flex align-center" onDoubleClick={prevDefault(toggle)}>
          <Tabs autoFocus={isOpen} className="dock-tabs" value={selectedTab} onChange={this.onChangeTab} children={tabs.map(tab => <Fragment key={tab.id}>{this.renderTab(tab)}</Fragment>)}/>
          <div className="toolbar flex gaps align-center box grow">
            <div className="dock-menu box grow">
              <div hidden={!isClusterAdmin}>
                <MenuActions usePortal triggerIcon={{ material: "add", tooltip: `New tab` }} closeOnScroll={false}>
                  
                  
                  
                  
                  <MenuItem onClick={() => createResourceTab()}>
                    <Icon small material="create"/>
                    `Create resource`
                  </MenuItem>
                </MenuActions>
              </div>
            </div>
            {hasTabs() && (<>
                <Icon material={fullSize ? "fullscreen_exit" : "fullscreen"} tooltip={fullSize ? `Exit full size mode` : `Fit to window`} onClick={toggleFillSize}/>
                <Icon material={`keyboard_arrow_${isOpen ? "down" : "up"}`} tooltip={isOpen ? `Minimize` : `Open`} onClick={toggle}/>
              </>)}
          </div>
        </div>
        {this.renderTabContent()}
      </div>);
    }
};
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Dock.prototype, "renderTab", null);
Dock = __decorate([
    observer
], Dock);
export { Dock };
//# sourceMappingURL=dock.jsx.map