var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { KubeObject } from "../kube-object";
import { unitsToBytes } from "../../utils/convertMemory";
import { autobind } from "../../utils";
import { KubeApi } from "../kube-api";
let PersistentVolume = class PersistentVolume extends KubeObject {
    getCapacity(inBytes = false) {
        const capacity = this.spec.capacity;
        if (capacity) {
            if (inBytes)
                return unitsToBytes(capacity.storage);
            return capacity.storage;
        }
        return 0;
    }
    getStatus() {
        if (!this.status)
            return;
        return this.status.phase || "-";
    }
    getClaimRefName() {
        const { claimRef } = this.spec;
        return claimRef ? claimRef.name : "";
    }
};
PersistentVolume.kind = "PersistentVolume";
PersistentVolume = __decorate([
    autobind()
], PersistentVolume);
export { PersistentVolume };
export const persistentVolumeApi = new KubeApi({
    kind: PersistentVolume.kind,
    apiBase: "/api/v1/persistentvolumes",
    isNamespaced: false,
    objectConstructor: PersistentVolume,
});
//# sourceMappingURL=persistent-volume.api.js.map