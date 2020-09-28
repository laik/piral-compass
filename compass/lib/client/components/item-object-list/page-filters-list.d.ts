import "./page-filters-list.scss";
import React from "react";
import { Filter } from "./page-filters.store";
interface Props {
    filters?: Filter[];
}
export declare class PageFiltersList extends React.Component<Props> {
    static defaultProps: Props;
    reset: () => void;
    remove: (filter: Filter) => void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
