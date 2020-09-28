var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// Ace code editor - https://ace.c9.io
// Playground - https://ace.c9.io/build/kitchen-sink.html
import "./ace-editor.scss";
import * as React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { Ace } from "ace-builds";
import { autobind, cssNames } from "../../utils";
import { Spinner } from "../spinner";
import { themeStore } from "../../theme.store";
const defaultProps = {
    value: "",
    mode: "yaml",
    tabSize: 2,
    showGutter: true,
    foldStyle: "manual",
    printMargin: false,
    useWorker: false,
};
let AceEditor = class AceEditor extends React.Component {
    constructor() {
        super(...arguments);
        this.ready = false;
    }
    loadEditor() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import(
            /* webpackChunkName: "ace" */
            "ace-builds");
        });
    }
    loadTheme(theme) {
        return import(
        /* webpackChunkName: "ace/[request]" */
        `ace-builds/src-min-noconflict/theme-${theme}`);
    }
    loadExtension(ext) {
        return import(
        /* webpackChunkName: "ace/[request]" */
        `ace-builds/src-min-noconflict/ext-${ext}`);
    }
    loadMode(mode) {
        return import(
        /* webpackChunkName: "ace/[request]" */
        `ace-builds/src-min-noconflict/mode-${mode}`);
    }
    get theme() {
        return themeStore.activeTheme.type == "light"
            ? "dreamweaver" : "terminal";
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = this.props, { mode, autoFocus, className, hidden, cursorPos, onChange, onCursorPosChange, children } = _a, options = __rest(_a, ["mode", "autoFocus", "className", "hidden", "cursorPos", "onChange", "onCursorPosChange", "children"]);
            // load ace-editor, theme and mode
            const ace = yield this.loadEditor();
            yield Promise.all([
                this.loadTheme(this.theme),
                this.loadMode(mode)
            ]);
            // setup editor
            this.editor = ace.edit(this.elem, options);
            this.setTheme(this.theme);
            this.setMode(mode);
            this.setCursorPos(cursorPos);
            // bind events
            this.editor.on("change", this.onChange);
            this.editor.selection.on("changeCursor", this.onCursorPosChange);
            // load extensions
            this.loadExtension("searchbox");
            if (autoFocus)
                this.focus();
            this.ready = true;
        });
    }
    componentDidUpdate() {
        if (!this.editor)
            return;
        const { value, cursorPos } = this.props;
        if (value !== this.getValue()) {
            this.editor.setValue(value);
            this.editor.clearSelection();
            this.setCursorPos(cursorPos || this.editor.getCursorPosition());
        }
    }
    componentWillUnmount() {
        if (this.editor) {
            this.editor.destroy();
        }
    }
    resize() {
        if (this.editor) {
            this.editor.resize();
        }
    }
    focus() {
        if (this.editor) {
            this.editor.focus();
        }
    }
    getValue() {
        return this.editor.getValue();
    }
    setValue(value, cursorPos) {
        return this.editor.setValue(value, cursorPos);
    }
    setMode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadMode(mode);
            this.editor.session.setMode(`ace/mode/${mode}`);
        });
    }
    setTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadTheme(theme);
            this.editor.setTheme(`ace/theme/${theme}`);
        });
    }
    setCursorPos(pos) {
        if (!pos)
            return;
        const { row, column } = pos;
        this.editor.moveCursorToPosition(pos);
        requestAnimationFrame(() => {
            this.editor.gotoLine(row + 1, column, false);
        });
    }
    onCursorPosChange() {
        const { onCursorPosChange } = this.props;
        if (onCursorPosChange) {
            onCursorPosChange(this.editor.getCursorPosition());
        }
    }
    onChange(delta) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(this.getValue(), delta);
        }
    }
    render() {
        const { className, hidden } = this.props;
        const themeType = themeStore.activeTheme.type;
        return (<div className={cssNames("AceEditor", className, { hidden }, themeType)}>
        <div className="editor" ref={e => this.elem = e}/>
        {!this.ready && <Spinner center/>}
      </div>);
    }
};
AceEditor.defaultProps = defaultProps;
__decorate([
    observable,
    __metadata("design:type", Object)
], AceEditor.prototype, "ready", void 0);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AceEditor.prototype, "onCursorPosChange", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AceEditor.prototype, "onChange", null);
AceEditor = __decorate([
    observer
], AceEditor);
export { AceEditor };
//# sourceMappingURL=ace-editor.jsx.map