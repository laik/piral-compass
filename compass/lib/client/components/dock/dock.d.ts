import "./dock.scss";
import React from "react";
import { DraggableState } from "../draggable";
import { IDockTab } from "./dock.store";
interface Props {
    className?: string;
}
export declare class Dock extends React.Component<Props> {
    onResizeStart: () => void;
    onResize: ({ offsetY }: DraggableState) => void;
    onKeydown: (evt: React.KeyboardEvent<HTMLElement>) => void;
    onChangeTab: (tab: IDockTab) => void;
    renderTab(tab: IDockTab): JSX.Element;
    renderTabContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
