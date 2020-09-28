var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class ServicePort {
    constructor(data) {
        Object.assign(this, data);
    }
    toString() {
        if (this.nodePort) {
            return `${this.port}:${this.nodePort}/${this.protocol}`;
        }
        else {
            return `${this.port}${this.port === this.targetPort ? "" : ":" + this.targetPort}/${this.protocol}`;
        }
    }
}
let Service = class Service extends KubeObject {
    getClusterIp() {
        return this.spec.clusterIP;
    }
    getExternalIps() {
        const lb = this.getLoadBalancer();
        if (lb && lb.ingress) {
            return lb.ingress.map(val => val.ip || val.hostname);
        }
        return this.spec.externalIPs || [];
    }
    getType() {
        return this.spec.type || "-";
    }
    getSelector() {
        if (!this.spec.selector)
            return [];
        return Object.entries(this.spec.selector).map(val => val.join("="));
    }
    getPorts() {
        const ports = this.spec.ports || [];
        return ports.map(p => new ServicePort(p));
    }
    getLoadBalancer() {
        return this.status.loadBalancer;
    }
    isActive() {
        return this.getType() !== "LoadBalancer" || this.getExternalIps().length > 0;
    }
    getStatus() {
        return this.isActive() ? "Active" : "Pending";
    }
};
Service.kind = "Service";
Service = __decorate([
    autobind()
], Service);
export { Service };
export const serviceApi = new KubeApi({
    kind: Service.kind,
    apiBase: "/api/v1/services",
    isNamespaced: true,
    objectConstructor: Service,
});
//# sourceMappingURL=service.api.js.map