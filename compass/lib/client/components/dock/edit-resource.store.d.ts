import { DockTabStore } from "./dock-tab.store";
import { IDockTab } from "./dock.store";
import { KubeObject } from "../../api/kube-object";
export interface KubeEditResource {
    resource: string;
    draft?: string;
}
export declare class EditResourceStore extends DockTabStore<KubeEditResource> {
    private watchers;
    constructor();
    getTabByResource(object: KubeObject): IDockTab;
    reset(): void;
}
export declare const editResourceStore: EditResourceStore;
export declare function editResourceTab(object: KubeObject, tabParams?: Partial<IDockTab>): IDockTab;
export declare function isEditResourceTab(tab: IDockTab): boolean;
