import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class IP extends KubeObject {
}
IP.kind = "Ip";
export const ipApi = new KubeApi({
    kind: IP.kind,
    apiBase: "/apis/kubeovn.io/v1/ips",
    isNamespaced: true,
    objectConstructor: IP,
});
//# sourceMappingURL=ip.api.js.map