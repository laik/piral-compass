import "./certificates.scss";
import * as React from "react";
import { KubeObjectMenuProps } from "../../kube-object/kube-object-menu";
import { KubeObjectListLayoutProps } from "../../kube-object";
import { Certificate } from "../../../api/endpoints/cert-manager.api";
export declare class Certificates extends React.Component<KubeObjectListLayoutProps> {
    render(): JSX.Element;
}
export declare function CertificateMenu(props: KubeObjectMenuProps<Certificate>): JSX.Element;
