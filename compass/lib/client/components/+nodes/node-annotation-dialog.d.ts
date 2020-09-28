import React from "react";
import { ActionMeta } from "react-select/src/types";
import { Node } from "../../api/endpoints";
interface Props<T = any> extends Partial<Props> {
    value?: T;
    themeName?: "dark" | "light" | "outlined";
    onChange?(value: T, meta?: ActionMeta<any>): void;
}
export declare class NodeAnnotationDialog extends React.Component<Props> {
    static isOpen: boolean;
    static data: Node;
    host: string;
    rack: string;
    zone: string;
    static open(object: Node): void;
    static close(): void;
    close: () => void;
    onOpen: () => void;
    get node(): Node;
    reset: () => void;
    submit: () => Promise<void>;
    render(): JSX.Element;
}
export {};
