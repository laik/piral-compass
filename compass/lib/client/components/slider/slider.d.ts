import "./slider.scss";
import { Component } from "react";
import { SliderProps } from "@material-ui/core/Slider";
interface Props extends SliderProps {
    className?: string;
}
export declare class Slider extends Component<Props> {
    static defaultProps: object;
    private classNames;
    render(): JSX.Element;
}
export {};
