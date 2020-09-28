import './items-list.scss';
import * as React from 'react';
interface ItemsListProps {
    className?: string;
    disabled?: boolean;
    inline?: boolean;
    selectable?: boolean;
    multiSelect?: boolean;
    showSelectedItems?: boolean;
    showSelectedIcon?: boolean;
    selectedValues?: any[];
    onSelectChange(currentItem: any, selectedItems: any[]): void;
}
export declare class ItemsList extends React.Component<ItemsListProps> {
    static defaultProps: Partial<ItemsListProps>;
    onClickItem(itemValue: any): void;
    render(): JSX.Element;
}
interface ItemProps extends React.HTMLProps<any> {
    value: any;
    className?: string;
    disabled?: boolean;
    selected?: boolean;
    showSelectedIcon?: boolean;
}
export declare class Item extends React.Component<ItemProps> {
    static defaultProps: object;
    render(): JSX.Element;
}
export {};
