import "./confirm-dialog.scss";
import React, { ReactNode } from "react";
import { DialogProps } from "../dialog";
export interface IConfirmDialogParams {
    ok?: () => void;
    labelOk?: ReactNode;
    labelCancel?: ReactNode;
    message?: ReactNode;
    icon?: string;
}
interface Props extends Partial<DialogProps> {
}
export declare class ConfirmDialog extends React.Component<Props> {
    static isOpen: boolean;
    static params: IConfirmDialogParams;
    isSaving: boolean;
    static open(params: IConfirmDialogParams): void;
    static close(): void;
    defaultParams: IConfirmDialogParams;
    get params(): IConfirmDialogParams;
    ok: () => Promise<void>;
    onClose: () => void;
    close: () => void;
    render(): JSX.Element;
}
export {};
