/// <reference types="react" />
import { IPodMetrics } from "../../api/endpoints";
import { IMetrics } from "../../api/endpoints/metrics.api";
interface Props {
    metrics: IPodMetrics<IMetrics>;
}
export declare function ResourceMetricsText(props: Props): JSX.Element;
export {};
