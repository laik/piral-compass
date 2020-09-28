import { IReactionOptions } from "mobx";
export declare type TabId = string;
export declare enum TabKind {
    TERMINAL = "terminal",
    CREATE_RESOURCE = "create-resource",
    EDIT_RESOURCE = "edit-resource",
    INSTALL_CHART = "install-chart",
    UPGRADE_CHART = "upgrade-chart"
}
export interface IDockTab {
    id?: TabId;
    kind: TabKind;
    title?: string;
    pinned?: boolean;
    pod?: string;
    container?: string;
}
export declare class DockStore {
    protected initialTabs: IDockTab[];
    protected storage: import("../../utils").StorageHelper<{}>;
    defaultTabId: string;
    minHeight: number;
    isOpen: boolean;
    fullSize: boolean;
    height: number;
    tabs: import("mobx").IObservableArray<IDockTab>;
    selectedTabId: string;
    get selectedTab(): IDockTab;
    get defaultHeight(): number;
    get maxHeight(): number;
    constructor();
    protected checkMaxHeight(): void;
    onResize(callback: () => void, options?: IReactionOptions): import("mobx").IReactionDisposer;
    onTabChange(callback: (tabId: TabId) => void, options?: IReactionOptions): import("mobx").IReactionDisposer;
    hasTabs(): boolean;
    open(fullSize?: boolean): void;
    close(): void;
    toggle(): void;
    toggleFillSize(): void;
    getTabById(tabId: TabId): IDockTab;
    protected getNewTabNumber(kind: TabKind): number;
    createTab(anonTab: IDockTab, addNumber?: boolean): IDockTab;
    closeTab(tabId: TabId): Promise<void>;
    selectTab(tabId: TabId): void;
    setHeight(height: number): void;
    reset(): void;
}
export declare const dockStore: DockStore;
