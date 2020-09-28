import React from "react";
import { IKubeMetaField, KubeObject } from "../../api/kube-object";
export interface Props {
    object: KubeObject;
    hideFields?: IKubeMetaField[];
}
export declare class KubeObjectMeta extends React.Component<Props> {
    static defaultHiddenFields: IKubeMetaField[];
    isHidden(field: IKubeMetaField): boolean;
    render(): JSX.Element;
}
