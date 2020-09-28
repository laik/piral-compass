import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export class SelfSubjectRulesReviewApi extends KubeApi {
    create({ namespace = "default" }) {
        return super.create({}, {
            spec: {
                namespace
            },
        });
    }
}
export class SelfSubjectRulesReview extends KubeObject {
    getResourceRules() {
        const rules = this.status && this.status.resourceRules || [];
        return rules.map(rule => this.normalize(rule));
    }
    getNonResourceRules() {
        const rules = this.status && this.status.nonResourceRules || [];
        return rules.map(rule => this.normalize(rule));
    }
    normalize(rule) {
        const { apiGroups = [], resourceNames = [], verbs = [], nonResourceURLs = [], resources = [] } = rule;
        return {
            apiGroups,
            nonResourceURLs,
            resourceNames,
            verbs,
            resources: resources.map((resource, index) => {
                const apiGroup = apiGroups.length >= index + 1 ? apiGroups[index] : apiGroups.slice(-1)[0];
                const separator = apiGroup == "" ? "" : ".";
                return resource + separator + apiGroup;
            })
        };
    }
}
SelfSubjectRulesReview.kind = "SelfSubjectRulesReview";
export const selfSubjectRulesReviewApi = new SelfSubjectRulesReviewApi({
    kind: SelfSubjectRulesReview.kind,
    apiBase: "/apis/authorization.k8s.io/v1/selfsubjectrulesreviews",
    isNamespaced: false,
    objectConstructor: SelfSubjectRulesReview,
});
//# sourceMappingURL=selfsubjectrulesreviews.api.js.map