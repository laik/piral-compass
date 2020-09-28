import "./sub-header.scss";
import * as React from "react";
export interface SubHeaderProps {
    className?: string;
    withLine?: boolean;
    compact?: boolean;
}
export declare class SubHeader extends React.Component<SubHeaderProps> {
    render(): JSX.Element;
}
