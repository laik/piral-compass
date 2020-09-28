var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import "./issuers.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { KubeObjectMenu } from "../../kube-object/kube-object-menu";
import { KubeObjectListLayout } from "../../kube-object";
import { clusterIssuersApi, issuersApi } from "../../../api/endpoints/cert-manager.api";
import { cssNames } from "../../../utils";
import { Badge } from "../../badge";
import { Spinner } from "../../spinner";
import { apiManager } from "../../../api/api-manager";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["namespace"] = "namespace";
    sortBy["type"] = "type";
    sortBy["labels"] = "labels";
    sortBy["age"] = "age";
})(sortBy || (sortBy = {}));
let ClusterIssuers = class ClusterIssuers extends React.Component {
    render() {
        const store = apiManager.getStore(clusterIssuersApi);
        return (<Issuers {...this.props} isClusterScoped={true} store={store} renderHeaderTitle={`Cluster Issuers`}/>);
    }
};
ClusterIssuers = __decorate([
    observer
], ClusterIssuers);
export { ClusterIssuers };
let Issuers = class Issuers extends React.Component {
    render() {
        const _a = this.props, { store = apiManager.getStore(issuersApi) } = _a, layoutProps = __rest(_a, ["store"]);
        if (!store) {
            return <Spinner center/>;
        }
        return (<KubeObjectListLayout store={store} renderHeaderTitle={`Issuers`} {...layoutProps} className="Issuers" sortingCallbacks={{
            [sortBy.name]: (item) => item.getName(),
            [sortBy.namespace]: (item) => item.getNs(),
            [sortBy.type]: (item) => item.getType(),
            [sortBy.labels]: (item) => item.getLabels(),
            [sortBy.age]: (item) => item.getAge(false),
        }} searchFilters={[
            (item) => item.getSearchFields(),
            (item) => item.getType(),
        ]} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            { title: `Namespace`, className: "namespace", sortBy: sortBy.namespace },
            { title: `Labels`, className: "labels", sortBy: sortBy.labels },
            { title: `Type`, className: "type", sortBy: sortBy.type },
            { title: `Age`, className: "age", sortBy: sortBy.age },
            { title: `Status`, className: "status" },
        ]} renderTableContents={(issuer) => [
            issuer.getName(),
            issuer.getNs(),
            issuer.getLabels().map(label => <Badge key={label} label={label} title={label}/>),
            issuer.getType(),
            issuer.getAge(),
            issuer.getConditions().map(({ type, tooltip, isReady }) => {
                return (<Badge key={type} label={type} tooltip={tooltip} className={cssNames({ [type.toLowerCase()]: isReady })}/>);
            })
        ]} renderItemMenu={(item) => {
            return <IssuerMenu object={item}/>;
        }}/>);
    }
};
Issuers = __decorate([
    observer
], Issuers);
export { Issuers };
export function IssuerMenu(props) {
    return (<KubeObjectMenu {...props}/>);
}
apiManager.registerViews([issuersApi, clusterIssuersApi], {
    List: Issuers,
    Menu: IssuerMenu,
});
//# sourceMappingURL=issuers.jsx.map