/// <reference types="react-addons-linked-state-mixin" />
import "./status-brick.scss";
import * as React from "react";
import { TooltipDecoratorProps } from "../tooltip";
interface Props extends React.HTMLAttributes<any>, TooltipDecoratorProps {
}
export declare class StatusBrick extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
