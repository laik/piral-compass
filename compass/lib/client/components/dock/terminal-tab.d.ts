import "./terminal-tab.scss";
import React from "react";
import { DockTabProps } from "./dock-tab";
interface Props extends DockTabProps {
}
export declare class TerminalTab extends React.Component<Props> {
    get tabId(): string;
    get isDisconnected(): boolean;
    reconnect(): void;
    render(): JSX.Element;
}
export {};
