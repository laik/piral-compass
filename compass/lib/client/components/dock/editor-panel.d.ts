import React from "react";
import { AceEditor } from "../ace-editor";
import { TabId } from "./dock.store";
import { DockTabStore } from "./dock-tab.store";
import { Ace } from "ace-builds";
interface Props {
    className?: string;
    tabId: TabId;
    value: string;
    onChange(value: string, error?: string): void;
}
export declare class EditorPanel extends React.Component<Props> {
    static cursorPos: DockTabStore<Ace.Point>;
    editor: AceEditor;
    yamlError: string;
    componentDidMount(): void;
    validate(value: string): void;
    onTabChange: () => void;
    onResize: () => void;
    onCursorPosChange: (pos: Ace.Point) => void;
    onChange: (value: string) => void;
    render(): JSX.Element;
}
export {};
