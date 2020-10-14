import "./enhancestatefulset-details.scss";

import React from "react";
import { disposeOnUnmount, observer } from "mobx-react";
import { reaction } from "mobx";
import { Trans } from "@lingui/macro";
import { Badge } from "../badge";
import { DrawerItem } from "../drawer";
import { PodDetailsStatuses } from "../+workloads-pods/pod-details-statuses";
import { PodDetailsTolerations } from "../+workloads-pods/pod-details-tolerations";
import { PodDetailsAffinities } from "../+workloads-pods/pod-details-affinities";
import { KubeEventDetails } from "../+events/kube-event-details";
import { podsStore } from "../+workloads-pods/pods.store";
import { enhanceStatefulSetStore } from "./enhancestatefulset.store";
import { KubeObjectDetailsProps } from "../kube-object";
import { EnhanceStatefulSet, enhanceStatefulSetApi } from "../../api/endpoints";
import { ResourceMetrics, ResourceMetricsText } from "../resource-metrics";
import { PodCharts, podMetricTabs } from "../+workloads-pods/pod-charts";
import { PodDetailsList } from "../+workloads-pods/pod-details-list";
import { apiManager } from "../../api/api-manager";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";

interface Props extends KubeObjectDetailsProps<EnhanceStatefulSet> {
}

@observer
export class EnhanceStatefulSetDetails extends React.Component<Props> {
  @disposeOnUnmount
  clean = reaction(() => this.props.object, () => {
    enhanceStatefulSetStore.reset();
  });

  componentDidMount() {
    if (!podsStore.isLoaded) {
      podsStore.loadAll();
    }
  }

  componentWillUnmount() {
    enhanceStatefulSetStore.reset();
  }

  render() {
    const { object: enhanceStatefulset } = this.props;
    if (!enhanceStatefulset) return null
    const images = enhanceStatefulset.getImages()
    const selectors = enhanceStatefulset.getSelectors()
    const nodeSelector = enhanceStatefulset.getNodeSelectors()
    const childPods = enhanceStatefulSetStore.getChildPods(enhanceStatefulset)
    const metrics = enhanceStatefulSetStore.metrics
    
    return (
      <div className="EnhanceStatefulSetDetails">
        {podsStore.isLoaded && (
          <ResourceMetrics
            loader={() => enhanceStatefulSetStore.loadMetrics(enhanceStatefulset)}
            tabs={podMetricTabs} object={enhanceStatefulset} params={{ metrics }}
          >
            <PodCharts/>
          </ResourceMetrics>
        )}
        <KubeObjectMeta object={enhanceStatefulset}/>
        {selectors.length &&
        <DrawerItem name={<Trans>Selector</Trans>} labelsOnly>
          {
            selectors.map(label => <Badge key={label} label={label}/>)
          }
        </DrawerItem>
        }
        {nodeSelector.length > 0 &&
        <DrawerItem name={<Trans>Node Selector</Trans>} labelsOnly>
          {
            nodeSelector.map(label => (
              <Badge key={label} label={label}/>
            ))
          }
        </DrawerItem>
        }
        {images.length > 0 &&
        <DrawerItem name={<Trans>Images</Trans>}>
          {
            images.map(image => <p key={image}>{image}</p>)
          }
        </DrawerItem>
        }
        
        <PodDetailsTolerations workload={enhanceStatefulset}/>
        <PodDetailsAffinities workload={enhanceStatefulset}/>

        <DrawerItem name={<Trans>Pod Status</Trans>} className="pod-status">
          <PodDetailsStatuses pods={childPods}/>
        </DrawerItem>
        <ResourceMetricsText metrics={metrics}/>
        <PodDetailsList pods={childPods} owner={enhanceStatefulset}/>
        <KubeEventDetails object={enhanceStatefulset}/>
      </div>
    )
  }
}

apiManager.registerViews(enhanceStatefulSetApi, {
  Details: EnhanceStatefulSetDetails
})