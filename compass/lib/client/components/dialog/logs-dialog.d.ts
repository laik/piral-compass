import "./logs-dialog.scss";
import * as React from "react";
import { DialogProps } from "../dialog";
interface Props extends DialogProps {
    title: string;
    logs: string;
}
export declare class LogsDialog extends React.Component<Props> {
    logsElem: HTMLElement;
    copyToClipboard: () => void;
    render(): JSX.Element;
}
export {};
