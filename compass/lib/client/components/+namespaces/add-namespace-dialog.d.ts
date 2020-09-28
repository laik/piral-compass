import "./add-namespace-dialog.scss";
import React from "react";
import { DialogProps } from "../dialog";
import { Namespace } from "../../api/endpoints";
interface Props extends DialogProps {
    onSuccess?(ns: Namespace): void;
    onError?(error: any): void;
}
export declare class AddNamespaceDialog extends React.Component<Props> {
    static isOpen: boolean;
    namespace: string;
    static open(): void;
    static close(): void;
    close: () => void;
    addNamespace: () => Promise<void>;
    render(): JSX.Element;
}
export {};
