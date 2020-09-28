import "./table-head.scss";
import * as React from "react";
export declare type TableHeadElem = React.ReactElement<TableHeadProps>;
export interface TableHeadProps extends React.DOMAttributes<HTMLDivElement> {
    className?: string;
    showTopLine?: boolean;
    sticky?: boolean;
    nowrap?: boolean;
}
export declare class TableHead extends React.Component<TableHeadProps> {
    static defaultProps: TableHeadProps;
    render(): JSX.Element;
}
