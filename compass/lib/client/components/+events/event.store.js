var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import groupBy from "lodash/groupBy";
import compact from "lodash/compact";
import { KubeObjectStore } from "../../kube-object.store";
import { autobind } from "../../utils";
import { eventApi } from "../../api/endpoints/events.api";
// import { podsStore } from "../+workloads-pods/pods.store";
import { apiManager } from "../../api/api-manager";
let EventStore = class EventStore extends KubeObjectStore {
    constructor() {
        super(...arguments);
        this.api = eventApi;
        this.limit = 1000;
    }
    bindWatchEventsUpdater() {
        return super.bindWatchEventsUpdater(5000);
    }
    sortItems(items) {
        return super.sortItems(items, [
            event => event.metadata.creationTimestamp
        ], "desc");
    }
    getEventsByObject(obj) {
        return this.items.filter(evt => {
            return obj.getId() == evt.involvedObject.uid;
        });
    }
    getEventsByNamespaceObject(namespace, obj) {
        return this.items.filter(evt => {
            return obj.getId() == evt.involvedObject.uid && obj.getNs() == namespace;
        });
    }
    getWarnings() {
        const warnings = this.items.filter(event => event.type == "Warning");
        const groupsByInvolvedObject = groupBy(warnings, warning => warning.involvedObject.uid);
        const eventsWithError = Object.values(groupsByInvolvedObject).map(events => {
            const recent = events[0];
            const { kind, uid } = recent.involvedObject;
            // if (kind == Pod.kind) {  // Wipe out running pods
            //   const pod = podsStore.items.find(pod => pod.getId() == uid);
            //   if (!pod || (!pod.hasIssues() && pod.spec.priority < 500000)) return;
            // }
            return recent;
        });
        return compact(eventsWithError);
    }
};
EventStore = __decorate([
    autobind()
], EventStore);
export { EventStore };
export const eventStore = new EventStore();
apiManager.registerStore(eventApi, eventStore);
//# sourceMappingURL=event.store.js.map