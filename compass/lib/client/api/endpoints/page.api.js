import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class Page extends KubeObject {
}
Page.kind = "Page";
export const pageApi = new KubeApi({
    kind: Page.kind,
    apiBase: "/apis/fuxi.nip.io/v1/pages",
    isNamespaced: true,
    objectConstructor: Page,
});
//# sourceMappingURL=page.api.js.map