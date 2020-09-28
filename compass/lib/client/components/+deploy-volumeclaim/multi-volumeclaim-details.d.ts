import React from "react";
import { ActionMeta } from "react-select/src/types";
import { VolumeClaimTemplate } from "./common";
export interface VolumeClaimTemplateProps<T = any> extends Partial<VolumeClaimTemplateProps> {
    value?: T;
    themeName?: "dark" | "light" | "outlined";
    divider?: true;
    onChange?(value: T, meta?: ActionMeta<any>): void;
}
export declare class MultiVolumeClaimDetails extends React.Component<VolumeClaimTemplateProps> {
    get value(): VolumeClaimTemplate[];
    add: () => void;
    remove: (index: number) => void;
    rVolumeClaim(index: number): JSX.Element;
    render(): JSX.Element;
}
