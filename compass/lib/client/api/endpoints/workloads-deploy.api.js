var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import get from "lodash/get";
import { WorkloadKubeObject } from "../workload-kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
import moment from "moment";
import { advanceFormatDuration } from "../../utils";
let Deploy = class Deploy extends WorkloadKubeObject {
    getOwnerNamespace() {
        return get(this, "metadata.labels.namespace");
    }
    getAppName() {
        return get(this, "spec.appName");
    }
    getResourceType() {
        return get(this, "spec.resourceType");
    }
    getGenerateTimestamp() {
        if (this.metadata && this.metadata.creationTimestamp) {
            return this.metadata.creationTimestamp;
        }
        return "";
    }
    getCreated(humanize = true, compact = true, fromNow = false) {
        if (fromNow) {
            return moment(this.metadata.creationTimestamp).fromNow();
        }
        const diff = new Date().getTime() -
            new Date(this.metadata.creationTimestamp).getTime();
        if (humanize) {
            return advanceFormatDuration(diff, compact);
        }
        return diff;
    }
    getObject() {
        return get(this, "spec.metadata");
    }
    setMetadata(metadata) {
        this.spec.metadata = metadata;
    }
};
Deploy.kind = "Workloads";
Deploy = __decorate([
    autobind()
], Deploy);
export { Deploy };
export const deployApi = new KubeApi({
    kind: Deploy.kind,
    apiBase: "/apis/fuxi.nip.io/v1/workloads",
    isNamespaced: true,
    objectConstructor: Deploy,
});
//# sourceMappingURL=workloads-deploy.api.js.map