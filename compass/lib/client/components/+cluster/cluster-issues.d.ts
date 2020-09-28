import "./cluster-issues.scss";
import * as React from "react";
import { ItemObject } from "../../item.store";
interface Props {
    className?: string;
}
interface IWarning extends ItemObject {
    kind: string;
    message: string;
    selfLink: string;
}
export declare class ClusterIssues extends React.Component<Props> {
    private sortCallbacks;
    get warnings(): IWarning[];
    getTableRow(uid: string): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
