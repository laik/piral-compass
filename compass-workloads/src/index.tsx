import * as React from 'react';
import { PiletApi } from 'compass-shell';
import {observer} from "mobx-react";
import {observable} from "mobx";
import {PageComponentProps} from "compass-shell";
import {Jobs} from "./+workloads-jobs";

@observer class Timer extends React.Component<PageComponentProps, any> {

  @observable secondsPassed = 0;

  render() {
    setInterval(() => {
      this.secondsPassed++;
    }, 1000);
    return (<span>Seconds passed: { this.secondsPassed } </span> )
  }
}

export function setup(app: PiletApi) {
  app.showNotification('Hello from Piral!', {
    autoClose: 2000,
  });
  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>
  );
  app.registerPage("/hello", Jobs);
}
