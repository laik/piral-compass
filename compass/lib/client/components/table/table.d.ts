import "./table.scss";
import * as React from "react";
import { TableRowProps } from "./table-row";
import { TableHeadProps } from "./table-head";
import { ItemObject } from "../../item.store";
export declare type SortBy = string;
export declare type OrderBy = "asc" | "desc" | string;
export declare type SortParams = {
    sortBy: SortBy;
    orderBy: OrderBy;
};
export declare type SortingCallback<D = any> = (data: D) => string | number | (string | number)[];
export interface TableProps extends React.DOMAttributes<HTMLDivElement> {
    items?: ItemObject[];
    className?: string;
    autoSize?: boolean;
    selectable?: boolean;
    scrollable?: boolean;
    storageKey?: string;
    sortable?: {
        [sortBy: string]: SortingCallback;
    };
    sortSyncWithUrl?: boolean;
    sortByDefault?: Partial<SortParams>;
    onSort?: (params: SortParams) => void;
    noItems?: React.ReactNode;
    selectedItemId?: string;
    virtual?: boolean;
    rowPadding?: string;
    rowLineHeight?: string;
    customRowHeights?: (item: object, lineHeight: number, paddings: number) => number;
    getTableRow?: (uid: string) => React.ReactElement<TableRowProps>;
}
export declare class Table extends React.Component<TableProps> {
    static defaultProps: TableProps;
    sortParamsLocal: Partial<SortParams>;
    get sortParams(): Partial<SortParams>;
    renderHead(): React.ReactElement<TableHeadProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    getSorted(items: any[]): any[];
    protected onSort(params: SortParams): void;
    sort(colName: SortBy): void;
    renderRows(): {};
    render(): JSX.Element;
}
