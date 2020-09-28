import { KubeObjectStore } from "../../kube-object.store";
import { KubeEvent } from "../../api/endpoints/events.api";
import { KubeObject } from "../../api/kube-object";
export declare class EventStore extends KubeObjectStore<KubeEvent> {
    api: import("../../api/kube-api").KubeApi<KubeEvent>;
    limit: number;
    protected bindWatchEventsUpdater(): import("mobx").IReactionDisposer;
    protected sortItems(items: KubeEvent[]): KubeEvent[];
    getEventsByObject(obj: KubeObject): KubeEvent[];
    getEventsByNamespaceObject(namespace: string, obj: KubeObject): KubeEvent[];
    getWarnings(): KubeEvent[];
}
export declare const eventStore: EventStore;
