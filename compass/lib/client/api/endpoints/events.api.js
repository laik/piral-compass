var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import moment from "moment";
import { KubeObject } from "../kube-object";
import { formatDuration } from "../../utils/formatDuration";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let KubeEvent = class KubeEvent extends KubeObject {
    isWarning() {
        return this.type === "Warning";
    }
    getSource() {
        const { component, host } = this.source;
        return `${component} ${host || ""}`;
    }
    getFirstSeenTime() {
        const diff = moment().diff(this.firstTimestamp);
        return formatDuration(diff, true);
    }
    getLastSeenTime() {
        const diff = moment().diff(this.lastTimestamp);
        return formatDuration(diff, true);
    }
};
KubeEvent.kind = "Event";
KubeEvent = __decorate([
    autobind()
], KubeEvent);
export { KubeEvent };
export const eventApi = new KubeApi({
    kind: KubeEvent.kind,
    apiBase: "/api/v1/events",
    isNamespaced: true,
    objectConstructor: KubeEvent,
});
//# sourceMappingURL=events.api.js.map