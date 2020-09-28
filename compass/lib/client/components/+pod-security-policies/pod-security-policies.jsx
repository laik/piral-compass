var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./pod-security-policies.scss";
import React from "react";
import { observer } from "mobx-react";
import { KubeObjectListLayout } from "../kube-object";
import { KubeObjectMenu } from "../kube-object/kube-object-menu";
import { podSecurityPoliciesStore } from "./pod-security-policies.store";
import { pspApi } from "../../api/endpoints";
import { apiManager } from "../../api/api-manager";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["volumes"] = "volumes";
    sortBy["privileged"] = "privileged";
    sortBy["age"] = "age";
})(sortBy || (sortBy = {}));
let PodSecurityPolicies = class PodSecurityPolicies extends React.Component {
    render() {
        return (<KubeObjectListLayout className="PodSecurityPolicies" isClusterScoped={true} store={podSecurityPoliciesStore} sortingCallbacks={{
            [sortBy.name]: (item) => item.metadata.name,
            [sortBy.volumes]: (item) => item.getVolumes(),
            [sortBy.privileged]: (item) => +item.isPrivileged(),
            [sortBy.age]: (item) => item.metadata.creationTimestamp,
        }} searchFilters={[
            (item) => item.getSearchFields(),
            (item) => item.getVolumes(),
            (item) => Object.values(item.getRules()),
        ]} renderHeaderTitle={`Pod Security Policies`} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            { title: `Privileged`, className: "privileged", sortBy: sortBy.privileged },
            { title: `Volumes`, className: "volumes", sortBy: sortBy.volumes },
            { title: `Age`, className: "age", sortBy: sortBy.age },
        ]} renderTableContents={(item) => {
            return [
                item.metadata.name,
                item.isPrivileged() ? `Yes` : `No`,
                item.getVolumes().join(", "),
                item.metadata.creationTimestamp,
            ];
        }} renderItemMenu={(item) => {
            return <PodSecurityPolicyMenu object={item}/>;
        }}/>);
    }
};
PodSecurityPolicies = __decorate([
    observer
], PodSecurityPolicies);
export { PodSecurityPolicies };
export function PodSecurityPolicyMenu(props) {
    return (<KubeObjectMenu {...props}/>);
}
apiManager.registerViews(pspApi, {
    Menu: PodSecurityPolicyMenu,
});
//# sourceMappingURL=pod-security-policies.jsx.map