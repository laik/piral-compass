import "./certificate-details.scss";
import React from "react";
import { KubeObjectDetailsProps } from "../../kube-object";
import { Certificate } from "../../../api/endpoints/cert-manager.api";
interface Props extends KubeObjectDetailsProps<Certificate> {
}
export declare class CertificateDetails extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
