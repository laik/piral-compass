/// <reference types="lodash" />
import "./draggable.scss";
import * as React from "react";
import { IClassName } from "../../utils";
export interface DraggableEventHandler {
    (state: DraggableState): void;
}
interface Props {
    className?: IClassName;
    vertical?: boolean;
    horizontal?: boolean;
    onStart?: DraggableEventHandler;
    onEnter?: DraggableEventHandler;
    onEnd?: DraggableEventHandler;
}
export interface DraggableState {
    inited?: boolean;
    changed?: boolean;
    initX?: number;
    initY?: number;
    pageX?: number;
    pageY?: number;
    offsetX?: number;
    offsetY?: number;
}
export declare class Draggable extends React.PureComponent<Props, DraggableState> {
    state: DraggableState;
    static IS_DRAGGING: string;
    static defaultProps: Props;
    constructor(props: Props);
    componentWillUnmount(): void;
    onDragInit: (evt: React.MouseEvent<any>) => void;
    onDrag: import("lodash").DebouncedFunc<(evt: MouseEvent) => void>;
    onDragEnd: (evt: MouseEvent) => void;
    render(): JSX.Element;
}
export {};
