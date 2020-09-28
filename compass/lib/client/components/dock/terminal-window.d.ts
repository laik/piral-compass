import "./terminal-window.scss";
import React from "react";
import { IDockTab } from "./dock.store";
import { Terminal } from "./terminal";
interface Props {
    className?: string;
    tab: IDockTab;
}
export declare class TerminalWindow extends React.Component<Props> {
    elem: HTMLElement;
    terminal: Terminal;
    componentDidMount(): void;
    activate(tabId?: string): void;
    render(): JSX.Element;
}
export {};
