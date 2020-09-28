import React from "react";
export interface CollapseProps {
    defaultExpanded?: boolean;
    useExpandIcon?: boolean;
    useDivider?: boolean;
    extraExpand?: React.ReactNode;
    panelName?: React.ReactNode;
    panelAction?: React.ReactNode;
    key?: string | number;
}
export declare class Collapse extends React.Component<CollapseProps> {
    static defaultProps: object;
    render(): JSX.Element;
}
