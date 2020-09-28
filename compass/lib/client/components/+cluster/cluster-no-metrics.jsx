import React from "react";
import { Icon } from "../icon";
import { cssNames } from "../../utils";
export function ClusterNoMetrics({ className }) {
    return (<div className={cssNames("ClusterNoMetrics flex column box grow justify-center align-center", className)}>
      <Icon material="info"/>
      <p>Metrics are not available due to missing or invalid Prometheus configuration.</p>
      <p>Right click cluster icon to open cluster settings.</p>
    </div>);
}
//# sourceMappingURL=cluster-no-metrics.jsx.map