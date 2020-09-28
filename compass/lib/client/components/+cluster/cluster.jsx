var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import "./cluster.scss";
import React from "react";
import store from "store";
import { computed, reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { MainLayout } from "../layout/main-layout";
import { ClusterIssues } from "./cluster-issues";
import { Spinner } from "../spinner";
import { cssNames, interval, isElectron } from "../../utils";
import { ClusterPieCharts } from "./cluster-pie-charts";
import { ClusterMetrics } from "./cluster-metrics";
import { nodesStore } from "../+nodes/nodes.store";
// import { podsStore } from "../+workloads-pods/pods.store";
import { clusterStore } from "./cluster.store";
import { eventStore } from "../+events/event.store";
let Cluster = class Cluster extends React.Component {
    constructor() {
        super(...arguments);
        this.watchers = [
            interval(60, () => clusterStore.getMetrics()),
            interval(20, () => eventStore.loadAll())
        ];
        this.dependentStores = [nodesStore];
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const { dependentStores } = this;
            this.watchers.forEach(watcher => watcher.start(true));
            yield Promise.all([
                ...dependentStores.map(store => store.loadAll()),
                clusterStore.getAllMetrics()
            ]);
            disposeOnUnmount(this, [
                ...dependentStores.map(store => store.subscribe()),
                () => this.watchers.forEach(watcher => watcher.stop()),
                reaction(() => clusterStore.metricNodeRole, () => this.watchers.forEach(watcher => watcher.restart()))
            ]);
        });
    }
    get isLoaded() {
        const userConfig = JSON.parse(localStorage.getItem('u_config'));
        if (!userConfig)
            return false;
        if (!clusterStore.metrics)
            return false;
        return (nodesStore.isLoaded);
    }
    render() {
        let { isLoaded } = this;
        const userConfig = store.get('u_config');
        if (!userConfig)
            return false;
        if (!clusterStore.metrics)
            return false;
        return (<MainLayout>
        <div className="Cluster">
          {!isLoaded && <Spinner center/>}
          {isLoaded && (<>  
              <ClusterMetrics />
              <ClusterPieCharts />
              <ClusterIssues className={cssNames({ wide: isElectron })}/>
            </>)}
        </div>
      </MainLayout>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Cluster.prototype, "isLoaded", null);
Cluster = __decorate([
    observer
], Cluster);
export { Cluster };
//# sourceMappingURL=cluster.jsx.map