var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import debounce from "lodash/debounce";
import { autorun } from "mobx";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { dockStore } from "./dock.store";
import { themeStore } from "../../theme.store";
import { autobind } from "../../utils";
import { SerializeAddon } from "xterm-addon-serialize";
import { WebLinksAddon } from "xterm-addon-web-links";
export class Terminal {
    constructor(tabId, api) {
        this.tabId = tabId;
        this.api = api;
        this.scrollPos = 0;
        this.disposers = [];
        this.fit = () => {
            this.fitAddon.fit();
            const { cols, rows } = this.xterm;
            this.api.sendTerminalSize(cols, rows);
        };
        this.fitLazy = debounce(this.fit, 250);
        this.focus = () => {
            this.xterm.focus();
        };
        this.onApiData = (data) => {
            this.xterm.write(typeof data === 'string' ? data : new Uint8Array(data));
        };
        this.onData = (data) => {
            this.api.sendCommand({ Data: data });
        };
        this.onScroll = () => {
            this.scrollPos = this.viewport.scrollTop;
        };
        this.onClear = () => {
            this.xterm.clear();
        };
        this.onResize = () => {
            if (!this.isActive)
                return;
            this.fitLazy();
        };
        this.onActivate = () => {
            this.fit();
            setTimeout(() => this.focus(), 250); // delay used to prevent focus on active tab
            this.viewport.scrollTop = this.scrollPos; // restore last scroll position
        };
        this.onClickLink = (evt, link) => {
            window.open(link, "_blank");
        };
        this.keyHandler = (evt) => {
            const { code, ctrlKey, type } = evt;
            // Handle custom hotkey bindings
            if (ctrlKey) {
                switch (code) {
                    // Ctrl+C: prevent terminal exit on windows / linux (?)
                    case "KeyC":
                        if (this.xterm.hasSelection())
                            return false;
                        break;
                    // Ctrl+W: prevent unexpected terminal tab closing, e.g. editing file in vim
                    // https://github.com/kontena/lens-app/issues/156#issuecomment-534906480
                    case "KeyW":
                        evt.preventDefault();
                        break;
                }
            }
            // Pass the event above in DOM for <Dock/> to handle common actions
            if (!evt.defaultPrevented) {
                this.elem.dispatchEvent(new KeyboardEvent(type, evt));
            }
            return true;
        };
        this.init();
    }
    static init() {
        // terminal element must be in DOM before attaching via xterm.open(elem)
        // https://xtermjs.org/docs/api/terminal/classes/terminal/#open
        const pool = document.createElement("div");
        pool.className = "terminal-init";
        pool.style.cssText = "position: absolute; top: 0; left: 0; height: 0; visibility: hidden; overflow: hidden";
        document.body.appendChild(pool);
        Terminal.spawningPool = pool;
    }
    setTheme(colors = themeStore.activeTheme.colors) {
        // Replacing keys stored in styles to format accepted by terminal
        // E.g. terminalBrightBlack -> brightBlack
        const colorPrefix = "terminal";
        const terminalColors = Object.entries(colors)
            .filter(([name]) => name.startsWith(colorPrefix))
            .reduce((colors, [name, color]) => {
            const colorName = name.split("").slice(colorPrefix.length);
            colorName[0] = colorName[0].toLowerCase();
            colors[colorName.join("")] = color;
            return colors;
        }, {});
        this.xterm.setOption("theme", terminalColors);
    }
    get elem() {
        return this.xterm.element;
    }
    get viewport() {
        return this.xterm.element.querySelector(".xterm-viewport");
    }
    get isActive() {
        const { isOpen, selectedTabId } = dockStore;
        return isOpen && selectedTabId === this.tabId;
    }
    attachTo(parentElem) {
        parentElem.appendChild(this.elem);
        this.onActivate();
    }
    detach() {
        Terminal.spawningPool.appendChild(this.elem);
    }
    init() {
        if (this.xterm) {
            return;
        }
        this.xterm = new XTerm({
            cursorBlink: true,
            cursorStyle: "bar",
            fontSize: 14.5,
            fontFamily: "Monospace"
        });
        // enable terminal addons
        this.fitAddon = new FitAddon();
        this.serializeAddon = new SerializeAddon();
        this.webLinksAddon = new WebLinksAddon();
        this.xterm.loadAddon(this.fitAddon);
        this.xterm.loadAddon(this.serializeAddon);
        this.xterm.loadAddon(this.webLinksAddon);
        this.xterm.open(Terminal.spawningPool);
        // this.xterm.registerLinkMatcher(/https?:\/\/[^\s]+/i, this.onClickLink);
        this.xterm.attachCustomKeyEventHandler(this.keyHandler);
        // bind events
        const onResizeDisposer = dockStore.onResize(this.onResize);
        const onData = this.xterm.onData(this.onData);
        const onThemeChangeDisposer = autorun(() => this.setTheme(themeStore.activeTheme.colors));
        this.viewport.addEventListener("scroll", this.onScroll);
        this.api.onReady.addListener(this.onClear, { once: true }); // clear status logs (connecting..)
        this.api.onData.addListener(this.onApiData); // api listener
        window.addEventListener("resize", this.onResize);
        // add clean-up handlers to be called on destroy
        this.disposers.push(onResizeDisposer, onThemeChangeDisposer, () => onData.dispose(), () => this.fitAddon.dispose(), () => this.api.removeAllListeners(), () => window.removeEventListener("resize", this.onResize));
    }
    destroy() {
        if (!this.xterm)
            return;
        this.disposers.forEach(dispose => dispose());
        this.disposers = [];
        this.xterm.dispose();
        this.xterm = null;
    }
}
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Terminal.prototype, "setTheme", null);
Terminal.init();
//# sourceMappingURL=terminal.js.map