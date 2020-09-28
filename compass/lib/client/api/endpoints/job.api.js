var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import get from "lodash/get";
import { autobind } from "../../utils";
import { WorkloadKubeObject } from "../workload-kube-object";
import { KubeApi } from "../kube-api";
let Job = class Job extends WorkloadKubeObject {
    getDesiredCompletions() {
        return this.spec.completions || 0;
    }
    getCompletions() {
        return this.status.succeeded || 0;
    }
    getParallelism() {
        return this.spec.parallelism;
    }
    getCondition() {
        // Type of Job condition could be only Complete or Failed
        // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.14/#jobcondition-v1-batch
        const { conditions } = this.status;
        if (!conditions)
            return;
        return conditions.find(({ status }) => status === "True");
    }
    getImages() {
        const containers = get(this, "spec.template.spec.containers", []);
        return [...containers].map(container => container.image);
    }
};
Job.kind = "Job";
Job = __decorate([
    autobind()
], Job);
export { Job };
export const jobApi = new KubeApi({
    kind: Job.kind,
    apiBase: "/apis/batch/v1/jobs",
    isNamespaced: true,
    objectConstructor: Job,
});
//# sourceMappingURL=job.api.js.map