import "./namespace-allow-storageclass-select.scss";
import React from "react";
import { SelectOption, SelectProps } from "../select";
interface Props extends SelectProps {
    showIcons?: boolean;
    showClusterOption?: boolean;
    clusterOptionLabel?: React.ReactNode;
    namespaceName?: string;
    customizeOptions?(nsOptions: SelectOption[]): SelectOption[];
}
export declare class NamespaceAllowStorageClassSelect extends React.Component<Props> {
    static defaultProps: object;
    private unsubscribe;
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    get options(): SelectOption[];
    formatOptionLabel: (option: SelectOption) => {};
    render(): JSX.Element;
}
export {};
