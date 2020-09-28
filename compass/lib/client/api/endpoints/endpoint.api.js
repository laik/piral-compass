var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class EndpointAddress {
    constructor(data) {
        Object.assign(this, data);
    }
    getId() {
        return this.ip;
    }
    getName() {
        return this.hostname;
    }
    getTargetRef() {
        if (this.targetRef) {
            return Object.assign(this.targetRef, { apiVersion: "v1" });
        }
        else {
            return null;
        }
    }
}
export class EndpointSubset {
    constructor(data) {
        Object.assign(this, data);
    }
    getAddresses() {
        const addresses = this.addresses || [];
        return addresses.map(a => new EndpointAddress(a));
    }
    getNotReadyAddresses() {
        const notReadyAddresses = this.notReadyAddresses || [];
        return notReadyAddresses.map(a => new EndpointAddress(a));
    }
    toString() {
        if (!this.addresses) {
            return "";
        }
        return this.addresses.map(address => {
            if (!this.ports) {
                return address.ip;
            }
            return this.ports.map(port => {
                return `${address.ip}:${port.port}`;
            }).join(", ");
        }).join(", ");
    }
}
let Endpoint = class Endpoint extends KubeObject {
    getEndpointSubsets() {
        const subsets = this.subsets || [];
        return subsets.map(s => new EndpointSubset(s));
    }
    toString() {
        if (this.subsets) {
            return this.getEndpointSubsets().map(es => es.toString()).join(", ");
        }
        else {
            return "<none>";
        }
    }
};
Endpoint.kind = "Endpoint";
Endpoint = __decorate([
    autobind()
], Endpoint);
export { Endpoint };
export const endpointApi = new KubeApi({
    kind: Endpoint.kind,
    apiBase: "/api/v1/endpoints",
    isNamespaced: true,
    objectConstructor: Endpoint,
});
//# sourceMappingURL=endpoint.api.js.map