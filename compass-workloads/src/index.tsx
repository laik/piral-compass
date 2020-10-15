import * as React from 'react';
import { PiletApi } from 'compass-shell';
import {Jobs} from "./+workloads-jobs";

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });
  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>
  );
  app.registerPage("/events", Jobs);
}
