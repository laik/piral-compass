import "./issuer-details.scss";
import React from "react";
import { KubeObjectDetailsProps } from "../../kube-object";
import { Issuer } from "../../../api/endpoints/cert-manager.api";
interface Props extends KubeObjectDetailsProps<Issuer> {
}
export declare class IssuerDetails extends React.Component<Props> {
    renderSecretLink(secretName: string): string | JSX.Element;
    render(): JSX.Element;
}
export {};
