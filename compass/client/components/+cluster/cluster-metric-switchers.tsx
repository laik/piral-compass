import "./cluster-metric-switchers.scss";
import React from "react";
import { observer } from "mobx-react";
import { nodesStore } from "../+nodes/nodes.store";
import { cssNames } from "../../utils";
import { Radio, RadioGroup } from "../radio";
import { clusterStore, MetricNodeRole, MetricType } from "./cluster.store";

export const ClusterMetricSwitchers = observer(() => {
  const { metricType, metricNodeRole, getMetricsValues, metrics } = clusterStore;
  const { masterNodes, workerNodes } = nodesStore;
  const metricsValues = getMetricsValues(metrics);
  const disableRoles = !masterNodes.length || !workerNodes.length;
  const disableMetrics = !metricsValues.length;
  return (
    <div className="ClusterMetricSwitchers flex gaps">
      <div className="box grow">
        <RadioGroup
          asButtons
          className={cssNames("RadioGroup flex gaps", { disabled: disableRoles })}
          value={metricNodeRole}
          onChange={(metric: MetricNodeRole) => clusterStore.metricNodeRole = metric}
        >
          <Radio label={`Master`} value={MetricNodeRole.MASTER}/>
          <Radio label={`Worker`} value={MetricNodeRole.WORKER}/>
        </RadioGroup>
      </div>
      <div className="box grow metric-switch">
        <RadioGroup
          asButtons
          className={cssNames("RadioGroup flex gaps", { disabled: disableMetrics })}
          value={metricType}
          onChange={(value: MetricType) => clusterStore.metricType = value}
        >
          <Radio label={`CPU`} value={MetricType.CPU}/>
          <Radio label={`Memory`} value={MetricType.MEMORY}/>
        </RadioGroup>
      </div>
    </div>
  );
});