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
import MD5 from "crypto-js/md5";
import { action, computed, observable, reaction } from "mobx";
import { autobind, createStorage } from "../../utils";
import throttle from "lodash/throttle";
export var TabKind;
(function (TabKind) {
    TabKind["TERMINAL"] = "terminal";
    TabKind["CREATE_RESOURCE"] = "create-resource";
    TabKind["EDIT_RESOURCE"] = "edit-resource";
    TabKind["INSTALL_CHART"] = "install-chart";
    TabKind["UPGRADE_CHART"] = "upgrade-chart";
})(TabKind || (TabKind = {}));
let DockStore = class DockStore {
    constructor() {
        this.initialTabs = [
            { id: "terminal", kind: TabKind.TERMINAL, title: "", pod: "", container: "" },
        ];
        this.storage = createStorage("dock", {}); // keep settings in localStorage
        this.defaultTabId = this.initialTabs[0].id;
        this.minHeight = 100;
        this.isOpen = false;
        this.fullSize = false;
        this.height = this.defaultHeight;
        this.tabs = observable.array(this.initialTabs);
        this.selectedTabId = this.defaultTabId;
        Object.assign(this, this.storage.get());
        reaction(() => ({
            isOpen: this.isOpen,
            selectedTabId: this.selectedTabId,
            height: this.height,
            tabs: this.tabs.slice(),
        }), data => {
            this.storage.set(data);
        });
        // adjust terminal height if window size changes
        this.checkMaxHeight();
        window.addEventListener("resize", throttle(this.checkMaxHeight, 250));
    }
    get selectedTab() {
        return this.tabs.find(tab => tab.id === this.selectedTabId);
    }
    get defaultHeight() {
        return Math.round(window.innerHeight / 2.5);
    }
    get maxHeight() {
        const mainLayoutHeader = 40;
        const mainLayoutTabs = 33;
        const mainLayoutMargin = 16;
        const dockTabs = 33;
        return window.innerHeight - mainLayoutHeader - mainLayoutTabs - mainLayoutMargin - dockTabs;
    }
    checkMaxHeight() {
        if (!this.height) {
            this.setHeight(this.defaultHeight || this.minHeight);
        }
        if (this.height > this.maxHeight) {
            this.setHeight(this.maxHeight);
        }
    }
    onResize(callback, options) {
        return reaction(() => [this.height, this.fullSize], callback, options);
    }
    onTabChange(callback, options) {
        return reaction(() => this.selectedTabId, callback, options);
    }
    hasTabs() {
        return this.tabs.length > 0;
    }
    open(fullSize) {
        this.isOpen = true;
        if (typeof fullSize === "boolean") {
            this.fullSize = fullSize;
        }
    }
    close() {
        this.isOpen = false;
    }
    toggle() {
        if (this.isOpen)
            this.close();
        else
            this.open();
    }
    toggleFillSize() {
        if (!this.isOpen)
            this.open();
        this.fullSize = !this.fullSize;
    }
    getTabById(tabId) {
        return this.tabs.find(tab => tab.id === tabId);
    }
    getNewTabNumber(kind) {
        const tabNumbers = this.tabs
            .filter(tab => tab.kind === kind)
            .map(tab => {
            const tabNumber = +tab.title.match(/\d+/);
            return tabNumber === 0 ? 1 : tabNumber; // tab without a number is first
        });
        for (let i = 1;; i++) {
            if (!tabNumbers.includes(i))
                return i;
        }
    }
    createTab(anonTab, addNumber = true) {
        const tabId = MD5(Math.random().toString() + Date.now()).toString();
        const tab = Object.assign({ id: tabId }, anonTab);
        if (addNumber) {
            // const tabNumber = this.getNewTabNumber(tab.kind);
            // if (tabNumber > 1) tab.title += ` (${tabNumber})`
            tab.title += 'Pod: ' + tab.pod + `(${tab.container})`;
        }
        this.tabs.push(tab);
        this.selectTab(tab.id);
        this.open();
        return tab;
    }
    closeTab(tabId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = this.getTabById(tabId);
            if (!tab || tab.pinned) {
                return;
            }
            this.tabs.remove(tab);
            if (this.selectedTabId === tab.id) {
                if (this.tabs.length) {
                    const newTab = this.tabs.slice(-1)[0]; // last
                    if (newTab.kind === TabKind.TERMINAL) {
                        // close the dock when selected sibling inactive terminal tab
                        const { terminalStore } = yield import("./terminal.store");
                        if (!terminalStore.isConnected(newTab.id))
                            this.close();
                    }
                    this.selectTab(newTab.id);
                }
                else {
                    this.selectedTabId = null;
                    this.close();
                }
            }
        });
    }
    selectTab(tabId) {
        const tab = this.getTabById(tabId);
        this.selectedTabId = tab ? tab.id : null;
    }
    setHeight(height) {
        this.height = Math.max(0, Math.min(height, this.maxHeight));
    }
    reset() {
        this.selectedTabId = this.defaultTabId;
        this.tabs.replace(this.initialTabs);
        this.height = this.defaultHeight;
        this.close();
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], DockStore.prototype, "isOpen", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], DockStore.prototype, "fullSize", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], DockStore.prototype, "height", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], DockStore.prototype, "tabs", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], DockStore.prototype, "selectedTabId", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], DockStore.prototype, "selectedTab", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "open", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "close", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "toggle", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "toggleFillSize", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], DockStore.prototype, "createTab", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DockStore.prototype, "closeTab", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "selectTab", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "setHeight", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DockStore.prototype, "reset", null);
DockStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], DockStore);
export { DockStore };
export const dockStore = new DockStore();
//# sourceMappingURL=dock.store.js.map