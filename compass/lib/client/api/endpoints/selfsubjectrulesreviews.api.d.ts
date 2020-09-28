import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
export declare class SelfSubjectRulesReviewApi extends KubeApi<SelfSubjectRulesReview> {
    create({ namespace }: {
        namespace?: string;
    }): Promise<SelfSubjectRulesReview>;
}
export interface ISelfSubjectReviewRule {
    verbs: string[];
    apiGroups?: string[];
    resources?: string[];
    resourceNames?: string[];
    nonResourceURLs?: string[];
}
export declare class SelfSubjectRulesReview extends KubeObject {
    static kind: string;
    spec: {
        namespace?: string;
    };
    status: {
        resourceRules: ISelfSubjectReviewRule[];
        nonResourceRules: ISelfSubjectReviewRule[];
        incomplete: boolean;
    };
    getResourceRules(): ISelfSubjectReviewRule[];
    getNonResourceRules(): ISelfSubjectReviewRule[];
    protected normalize(rule: ISelfSubjectReviewRule): ISelfSubjectReviewRule;
}
export declare const selfSubjectRulesReviewApi: SelfSubjectRulesReviewApi;
