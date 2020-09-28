import "./dock-tab.scss";
import React from "react";
import { IDockTab } from "./dock.store";
import { TabProps } from "../tabs";
export interface DockTabProps extends TabProps<IDockTab> {
    moreActions?: React.ReactNode;
}
export declare class DockTab extends React.Component<DockTabProps> {
    get tabId(): string;
    close(): void;
    render(): JSX.Element;
}
