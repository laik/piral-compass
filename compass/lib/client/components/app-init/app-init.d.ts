import "./app-init.scss";
import React from "react";
interface Props {
    serviceWaitingList?: string[];
}
export declare class AppInit extends React.Component<Props> {
    static start(rootElem: HTMLElement): Promise<void>;
    protected static readyStateCheck(rootElem: HTMLElement): Promise<unknown>;
    render(): JSX.Element;
}
export {};
