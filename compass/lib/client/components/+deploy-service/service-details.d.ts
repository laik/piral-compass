import "./service-details.scss";
import React from "react";
import { Service } from "./common";
import { ActionMeta } from "react-select/src/types";
export interface Props<T = any> extends Partial<Props> {
    value?: T;
    showIcons?: boolean;
    themeName?: "dark" | "light" | "outlined";
    onChange?(value: T, meta?: ActionMeta<any>): void;
}
export declare class DeployServiceDetails extends React.Component<Props> {
    Index: number;
    get value(): Service;
    get typeOptions(): string[];
    get protocolOptions(): string[];
    add(): void;
    remove(index: number): void;
    rPorts(index: number): JSX.Element;
    render(): JSX.Element;
}
