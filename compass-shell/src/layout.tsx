import * as React from 'react';
import {ComponentsState, ErrorComponentsState, SwitchErrorInfo, MenuItemProps, Menu, Notifications} from 'piral';
import {Link, matchPath} from 'react-router-dom';
import "compass-base/client/components/layout/main-layout.scss";
import {Layout} from "./main-layout";
import {SidebarNavItem} from "./sidebar";
import {Icon} from "compass-base/client/components/icon";

export const errors: Partial<ErrorComponentsState> = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back <Link to="/">to the dashboard</Link>.
      </p>
    </div>
  ),
};


export const layout: Partial<ComponentsState> = {
  ErrorInfo: props => (
    <div>
      <h1>Error</h1>
      <SwitchErrorInfo {...props} />
    </div>
  ),
  DashboardContainer: ({children}) => (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new microfrontend app shell, built with:</p>
      <div className="tiles">
        {children}
      </div>
    </div>
  ),
  DashboardTile: ({columns, rows, children}) => <div className={`tile cols-${columns} rows-${rows}`}>{children}</div>,
  Layout: Layout,
  MenuContainer: ({children}) => {
    console.log(children);
    return (
      <>
        <SidebarNavItem
          id="events"
          url={""}
          routePath={""}
          icon={<Icon material="access_time"/>}
          text={`Events`}
        />
        {children}
      </>
    );
  },
  NotificationsHost: ({children}) => <div className="notifications">{children}</div>,
  NotificationsToast: ({options, onClose, children}) => (
    <div className={`notification-toast ${options.type}`}>
      <div className="notification-toast-details">
        {options.title && <div className="notification-toast-title">{options.title}</div>}
        <div className="notification-toast-description">{children}</div>
      </div>
      <div className="notification-toast-close" onClick={onClose}/>
    </div>
  ),
};

