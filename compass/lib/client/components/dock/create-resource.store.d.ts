import { DockTabStore } from "./dock-tab.store";
import { IDockTab } from "./dock.store";
export declare class CreateResourceStore extends DockTabStore<string> {
    constructor();
}
export declare const createResourceStore: CreateResourceStore;
export declare function createResourceTab(tabParams?: Partial<IDockTab>): IDockTab;
export declare function isCreateResourceTab(tab: IDockTab): boolean;
