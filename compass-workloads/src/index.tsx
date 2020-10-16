import * as React from 'react';
import { PiletApi } from 'compass-shell';
import {Jobs} from "./+workloads-jobs";
import {Icon} from "compass-base/client/components/icon";
import {SidebarNavItem} from "compass-base/client/components/layout/sidebar";

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });
  app.registerMenu(() =>
    <SidebarNavItem
      id="namespaces"
      url={""}
      icon={<Icon material="layers"/>}
      text={`Namespaces`}
    />
  );
  app.registerPage("/hello", Jobs);
}
