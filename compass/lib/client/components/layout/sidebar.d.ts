import "./sidebar.scss";
import * as React from "react";
interface Props {
    className?: string;
    isPinned: boolean;
    toggle(): void;
}
export declare class Sidebar extends React.Component<Props> {
    renderCustomResources(): JSX.Element[];
    render(): JSX.Element;
}
export {};
