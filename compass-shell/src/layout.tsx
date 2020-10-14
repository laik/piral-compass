import * as React from 'react';
import {ComponentsState, ErrorComponentsState, SwitchErrorInfo, MenuItemProps, Menu, Notifications} from 'piral';
import {Link, matchPath} from 'react-router-dom';
import {cssNames} from "compass-base/client/utils/index";
import {themeStore} from "compass-base/client/theme.store";
import {Sidebar} from "compass-base/client/components/layout/sidebar";
import "compass-base/client/components/layout/main-layout.scss";

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
  Layout: ({ children }) => {

    return (
      <div className={cssNames("MainLayout", themeStore.activeTheme.type)}>
        <header className={cssNames("flex gaps align-center")}>
          <div className="box grow flex align-center" />
        </header>

        <aside className={cssNames("flex column", { pinned: true, accessible: true })}>
          <Sidebar
            className="box grow"
            isPinned={true}
            toggle={() => {}}
          />
        </aside>

        <main>
          {children}
        </main>
      </div>
    )
  },
  MenuContainer: ({children}) => {
    const [collapsed, setCollapsed] = React.useState(true);
    return (
      <header>
        <nav
          className="navbar navbar-light navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Piral
            </Link>
            <button
              aria-label="Toggle navigation"
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="navbar-toggler mr-2">
              <span className="navbar-toggler-icon"/>
            </button>
            <div
              className={`collapse navbar-collapse d-sm-inline-flex flex-sm-row-reverse ${collapsed ? '' : 'show'}`}
              aria-expanded={!collapsed}>
              <ul className="navbar-nav flex-grow">
                {children}
              </ul>
            </div>
          </div>
        </nav>
      </header>
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

