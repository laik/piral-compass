import "./drawer-param-toggler.scss";
import * as React from "react";
interface Props {
    label: string | number;
}
interface State {
    open?: boolean;
}
export declare class DrawerParamToggler extends React.Component<Props, State> {
    state: State;
    toggle: () => void;
    render(): JSX.Element;
}
export {};
