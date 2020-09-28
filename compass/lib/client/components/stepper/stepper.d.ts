import "./stepper.scss";
import * as React from "react";
interface Props extends React.HTMLProps<any> {
    step: number;
    steps: Step[];
}
interface Step {
    title?: string;
}
export declare class Stepper extends React.Component<Props, {}> {
    render(): JSX.Element;
}
export {};
