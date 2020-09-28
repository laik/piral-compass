import "./error-boundary.scss";
import React, { ErrorInfo } from "react";
interface Props {
}
interface State {
    error?: Error;
    errorInfo?: ErrorInfo;
}
export declare class ErrorBoundary extends React.Component<Props, State> {
    state: State;
    resetOnNavigate: import("mobx").IReactionDisposer;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    back: () => void;
    render(): {};
}
export {};
