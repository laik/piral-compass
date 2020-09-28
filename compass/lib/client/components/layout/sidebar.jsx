var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./sidebar.scss";
import * as React from "react";
import { computed, observable, reaction } from "mobx";
import { observer } from "mobx-react";
import { matchPath, NavLink } from "react-router-dom";
import { createStorage, cssNames } from "../../utils";
import { Icon } from "../icon";
import { namespacesURL } from "../+namespaces";
import { nodesURL } from "../+nodes";
import { clusterURL } from "../+cluster";
import { eventRoute, eventsURL } from "../+events";
import { namespaceStore } from "../+namespaces/namespace.store";
import { crdStore } from "../+custom-resources";
import { CrdList, crdResourcesRoute, crdRoute, crdURL } from "../+custom-resources";
import { CustomResources } from "../+custom-resources/custom-resources";
import { navigation } from "../../navigation";
import store from 'store';
const SidebarContext = React.createContext({ pinned: false });
let Sidebar = class Sidebar extends React.Component {
    renderCustomResources() {
        return Object.entries(crdStore.groups).map(([group, crds]) => {
            const submenus = crds.map(crd => {
                return {
                    title: crd.getResourceKind(),
                    component: CrdList,
                    url: crd.getResourceUrl(),
                    path: crdResourcesRoute.path,
                };
            });
            return (<SidebarNavItem key={group} id={group} className="sub-menu-parent" url={crdURL({ query: { groups: group } })} subMenus={submenus} text={group}/>);
        });
    }
    render() {
        const { toggle, isPinned, className } = this.props;
        const userConfig = store.get('u_config');
        const isClusterAdmin = userConfig ? userConfig.isClusterAdmin : false;
        const query = namespaceStore.getContextParams();
        return (<SidebarContext.Provider value={{ pinned: isPinned }}>
        <div className={cssNames("Sidebar flex column", className, { pinned: isPinned })}>
          <div className="header flex align-center">
            <NavLink exact to="/workloads" className="box grow">
              <Icon svg="compass" className="logo-icon"/>
              <div className="logo-text">Compass</div>
            </NavLink>
            <Icon className="pin-icon" material={isPinned ? "keyboard_arrow_left" : "keyboard_arrow_right"} onClick={toggle} tooltip={isPinned ? `Compact view` : `Extended view`} focusable={false}/>
          </div>
          <div className="sidebar-nav flex column box grow-fixed">
            <SidebarNavItem isHidden={!isClusterAdmin} id="cluster" url={clusterURL()} text={`Cluster`} icon={<Icon svg="kube"/>}/>
            <SidebarNavItem isHidden={!isClusterAdmin} id="nodes" url={nodesURL()} text={`Nodes`} icon={<Icon svg="nodes"/>}/>
            <SidebarNavItem id="events" url={eventsURL({ query })} routePath={eventRoute.path} icon={<Icon material="access_time"/>} text={`Events`}/>
            <SidebarNavItem isHidden={!isClusterAdmin} id="namespaces" url={namespacesURL()} icon={<Icon material="layers"/>} text={`Namespaces`}/>
            <SidebarNavItem isHidden={!isClusterAdmin} id="custom-resources" url={crdURL()} subMenus={CustomResources.tabRoutes} routePath={crdRoute.path} icon={<Icon material="extension"/>} text={`Custom Resources`}>
              {this.renderCustomResources()}
            </SidebarNavItem>
          </div>
        </div>
      </SidebarContext.Provider>);
    }
};
Sidebar = __decorate([
    observer
], Sidebar);
export { Sidebar };
const navItemStorage = createStorage("sidebar_menu_item", []);
const navItemState = observable.map(navItemStorage.get());
reaction(() => [...navItemState], value => navItemStorage.set(value));
let SidebarNavItem = class SidebarNavItem extends React.Component {
    constructor() {
        super(...arguments);
        this.toggleSubMenu = () => {
            navItemState.set(this.props.id, !this.isExpanded);
        };
        this.isActive = () => {
            const { routePath, url } = this.props;
            const { pathname } = navigation.location;
            return !!matchPath(pathname, {
                path: routePath || url
            });
        };
    }
    get isExpanded() {
        return navItemState.get(this.props.id);
    }
    render() {
        const { isHidden, subMenus = [], icon, text, url, children, className } = this.props;
        if (isHidden) {
            return null;
        }
        const extendedView = (subMenus.length > 0 || children) && this.context.pinned;
        if (extendedView) {
            const isActive = this.isActive();
            return (<div className={cssNames("SidebarNavItem", className)}>
          <div className={cssNames("nav-item", { active: isActive })} onClick={this.toggleSubMenu}>
            {icon}
            <span className="link-text">{text}</span>
            <Icon className="expand-icon" material={this.isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}/>
          </div>
          <ul className={cssNames("sub-menu", { active: isActive })}>
            {subMenus.map(({ title, url }) => (<NavLink key={url} to={url} className={cssNames({ visible: this.isExpanded })}>
                {title}
              </NavLink>))}
            {React.Children.toArray(children).map((child) => {
                return React.cloneElement(child, {
                    className: cssNames(child.props.className, { visible: this.isExpanded })
                });
            })}
          </ul>
        </div>);
        }
        return (<NavLink className={cssNames("SidebarNavItem", className)} to={url} isActive={this.isActive}>
        {icon}
        <span className="link-text">{text}</span>
      </NavLink>);
    }
};
SidebarNavItem.contextType = SidebarContext;
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SidebarNavItem.prototype, "isExpanded", null);
SidebarNavItem = __decorate([
    observer
], SidebarNavItem);
//# sourceMappingURL=sidebar.jsx.map