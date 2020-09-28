import { KubeObject } from "../kube-object";
import { KubeApi } from "../kube-api";
import { crdResourcesURL } from "../../components/+custom-resources/crd.route";
export class CustomResourceDefinition extends KubeObject {
    getResourceUrl() {
        return crdResourcesURL({
            params: {
                group: this.getGroup(),
                name: this.getPluralName(),
            }
        });
    }
    getResourceApiBase() {
        const { version, group } = this.spec;
        return `/apis/${group}/${version}/${this.getPluralName()}`;
    }
    getPluralName() {
        return this.getNames().plural;
    }
    getResourceKind() {
        return this.spec.names.kind;
    }
    getResourceTitle() {
        const name = this.getPluralName();
        return name[0].toUpperCase() + name.substr(1);
    }
    getGroup() {
        return this.spec.group;
    }
    getScope() {
        return this.spec.scope;
    }
    getVersion() {
        return this.spec.version;
    }
    isNamespaced() {
        return this.getScope() === "Namespaced";
    }
    getStoredVersions() {
        return this.status.storedVersions.join(", ");
    }
    getNames() {
        return this.spec.names;
    }
    getConversion() {
        return JSON.stringify(this.spec.conversion);
    }
    getPrinterColumns(ignorePriority = true) {
        const columns = this.spec.additionalPrinterColumns || [];
        return columns
            .filter(column => column.name != "Age")
            .filter(column => ignorePriority ? true : !column.priority);
    }
    getValidation() {
        return JSON.stringify(this.spec.validation, null, 2);
    }
    getConditions() {
        if (!this.status.conditions)
            return [];
        return this.status.conditions.map(condition => {
            const { message, reason, lastTransitionTime, status } = condition;
            return Object.assign(Object.assign({}, condition), { isReady: status === "True", tooltip: `${message || reason} (${lastTransitionTime})` });
        });
    }
}
CustomResourceDefinition.kind = "CustomResourceDefinition";
export const crdApi = new KubeApi({
    kind: CustomResourceDefinition.kind,
    apiBase: "/apis/apiextensions.k8s.io/v1beta1/customresourcedefinitions",
    isNamespaced: false,
    objectConstructor: CustomResourceDefinition,
});
//# sourceMappingURL=crd.api.js.map