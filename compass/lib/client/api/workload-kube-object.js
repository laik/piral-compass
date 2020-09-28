import get from "lodash/get";
import { KubeObject } from "./kube-object";
export class WorkloadKubeObject extends KubeObject {
    getOwnerRefs() {
        const refs = this.metadata.ownerReferences || [];
        return refs.map((ownerRef) => (Object.assign(Object.assign({}, ownerRef), { namespace: this.getNs() })));
    }
    getSelectors() {
        const selector = this.spec.selector;
        return KubeObject.stringifyLabels(selector ? selector.matchLabels : null);
    }
    getNodeSelectors() {
        const nodeSelector = get(this, "spec.template.spec.nodeSelector");
        return KubeObject.stringifyLabels(nodeSelector);
    }
    getTemplateLabels() {
        const labels = get(this, "spec.template.metadata.labels");
        return KubeObject.stringifyLabels(labels);
    }
    getTolerations() {
        return get(this, "spec.template.spec.tolerations", []);
    }
    getAffinity() {
        return get(this, "spec.template.spec.affinity");
    }
    getAffinityNumber() {
        const affinity = this.getAffinity();
        if (!affinity)
            return 0;
        return Object.keys(affinity).length;
    }
}
//# sourceMappingURL=workload-kube-object.js.map