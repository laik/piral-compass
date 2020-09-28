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
let Stone = class Stone extends WorkloadKubeObject {
    getStrategy() {
        return get(this, 'spec.strategy');
    }
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        return [...containers].map(container => container.image);
    }
};
Stone.kind = "Stone";
Stone = __decorate([
    autobind()
], Stone);
export { Stone };
export const stoneApi = new KubeApi({
    kind: Stone.kind,
    apiBase: "/apis/nuwa.nip.io/v1/stones",
    isNamespaced: true,
    objectConstructor: Stone,
});
//# sourceMappingURL=stone.api.js.map