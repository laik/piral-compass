var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./terminal-window.scss";
import React from "react";
import { reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { cssNames } from "../../utils";
import { terminalStore } from "./terminal.store";
import { themeStore } from "../../theme.store";
let TerminalWindow = class TerminalWindow extends React.Component {
    componentDidMount() {
        disposeOnUnmount(this, [
            reaction(() => this.props.tab.id, tabId => this.activate(tabId), {
                fireImmediately: true
            })
        ]);
    }
    activate(tabId = this.props.tab.id) {
        if (this.terminal)
            this.terminal.detach(); // detach previous
        this.terminal = terminalStore.getTerminal(tabId);
        this.terminal.attachTo(this.elem);
    }
    render() {
        const { className } = this.props;
        return (<div className={cssNames("TerminalWindow", className, themeStore.activeTheme.type)} ref={e => this.elem = e}/>);
    }
};
TerminalWindow = __decorate([
    observer
], TerminalWindow);
export { TerminalWindow };
//# sourceMappingURL=terminal-window.jsx.map