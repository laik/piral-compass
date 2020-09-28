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
import "./main-layout.scss";
import * as React from "react";
import { observable, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { matchPath } from "react-router-dom";
import { createStorage, cssNames } from "../../utils";
import { Tab, Tabs } from "../tabs";
import { Icon } from "../icon";
import { Sidebar } from "./sidebar";
import { configStore } from "../../config.store";
import { ErrorBoundary } from "../error-boundary";
import { Dock } from "../dock";
import { MenuItem } from "../menu";
import { MenuActions } from "../menu/menu-actions";
import { navigate, navigation } from "../../navigation";
import { themeStore } from "../../theme.store";
import { withRouter } from 'react-router';
import { kubeWatchApi } from '../../api/kube-watch-api';
import store from 'store';
import { Notifications } from "../notifications";
let Layout = class Layout extends React.Component {
    constructor() {
        super(...arguments);
        this.storage = createStorage("main_layout", { pinnedSidebar: true });
        this.isPinned = this.storage.get().pinnedSidebar;
        this.isAccessible = true;
        this.syncPinnedStateWithStorage = reaction(() => this.isPinned, isPinned => this.storage.merge({ pinnedSidebar: isPinned }));
        this.toggleSidebar = () => {
            this.isPinned = !this.isPinned;
            this.isAccessible = false;
            setTimeout(() => this.isAccessible = true, 250);
        };
        this.loginout = () => {
            configStore.reset();
            kubeWatchApi.reset();
            window.localStorage.removeItem('u_config');
            window.location.replace('/login');
        };
    }
    changeTheme() {
        if (themeStore.activeThemeId === 'kontena-light') {
            themeStore.setTheme('kontena-dark');
        }
        if (themeStore.activeThemeId === 'kontena-dark') {
            themeStore.setTheme('kontena-light');
        }
    }
    ifLogin() {
        const userConfig = store.get('u_config');
        if (!userConfig) {
            Notifications.error('Token Expired');
            setTimeout(() => {
                this.loginout();
            }, 1000);
            return null;
        }
    }
    renderUserMenu() {
        const userConfig = store.get('u_config');
        let userName = userConfig ? userConfig.userName : '';
        return (<div className="header-right">
          <span>{userName}</span>
          <MenuActions>
              <MenuItem onClick={this.changeTheme}>
                  <Icon material="brightness_medium"/>
                  <span className="title">`Theme`</span>
              </MenuItem>
              <MenuItem onClick={this.loginout}>
                  <Icon material="exit_to_app"/>
                  <span className="title">`Logout`</span>
              </MenuItem>
            </MenuActions>
      </div>);
    }
    render() {
        const { className, contentClass, headerClass, tabs, footer, footerClass, children } = this.props;
        const { clusterName, lensVersion, kubectlAccess } = configStore.config;
        const { pathname } = navigation.location;
        this.ifLogin();
        return (<div className={cssNames("MainLayout", className, themeStore.activeTheme.type)}>
        <header className={cssNames("flex gaps align-center", headerClass)}>
          <div className="box grow flex align-center">
            <div className="header-left">{clusterName && <span>{clusterName}</span>}</div>
            {this.renderUserMenu()}
          </div>
        </header>

        <aside className={cssNames("flex column", { pinned: this.isPinned, accessible: this.isAccessible })}>
          <Sidebar className="box grow" isPinned={this.isPinned} toggle={this.toggleSidebar}/>
        </aside>

        {tabs && (<Tabs center onChange={url => navigate(url)}>
            {tabs.map((_a) => {
            var { title, path, url } = _a, routeProps = __rest(_a, ["title", "path", "url"]);
            const isActive = !!matchPath(pathname, Object.assign({ path }, routeProps));
            return <Tab key={url} label={title} value={url} active={isActive}/>;
        })}
          </Tabs>)}

        <main className={contentClass}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

        <footer className={footerClass}>
          {footer === undefined ? <Dock /> : footer}
        </footer>
      </div>);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], Layout.prototype, "isPinned", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], Layout.prototype, "isAccessible", void 0);
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], Layout.prototype, "syncPinnedStateWithStorage", void 0);
Layout = __decorate([
    observer
], Layout);
export { Layout };
export const MainLayout = withRouter(Layout);
//# sourceMappingURL=main-layout.jsx.map