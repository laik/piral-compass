import React from "react";
import { DialogProps } from "../dialog";
import { Namespace } from "../../api/endpoints";
interface Props extends Partial<DialogProps> {
}
export declare class NamespaceNodeRangeLimitDialog extends React.Component<Props> {
    static isOpen: boolean;
    static namespace: Namespace;
    nodes: import("mobx").IObservableArray<any>;
    static open(namespace: Namespace): void;
    static close(): void;
    close: () => void;
    reset: () => void;
    onOpen: () => void;
    updateAnnotate: () => Promise<void>;
    render(): JSX.Element;
}
export {};
