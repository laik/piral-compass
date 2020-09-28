var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { KubeObject } from "../kube-object";
import { autobind } from "../../utils";
import { metricsApi } from "./metrics.api";
import { KubeApi } from "../kube-api";
export class IngressApi extends KubeApi {
    getMetrics(ingress, namespace) {
        const bytesSent = (statuses) => `sum(rate(nginx_ingress_controller_bytes_sent_sum{ingress="${ingress}", status=~"${statuses}"}[1m])) by (ingress)`;
        const bytesSentSuccess = bytesSent("^2\\\\d*"); // Requests with status 2**
        const bytesSentFailure = bytesSent("^5\\\\d*"); // Requests with status 5**
        const requestDurationSeconds = `sum(rate(nginx_ingress_controller_request_duration_seconds_sum{ingress="${ingress}"}[1m])) by (ingress)`;
        const responseDurationSeconds = `sum(rate(nginx_ingress_controller_response_duration_seconds_sum{ingress="${ingress}"}[1m])) by (ingress)`;
        return metricsApi.getMetrics({
            bytesSentSuccess,
            bytesSentFailure,
            requestDurationSeconds,
            responseDurationSeconds
        }, {
            namespace,
        });
    }
}
let Ingress = class Ingress extends KubeObject {
    getRoutes() {
        const { spec: { tls, rules } } = this;
        if (!rules)
            return [];
        let protocol = "http";
        const routes = [];
        if (tls && tls.length > 0) {
            protocol += "s";
        }
        rules.map(rule => {
            const host = rule.host ? rule.host : "*";
            if (rule.http && rule.http.paths) {
                rule.http.paths.forEach(path => {
                    routes.push(protocol + "://" + host + (path.path || "/") + " ⇢ " + path.backend.serviceName + ":" + path.backend.servicePort);
                });
            }
        });
        return routes;
    }
    getHosts() {
        const { spec: { rules } } = this;
        if (!rules)
            return [];
        return rules.filter(rule => rule.host).map(rule => rule.host);
    }
    getPorts() {
        const ports = [];
        const { spec: { tls, rules, backend } } = this;
        const httpPort = 80;
        const tlsPort = 443;
        if (rules && rules.length > 0) {
            if (rules.some(rule => rule.hasOwnProperty("http"))) {
                ports.push(httpPort);
            }
        }
        else {
            if (backend && backend.servicePort) {
                ports.push(backend.servicePort);
            }
        }
        if (tls && tls.length > 0) {
            ports.push(tlsPort);
        }
        return ports.join(", ");
    }
};
Ingress.kind = "Ingress";
Ingress = __decorate([
    autobind()
], Ingress);
export { Ingress };
export const ingressApi = new IngressApi({
    kind: Ingress.kind,
    apiBase: "/apis/extensions/v1beta1/ingresses",
    isNamespaced: true,
    objectConstructor: Ingress,
});
//# sourceMappingURL=ingress.api.js.map