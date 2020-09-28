import "./info-panel.scss";
import { Component, ReactNode } from "react";
import { TabId } from "./dock.store";
interface Props extends OptionalProps {
    tabId: TabId;
    submit: () => Promise<ReactNode | string>;
}
interface OptionalProps {
    className?: string;
    error?: string;
    controls?: ReactNode;
    submitLabel?: ReactNode;
    submittingMessage?: ReactNode;
    disableSubmit?: boolean;
    showSubmitClose?: boolean;
    showInlineInfo?: boolean;
    showNotifications?: boolean;
}
export declare class InfoPanel extends Component<Props> {
    static defaultProps: OptionalProps;
    result: ReactNode;
    error: string;
    waiting: boolean;
    componentDidMount(): void;
    get errorInfo(): string;
    submit: () => Promise<void>;
    submitAndClose: () => Promise<void>;
    close: () => void;
    renderInfo(): JSX.Element;
    render(): JSX.Element;
}
export {};
