import "./ace-editor.scss";
import * as React from "react";
import { Ace } from "ace-builds";
interface Props extends Partial<Ace.EditorOptions> {
    className?: string;
    autoFocus?: boolean;
    hidden?: boolean;
    cursorPos?: Ace.Point;
    onChange?(value: string, delta: Ace.Delta): void;
    onCursorPosChange?(point: Ace.Point): void;
}
interface State {
    ready?: boolean;
}
export declare class AceEditor extends React.Component<Props, State> {
    static defaultProps: object;
    private editor;
    private elem;
    ready: boolean;
    loadEditor(): Promise<{
        default: typeof import("ace-builds");
        require(name: string): any;
        edit(el: string | Element, options?: Partial<Ace.EditorOptions>): Ace.Editor;
        createEditSession(text: string | Ace.Document, mode: Ace.SyntaxMode): Ace.EditSession;
        Ace: typeof Ace;
        version: string;
        config: Ace.Config;
        VirtualRenderer: new (container: HTMLElement, theme?: string) => Ace.VirtualRenderer;
        EditSession: new (text: string | Document, mode?: Ace.SyntaxMode) => Ace.EditSession;
        UndoManager: new () => Ace.UndoManager;
        Range: {
            new (startRow: number, startColumn: number, endRow: number, endColumn: number): Ace.Range;
            fromPoints(start: Ace.Point, end: Ace.Point): Ace.Range;
            comparePoints(p1: Ace.Point, p2: Ace.Point): number;
        };
    }>;
    loadTheme(theme: string): Promise<any>;
    loadExtension(ext: string): Promise<any>;
    loadMode(mode: string): Promise<any>;
    get theme(): "terminal" | "dreamweaver";
    componentDidMount(): Promise<void>;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    resize(): void;
    focus(): void;
    getValue(): string;
    setValue(value: string, cursorPos?: number): string;
    setMode(mode: string): Promise<void>;
    setTheme(theme: string): Promise<void>;
    setCursorPos(pos: Ace.Point): void;
    onCursorPosChange(): void;
    onChange(delta: Ace.Delta): void;
    render(): JSX.Element;
}
export {};
