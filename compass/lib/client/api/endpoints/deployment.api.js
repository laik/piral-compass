var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { WorkloadKubeObject } from "../workload-kube-object";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
export class DeploymentApi extends KubeApi {
    getScaleApiUrl(params) {
        return this.getUrl(params) + "/scale";
    }
    getReplicas(params) {
        return this.request
            .get(this.getScaleApiUrl(params))
            .then(({ status }) => status.replicas);
    }
    scale(params, replicas) {
        return this.request.put(this.getScaleApiUrl(params), {
            data: {
                metadata: params,
                spec: {
                    replicas: replicas
                }
            }
        });
    }
}
let Deployment = class Deployment extends WorkloadKubeObject {
    getConditions(activeOnly = false) {
        const { conditions } = this.status;
        if (!conditions)
            return [];
        if (activeOnly) {
            return conditions.filter(c => c.status === "True");
        }
        return conditions;
    }
    getConditionsText(activeOnly = true) {
        return this.getConditions(activeOnly).map(({ type }) => type).join(" ");
    }
    getReplicas() {
        return this.spec.replicas || 0;
    }
};
Deployment.kind = "Deployment";
Deployment = __decorate([
    autobind()
], Deployment);
export { Deployment };
export const deploymentApi = new DeploymentApi({
    kind: Deployment.kind,
    apiBase: "/apis/apps/v1/deployments",
    isNamespaced: true,
    objectConstructor: Deployment,
});
//# sourceMappingURL=deployment.api.js.map