import "./table-row.scss";
import React, { CSSProperties } from "react";
import { ItemObject } from "../../item.store";
export declare type TableRowElem = React.ReactElement<TableRowProps>;
export interface TableRowProps extends React.DOMAttributes<HTMLDivElement> {
    className?: string;
    selected?: boolean;
    style?: CSSProperties;
    nowrap?: boolean;
    sortItem?: ItemObject | any;
    searchItem?: ItemObject | any;
    disabled?: boolean;
}
export declare class TableRow extends React.Component<TableRowProps> {
    render(): JSX.Element;
}
