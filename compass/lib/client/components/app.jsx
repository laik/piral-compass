var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var App_1;
import "./app.scss";
import React from "react";
import store from 'store';
import { render } from "react-dom";
import { Redirect, Route, Router, Switch } from "react-router";
import { observer } from "mobx-react";
import { browserHistory } from "../navigation";
import { Notifications } from "./notifications";
import { NotFound } from "./+404";
import { configStore } from "../config.store";
import { ConfirmDialog } from "./confirm-dialog";
import { clusterRoute, clusterURL } from "./+cluster";
import { KubeConfigDialog } from "./kubeconfig-dialog";
import { Nodes, nodesRoute } from "./+nodes";
import { Namespaces, namespacesRoute } from "./+namespaces";
import { Cluster } from "./+cluster/cluster";
import { Events } from "./+events";
import { Login } from "./+login";
import { eventRoute } from "./+events";
import { ErrorBoundary } from "./error-boundary";
import { KubeObjectDetails } from "./kube-object";
import { CustomResources } from "./+custom-resources/custom-resources";
import { crdRoute } from "./+custom-resources";
let App = App_1 = class App extends React.Component {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            // render app
            render(<App_1 />, App_1.rootElem);
        });
    }
    ;
    render() {
        let homeUrl = '';
        const userConfig = store.get('u_config');
        if (userConfig) {
            configStore.setConfig(userConfig);
            let admin = userConfig.isClusterAdmin;
            // homeUrl = admin == 'true' ? clusterURL() : workloadsURL();
            homeUrl = admin == 'true' ? clusterURL() : 'login';
        }
        else {
            homeUrl = '/login';
        }
        return (<div>

        <Router history={browserHistory}>
          <ErrorBoundary>
            <Switch>
              <Route component={Cluster} {...clusterRoute}/>
              <Route component={Nodes} {...nodesRoute}/>
              <Route component={Namespaces} {...namespacesRoute}/>
              <Route component={Events} {...eventRoute}/>
              <Route component={CustomResources} {...crdRoute}/>
              <Redirect exact from="/" to={homeUrl}/>
              <Route component={Login} path="/login"/>
              <Route path="*" component={NotFound}/>
            </Switch>
            <KubeObjectDetails />
            <Notifications />
            <ConfirmDialog />
            <KubeConfigDialog />
          </ErrorBoundary>
        </Router>
      </div>);
    }
};
App.rootElem = document.getElementById('app');
App = App_1 = __decorate([
    observer
], App);
// run app
App.init();
//# sourceMappingURL=app.jsx.map