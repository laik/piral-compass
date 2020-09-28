import "./pod-security-policies.scss";
import React from "react";
import { KubeObjectMenuProps } from "../kube-object/kube-object-menu";
import { PodSecurityPolicy } from "../../api/endpoints";
export declare class PodSecurityPolicies extends React.Component {
    render(): JSX.Element;
}
export declare function PodSecurityPolicyMenu(props: KubeObjectMenuProps<PodSecurityPolicy>): JSX.Element;
