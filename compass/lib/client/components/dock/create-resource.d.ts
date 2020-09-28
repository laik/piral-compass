import "./create-resource.scss";
import React from "react";
import { IDockTab } from "./dock.store";
interface Props {
    className?: string;
    tab: IDockTab;
}
export declare class CreateResource extends React.Component<Props> {
    error: string;
    get tabId(): string;
    get data(): string;
    onChange: (value: string, error?: string) => void;
    create: () => Promise<JSX.Element>;
    render(): JSX.Element;
}
export {};
