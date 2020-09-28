import "./table-cell.scss";
import React, { ReactNode } from "react";
import { SortBy, SortParams } from "./table";
export declare type TableCellElem = React.ReactElement<TableCellProps>;
export interface TableCellProps extends React.DOMAttributes<HTMLDivElement> {
    className?: string;
    title?: ReactNode;
    checkbox?: boolean;
    isChecked?: boolean;
    sortBy?: SortBy;
    _sorting?: Partial<SortParams>;
    _sort?(sortBy: SortBy): void;
    _nowrap?: boolean;
}
export declare class TableCell extends React.Component<TableCellProps> {
    onClick(evt: React.MouseEvent<HTMLDivElement>): void;
    get isSortable(): boolean;
    renderSortIcon(): JSX.Element;
    renderCheckbox(): JSX.Element;
    render(): JSX.Element;
}
