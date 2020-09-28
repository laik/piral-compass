import React from "react";
import { GroupSelectOption, SelectOption, SelectProps } from "../select";
import { FilterType } from "./page-filters.store";
export interface SelectOptionFilter extends SelectOption {
    type: FilterType;
    selected?: boolean;
}
interface Props extends SelectProps {
    allowEmpty?: boolean;
    disableFilters?: {
        [filterType: string]: boolean;
    };
}
export declare class PageFiltersSelect extends React.Component<Props> {
    static defaultProps: Props;
    get groupedOptions(): GroupSelectOption<SelectOptionFilter>[];
    get options(): SelectOptionFilter[];
    private formatLabel;
    private onSelect;
    render(): JSX.Element;
}
export {};
