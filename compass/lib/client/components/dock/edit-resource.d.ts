import "./edit-resource.scss";
import React from "react";
import { IDockTab } from "./dock.store";
import { KubeObject } from "../../api/kube-object";
interface Props {
    className?: string;
    tab: IDockTab;
}
export declare class EditResource extends React.Component<Props> {
    error: string;
    autoDumpResourceOnInit: import("mobx").IReactionDisposer;
    get tabId(): string;
    get tabData(): import("./edit-resource.store").KubeEditResource;
    get resource(): KubeObject;
    saveDraft(draft: string | object): void;
    onChange: (draft: string, error?: string) => void;
    save: () => Promise<JSX.Element>;
    render(): JSX.Element;
}
export {};
