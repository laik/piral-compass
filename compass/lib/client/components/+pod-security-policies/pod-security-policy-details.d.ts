import "./pod-security-policy-details.scss";
import React from "react";
import { KubeObjectDetailsProps } from "../kube-object";
import { PodSecurityPolicy } from "../../api/endpoints";
interface Props extends KubeObjectDetailsProps<PodSecurityPolicy> {
}
export declare class PodSecurityPolicyDetails extends React.Component<Props> {
    renderRuleGroup(title: React.ReactNode, group: {
        rule: string;
        ranges?: {
            max: number;
            min: number;
        }[];
    }): JSX.Element;
    render(): JSX.Element;
}
export {};
