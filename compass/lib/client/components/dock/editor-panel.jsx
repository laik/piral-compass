var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EditorPanel_1;
import React from "react";
import jsYaml from "js-yaml";
import { observable } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { cssNames } from "../../utils";
import { AceEditor } from "../ace-editor";
import { dockStore } from "./dock.store";
import { DockTabStore } from "./dock-tab.store";
let EditorPanel = EditorPanel_1 = class EditorPanel extends React.Component {
    constructor() {
        super(...arguments);
        this.yamlError = "";
        this.onTabChange = () => {
            this.editor.focus();
        };
        this.onResize = () => {
            this.editor.resize();
        };
        this.onCursorPosChange = (pos) => {
            EditorPanel_1.cursorPos.setData(this.props.tabId, pos);
        };
        this.onChange = (value) => {
            this.validate(value);
            if (this.props.onChange) {
                this.props.onChange(value, this.yamlError);
            }
        };
    }
    componentDidMount() {
        // validate and run callback with optional error
        this.onChange(this.props.value || "");
        disposeOnUnmount(this, [
            dockStore.onTabChange(this.onTabChange, { delay: 250 }),
            dockStore.onResize(this.onResize, { delay: 250 }),
        ]);
    }
    validate(value) {
        try {
            jsYaml.safeLoadAll(value);
            this.yamlError = "";
        }
        catch (err) {
            this.yamlError = err.toString();
        }
    }
    render() {
        const { value, tabId } = this.props;
        let { className } = this.props;
        className = cssNames("EditorPanel", className);
        const cursorPos = EditorPanel_1.cursorPos.getData(tabId);
        return (<AceEditor autoFocus mode="yaml" className={className} value={value} cursorPos={cursorPos} onChange={this.onChange} onCursorPosChange={this.onCursorPosChange} ref={e => this.editor = e}/>);
    }
};
EditorPanel.cursorPos = new DockTabStore();
__decorate([
    observable,
    __metadata("design:type", Object)
], EditorPanel.prototype, "yamlError", void 0);
EditorPanel = EditorPanel_1 = __decorate([
    observer
], EditorPanel);
export { EditorPanel };
//# sourceMappingURL=editor-panel.jsx.map