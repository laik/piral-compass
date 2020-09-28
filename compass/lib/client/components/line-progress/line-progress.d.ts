import "./line-progress.scss";
import * as React from "react";
import { TooltipDecoratorProps } from "../tooltip";
interface Props extends React.HTMLProps<any>, TooltipDecoratorProps {
    value: number;
    min?: number;
    max?: number;
    className?: any;
    precise?: number;
}
export declare class LineProgress extends React.PureComponent<Props> {
    static defaultProps: Props;
    render(): JSX.Element;
}
export {};
