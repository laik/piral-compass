import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class SubNet extends KubeObject {
}
SubNet.kind = "Subnet";
export const subNetApi = new KubeApi({
    kind: SubNet.kind,
    apiBase: "/apis/kubeovn.io/v1/subnets",
    isNamespaced: true,
    objectConstructor: SubNet,
});
//# sourceMappingURL=subnet.api.js.map