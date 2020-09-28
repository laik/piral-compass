var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./node-details.scss";
import React from "react";
import upperFirst from "lodash/upperFirst";
import kebabCase from "lodash/kebabCase";
import { disposeOnUnmount, observer } from "mobx-react";
import { DrawerItem, DrawerItemLabels } from "../drawer";
import { Badge } from "../badge";
import { TooltipContent } from "../tooltip";
import { nodesStore } from "./nodes.store";
import { nodesApi } from "../../api/endpoints";
import { reaction } from "mobx";
import { apiManager } from "../../api/api-manager";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";
let NodeDetails = class NodeDetails extends React.Component {
    constructor() {
        super(...arguments);
        this.clean = reaction(() => this.props.object.getName(), () => {
            nodesStore.nodeMetrics = null;
        });
    }
    // async componentDidMount() {
    //   if (!podsStore.isLoaded) {
    //     podsStore.loadAll();
    //   }
    // }
    componentWillUnmount() {
        nodesStore.nodeMetrics = null;
    }
    render() {
        const { object: node } = this.props;
        if (!node)
            return;
        const { status } = node;
        const { nodeInfo, addresses, capacity, allocatable } = status;
        const conditions = node.getActiveConditions();
        const taints = node.getTaints();
        // const childPods = podsStore.getPodsByNode(node.getName())
        const metrics = nodesStore.nodeMetrics;
        const metricTabs = [
            `CPU`,
            `Memory`,
            `Disk`,
            `Pods`,
        ];
        return (<div className="NodeDetails">
        
        
        
        
        
        
        
        
        <KubeObjectMeta object={node} hideFields={["labels", "annotations", "uid", "resourceVersion", "selfLink"]}/>
        <DrawerItem name={`Capacity`}>
          `CPU`: {capacity.cpu},{" "}
          `Memory`: {Math.floor(parseInt(capacity.memory) / 1024)}Mi,{" "}
          `Pods`: {capacity.pods}
        </DrawerItem>
        <DrawerItem name={`Allocatable`}>
          `CPU`: {allocatable.cpu},{" "}
          `Memory`: {Math.floor(parseInt(allocatable.memory) / 1024)}Mi,{" "}
          `Pods`: {allocatable.pods}
        </DrawerItem>
        {addresses &&
            <DrawerItem name={`Addresses`}>
          {addresses.map(({ type, address }) => (<p key={type}>{type}: {address}</p>))}
        </DrawerItem>}
        <DrawerItem name={`OS`}>
          {nodeInfo.operatingSystem} ({nodeInfo.architecture})
        </DrawerItem>
        <DrawerItem name={`OS Image`}>
          {nodeInfo.osImage}
        </DrawerItem>
        <DrawerItem name={`Kernel version`}>
          {nodeInfo.kernelVersion}
        </DrawerItem>
        <DrawerItem name={`Container runtime`}>
          {nodeInfo.containerRuntimeVersion}
        </DrawerItem>
        <DrawerItem name={`Kubelet version`}>
          {nodeInfo.kubeletVersion}
        </DrawerItem>
        <DrawerItemLabels name={`Labels`} labels={node.getLabels()}/>
        <DrawerItemLabels name={`Annotations`} labels={node.getAnnotations()}/>
        {taints.length > 0 && (<DrawerItem name={`Taints`} labelsOnly>
            {taints.map(({ key, effect, value }) => (<Badge key={key} label={key + ": " + effect} tooltip={value}/>))}
          </DrawerItem>)}
        {conditions &&
            <DrawerItem name={`Conditions`} className="conditions" labelsOnly>
          {conditions.map(condition => {
                const { type } = condition;
                return (<Badge key={type} label={type} className={kebabCase(type)} tooltip={<TooltipContent tableView>
                      {Object.entries(condition).map(([key, value]) => <div key={key} className="flex gaps align-center">
                          <div className="name">{upperFirst(key)}</div>
                          <div className="value">{value}</div>
                        </div>)}
                    </TooltipContent>}/>);
            })}
        </DrawerItem>}
        
        
        
        
        
        
      </div>);
    }
};
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], NodeDetails.prototype, "clean", void 0);
NodeDetails = __decorate([
    observer
], NodeDetails);
export { NodeDetails };
apiManager.registerViews(nodesApi, {
    Details: NodeDetails,
});
//# sourceMappingURL=node-details.jsx.map