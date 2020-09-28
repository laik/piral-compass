import "./kubeconfig-dialog.scss";
import React from "react";
import { ServiceAccount } from "../../api/endpoints";
import { DialogProps } from "../dialog";
interface IKubeconfigDialogData {
    title?: React.ReactNode;
    loader?: () => Promise<any>;
}
interface Props extends Partial<DialogProps> {
}
export declare class KubeConfigDialog extends React.Component<Props> {
    static isOpen: boolean;
    static data: IKubeconfigDialogData;
    configTextArea: HTMLTextAreaElement;
    config: string;
    static open(data: IKubeconfigDialogData): void;
    static close(): void;
    get data(): IKubeconfigDialogData;
    close: () => void;
    onOpen: () => void;
    loadConfig(): Promise<void>;
    copyToClipboard: () => void;
    download: () => void;
    render(): JSX.Element;
}
export declare function openUserKubeConfig(): void;
export declare function openServiceAccountKubeConfig(account: ServiceAccount): void;
export {};
