import "./button.scss";
import React, { ButtonHTMLAttributes } from "react";
import { TooltipDecoratorProps } from "../tooltip";
export interface ButtonProps extends ButtonHTMLAttributes<any>, TooltipDecoratorProps {
    label?: React.ReactNode;
    waiting?: boolean;
    primary?: boolean;
    accent?: boolean;
    plain?: boolean;
    hidden?: boolean;
    active?: boolean;
    big?: boolean;
    round?: boolean;
    href?: string;
    target?: "_blank";
}
export declare class Button extends React.PureComponent<ButtonProps, {}> {
    private link;
    private button;
    render(): JSX.Element;
}
