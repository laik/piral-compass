/// <reference types="react-addons-linked-state-mixin" />
import "./badge.scss";
import * as React from "react";
import { TooltipDecoratorProps } from "../tooltip";
interface Props extends React.HTMLAttributes<any>, TooltipDecoratorProps {
    label: React.ReactNode;
    small?: boolean;
}
export declare class Badge extends React.Component<Props> {
    render(): JSX.Element;
}
export {};
