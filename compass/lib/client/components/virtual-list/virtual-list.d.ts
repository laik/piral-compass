/// <reference types="lodash" />
import "./virtual-list.scss";
import React, { Component } from "react";
import { TableRowProps } from "../table/table-row";
import { ItemObject } from "../../item.store";
interface Props {
    items: ItemObject[];
    rowHeights: number[];
    className?: string;
    width?: number | string;
    initialOffset?: number;
    readyOffset?: number;
    selectedItemId?: string;
    getTableRow?: (uid: string) => React.ReactElement<TableRowProps>;
}
interface State {
    height: number;
    overscanCount: number;
}
export declare class VirtualList extends Component<Props, State> {
    static defaultProps: object;
    private listRef;
    private parentRef;
    state: State;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    setListHeight: import("lodash").DebouncedFunc<() => void>;
    getItemSize: (index: number) => number;
    scrollToSelectedItem: import("lodash").DebouncedFunc<() => void>;
    render(): JSX.Element;
}
export {};
