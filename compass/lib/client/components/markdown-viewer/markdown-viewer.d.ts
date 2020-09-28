import "./markdown-viewer.scss";
import { Component } from "react";
interface Props extends OptionalProps {
    markdown: string;
}
interface OptionalProps {
    className?: string;
}
export declare class MarkdownViewer extends Component<Props> {
    render(): JSX.Element;
}
export {};
