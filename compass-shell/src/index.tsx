import * as React from 'react';
import 'piral/polyfills';
import { renderInstance } from 'piral';
import { layout, errors } from './layout';
import {themeStore} from "compass-base/client/theme.store";
import "compass-base/client/components/app.scss";
import { createMenuApi } from 'piral';

// change to your feed URL here (either using feed.piral.cloud or your own service)

themeStore.setTheme('kontena-light');

const piral = renderInstance({
  layout,
  errors,
  // plugins: [createMenuApi()],
  requestPilets() {
    return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
  }
  // requestPilets() {
  //   return fetch('http://localhost:9000/api/v1/pilet')
  //   .then(res => res.json())
  //   .then(res => res.items);
  // }
});