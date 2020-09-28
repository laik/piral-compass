/// <reference types="react-addons-linked-state-mixin" />
import "./animate.scss";
import * as React from "react";
export declare type AnimateName = "opacity" | "slide-right" | "opacity-scale" | string;
export interface AnimateProps {
    name?: AnimateName;
    enter?: boolean;
    enabled?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
}
export declare class Animate extends React.Component<AnimateProps> {
    static VISIBILITY_DELAY_MS: number;
    static defaultProps: AnimateProps;
    isVisible: boolean;
    statusClassName: {
        enter: boolean;
        leave: boolean;
    };
    get contentElem(): React.ReactElement<React.HTMLAttributes<any>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    componentDidMount(): void;
    enter(): void;
    leave(): void;
    reset(): void;
    onTransitionEnd(evt: React.TransitionEvent): void;
    render(): {};
}
