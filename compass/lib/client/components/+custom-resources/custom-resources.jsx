var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CustomResources_1;
import React from "react";
import { observer } from "mobx-react";
import { Redirect, Route, Switch } from "react-router";
import { MainLayout } from "../layout/main-layout";
import { crdResourcesRoute, crdRoute, crdURL, crdDefinitionsRoute } from "./crd.route";
import { CrdList } from "./crd-list";
import { CrdResources } from "./crd-resources";
// todo: next steps - customization via plugins
// todo: list views (rows content), full details view and if possible chart/prometheus hooks
let CustomResources = CustomResources_1 = class CustomResources extends React.Component {
    static get tabRoutes() {
        return [
            {
                title: `Definitions`,
                component: CustomResources_1,
                url: crdURL(),
                path: crdRoute.path,
            }
        ];
    }
    render() {
        return (<MainLayout>
        <Switch>
          <Route component={CrdList} {...crdDefinitionsRoute} exact/>
          <Route component={CrdResources} {...crdResourcesRoute}/>
          <Redirect to={crdURL()}/>
        </Switch>
      </MainLayout>);
    }
};
CustomResources = CustomResources_1 = __decorate([
    observer
], CustomResources);
export { CustomResources };
//# sourceMappingURL=custom-resources.jsx.map