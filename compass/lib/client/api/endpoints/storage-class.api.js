var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../../utils";
import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
let StorageClass = class StorageClass extends KubeObject {
    isDefault() {
        const annotations = this.metadata.annotations || {};
        return (annotations["storageclass.kubernetes.io/is-default-class"] === "true" ||
            annotations["storageclass.beta.kubernetes.io/is-default-class"] === "true");
    }
    getVolumeBindingMode() {
        return this.volumeBindingMode || "-";
    }
    getReclaimPolicy() {
        return this.reclaimPolicy || "-";
    }
};
StorageClass.kind = "StorageClass";
StorageClass = __decorate([
    autobind()
], StorageClass);
export { StorageClass };
export const storageClassApi = new KubeApi({
    kind: StorageClass.kind,
    apiBase: "/apis/storage.k8s.io/v1/storageclasses",
    isNamespaced: false,
    objectConstructor: StorageClass,
});
//# sourceMappingURL=storage-class.api.js.map