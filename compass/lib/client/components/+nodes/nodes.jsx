var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./nodes.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { cssNames, interval } from "../../utils";
import { MainLayout } from "../layout/main-layout";
import { nodesStore } from "./nodes.store";
import { KubeObjectListLayout } from "../kube-object";
import { nodesApi } from "../../api/endpoints/nodes.api";
import { NodeMenu } from "./node-menu";
import { LineProgress } from "../line-progress";
import { bytesToUnits } from "../../utils/convertMemory";
import { Tooltip, TooltipContent } from "../tooltip";
import kebabCase from "lodash/kebabCase";
import upperFirst from "lodash/upperFirst";
import { apiManager } from "../../api/api-manager";
import { NodeAnnotationDialog } from "./node-annotation-dialog";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["cpu"] = "cpu";
    sortBy["memory"] = "memory";
    sortBy["disk"] = "disk";
    sortBy["conditions"] = "condition";
    sortBy["taints"] = "taints";
    sortBy["roles"] = "roles";
    sortBy["age"] = "age";
    sortBy["version"] = "version";
    sortBy["status"] = "status";
})(sortBy || (sortBy = {}));
let Nodes = class Nodes extends React.Component {
    constructor() {
        super(...arguments);
        this.metricsWatcher = interval(30, () => nodesStore.loadUsageMetrics());
    }
    componentDidMount() {
        this.metricsWatcher.start(true);
        // *******HC WIP ******* // 
        // new NodeZoneGraph(1000,350); WIP
    }
    componentWillUnmount() {
        this.metricsWatcher.stop();
    }
    renderCpuUsage(node) {
        const metrics = nodesStore.getLastMetricValues(node, ["cpuUsage", "cpuCapacity"]);
        if (!metrics || !metrics[1])
            return <LineProgress value={0}/>;
        const usage = metrics[0];
        const cores = metrics[1];
        return (<LineProgress max={cores} value={usage} tooltip={`CPU:` + ` ${Math.ceil(usage * 100) / cores}\%, ` + `cores:` + ` ${cores}`}/>);
    }
    renderMemoryUsage(node) {
        const metrics = nodesStore.getLastMetricValues(node, ["memoryUsage", "memoryCapacity"]);
        if (!metrics || !metrics[1])
            return <LineProgress value={0}/>;
        const usage = metrics[0];
        const capacity = metrics[1];
        return (<LineProgress max={capacity} value={usage} tooltip={`Memory:` + ` ${Math.ceil(usage * 100 / capacity)}%, ${bytesToUnits(usage, 3)}`}/>);
    }
    renderDiskUsage(node) {
        const metrics = nodesStore.getLastMetricValues(node, ["fsUsage", "fsSize"]);
        if (!metrics || !metrics[1])
            return <LineProgress value={0}/>;
        const usage = metrics[0];
        const capacity = metrics[1];
        return (<LineProgress max={capacity} value={usage} tooltip={`Disk:` + ` ${Math.ceil(usage * 100 / capacity)}%, ${bytesToUnits(usage, 3)}`}/>);
    }
    renderConditions(node) {
        if (!node.status.conditions) {
            return null;
        }
        const conditions = node.getActiveConditions();
        return conditions.map(condition => {
            const { type } = condition;
            const tooltipId = `node-${node.getName()}-condition-${type}`;
            return (<div key={type} id={tooltipId} className={cssNames("condition", kebabCase(type))}>
          {type}
          <Tooltip htmlFor={tooltipId} following>
            <TooltipContent tableView>
              {Object.entries(condition).map(([key, value]) => <div key={key} className="flex gaps align-center">
                  <div className="name">{upperFirst(key)}</div>
                  <div className="value">{value}</div>
                </div>)}
            </TooltipContent>
          </Tooltip>
        </div>);
        });
    }
    render() {
        return (<MainLayout>
        
        
        <KubeObjectListLayout className={cssNames("Nodes mt-10")} store={nodesStore} isClusterScoped isReady={nodesStore.isLoaded && nodesStore.metricsLoaded} 
        // dependentStores={[podsStore]}
        isSelectable={false} sortingCallbacks={{
            [sortBy.name]: (node) => node.getName(),
            [sortBy.cpu]: (node) => nodesStore.getLastMetricValues(node, ["cpuUsage"]),
            [sortBy.memory]: (node) => nodesStore.getLastMetricValues(node, ["memoryUsage"]),
            [sortBy.disk]: (node) => nodesStore.getLastMetricValues(node, ["fsUsage"]),
            [sortBy.conditions]: (node) => node.getNodeConditionText(),
            [sortBy.taints]: (node) => node.getTaints().length,
            [sortBy.roles]: (node) => node.getRoleLabels(),
            [sortBy.age]: (node) => node.getAge(false),
            [sortBy.version]: (node) => node.getKubeletVersion(),
        }} searchFilters={[
            (node) => node.getSearchFields(),
            (node) => node.getRoleLabels(),
            (node) => node.getKubeletVersion(),
            (node) => node.getNodeConditionText(),
        ]} renderHeaderTitle={`Nodes`} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            { title: `CPU`, className: "cpu", sortBy: sortBy.cpu },
            { title: `Memory`, className: "memory", sortBy: sortBy.memory },
            { title: `Disk`, className: "disk", sortBy: sortBy.disk },
            { title: `Taints`, className: "taints", sortBy: sortBy.taints },
            { title: `Roles`, className: "roles", sortBy: sortBy.roles },
            { title: `Version`, className: "version", sortBy: sortBy.version },
            { title: `Age`, className: "age", sortBy: sortBy.age },
            { title: `Conditions`, className: "conditions", sortBy: sortBy.conditions },
        ]} renderTableContents={(node) => {
            const tooltipId = `node-taints-${node.getId()}`;
            return [
                node.getName(),
                this.renderCpuUsage(node),
                this.renderMemoryUsage(node),
                this.renderDiskUsage(node),
                <>
                <span id={tooltipId}>{node.getTaints().length}</span>
                <Tooltip htmlFor={tooltipId} style={{ whiteSpace: "pre-line" }}>
                  {node.getTaints().map(({ key, effect }) => `${key}: ${effect}.join('\n')`)}
                </Tooltip>
              </>,
                node.getRoleLabels(),
                node.status.nodeInfo.kubeletVersion,
                node.getAge(),
                this.renderConditions(node),
            ];
        }} renderItemMenu={(item) => {
            return <NodeMenu object={item}/>;
        }}/>
        <NodeAnnotationDialog />
      </MainLayout>);
    }
};
Nodes = __decorate([
    observer
], Nodes);
export { Nodes };
apiManager.registerViews(nodesApi, {
    Menu: NodeMenu,
});
//# sourceMappingURL=nodes.jsx.map