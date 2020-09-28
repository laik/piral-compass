import "./item-list-layout.scss";
import React, { ReactNode } from "react";
import { IConfirmDialogParams } from "../confirm-dialog";
import { SortingCallback, TableCellProps, TableProps, TableRowProps } from "../table";
import { IClassName } from "../../utils";
import { AddRemoveButtonsProps } from "../add-remove-buttons";
import { ItemObject, ItemStore } from "../../item.store";
import { Filter } from "./page-filters.store";
export declare type SearchFilter<T extends ItemObject = any> = (item: T) => string | number | (string | number)[];
export declare type ItemsFilter<T extends ItemObject = any> = (items: T[]) => T[];
interface IHeaderPlaceholders {
    title: ReactNode;
    search: ReactNode;
    filters: ReactNode;
    info: ReactNode;
}
export interface ItemListLayoutProps<T extends ItemObject = ItemObject> {
    className: IClassName;
    store: ItemStore<T>;
    dependentStores?: ItemStore[];
    isClusterScoped?: boolean;
    hideFilters?: boolean;
    searchFilters?: SearchFilter<T>[];
    filterItems?: ItemsFilter<T>[];
    showHeader?: boolean;
    headerClassName?: IClassName;
    renderHeaderTitle?: ReactNode | ((parent: ItemListLayout) => ReactNode);
    customizeHeader?: (placeholders: IHeaderPlaceholders, content: ReactNode) => Partial<IHeaderPlaceholders> | ReactNode;
    isReady?: boolean;
    isSelectable?: boolean;
    isSearchable?: boolean;
    copyClassNameFromHeadCells?: boolean;
    sortingCallbacks?: {
        [sortBy: string]: SortingCallback;
    };
    tableProps?: Partial<TableProps>;
    renderTableHeader: TableCellProps[] | null;
    renderTableContents: (item: T) => (ReactNode | TableCellProps)[];
    renderItemMenu?: (item: T, store: ItemStore<T>) => ReactNode;
    customizeTableRowProps?: (item: T) => Partial<TableRowProps>;
    addRemoveButtons?: Partial<AddRemoveButtonsProps>;
    virtual?: boolean;
    hasDetailsView?: boolean;
    detailsItem?: T;
    onDetails?: (item: T) => void;
    customizeRemoveDialog?: (selectedItems: T[]) => Partial<IConfirmDialogParams>;
    renderFooter?: (parent: ItemListLayout) => React.ReactNode;
}
interface ItemListLayoutUserSettings {
    showAppliedFilters?: boolean;
}
export declare class ItemListLayout extends React.Component<ItemListLayoutProps> {
    static defaultProps: object;
    isUnmounting: boolean;
    userSettings: ItemListLayoutUserSettings;
    constructor(props: ItemListLayoutProps);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    private filterCallbacks;
    get isReady(): boolean;
    get filters(): Filter[];
    applyFilters<T>(filters: ItemsFilter[], items: T[]): T[];
    get allItems(): ItemObject[];
    get items(): ItemObject[];
    getRow(uid: string): JSX.Element;
    removeItemsDialog(): void;
    renderFilters(): JSX.Element;
    renderNoItems(): JSX.Element;
    renderHeaderContent(placeholders: IHeaderPlaceholders): ReactNode;
    renderInfo(): JSX.Element | "\n          <a onClick={toggleFilters}>Filtered</a>: {itemsCount} / {allItemsCount}\n        ";
    renderHeader(): JSX.Element;
    renderList(): JSX.Element;
    renderFooter(): React.ReactNode;
    render(): JSX.Element;
}
export {};
