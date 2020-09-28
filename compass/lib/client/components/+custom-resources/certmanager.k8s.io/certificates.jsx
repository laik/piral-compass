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
import "./certificates.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { KubeObjectMenu } from "../../kube-object/kube-object-menu";
import { KubeObjectListLayout } from "../../kube-object";
import { certificatesApi } from "../../../api/endpoints/cert-manager.api";
import { cssNames, stopPropagation } from "../../../utils";
import { Link } from "react-router-dom";
import { Badge } from "../../badge";
import { apiManager } from "../../../api/api-manager";
import { Spinner } from "../../spinner";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["namespace"] = "namespace";
    sortBy["age"] = "age";
    sortBy["commonName"] = "common-name";
    sortBy["secretName"] = "secret";
    sortBy["issuer"] = "issuer";
    sortBy["type"] = "type";
})(sortBy || (sortBy = {}));
let Certificates = class Certificates extends React.Component {
    render() {
        const _a = this.props, { store = apiManager.getStore(certificatesApi) } = _a, layoutProps = __rest(_a, ["store"]);
        if (!store) {
            return <Spinner center/>;
        }
        return (<KubeObjectListLayout {...layoutProps} store={store} className="Certificates" sortingCallbacks={{
            [sortBy.name]: (item) => item.getName(),
            [sortBy.namespace]: (item) => item.getNs(),
            [sortBy.secretName]: (item) => item.getSecretName(),
            [sortBy.commonName]: (item) => item.getCommonName(),
            [sortBy.issuer]: (item) => item.getIssuerName(),
            [sortBy.type]: (item) => item.getType(),
        }} searchFilters={[
            (item) => item.getSearchFields(),
            (item) => item.getSecretName(),
            (item) => item.getCommonName(),
            (item) => item.getIssuerName(),
            (item) => item.getType(),
        ]} renderHeaderTitle={`Certificates`} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            { title: `Namespace`, className: "namespace", sortBy: sortBy.namespace },
            { title: `Common Name`, className: "common-name", sortBy: sortBy.type },
            { title: `Type`, className: "type", sortBy: sortBy.type },
            { title: `Issuer`, className: "issuer", sortBy: sortBy.issuer },
            { title: `Secret`, className: "secret", sortBy: sortBy.secretName },
            { title: `Age`, className: "age", sortBy: sortBy.age },
            { title: `Status`, className: "status" },
        ]} renderTableContents={(cert) => {
            return [
                cert.getName(),
                cert.getNs(),
                cert.getCommonName(),
                cert.getType(),
                <Link to={cert.getIssuerDetailsUrl()} onClick={stopPropagation}>
              {cert.getIssuerName()}
            </Link>,
                <Link to={cert.getSecretDetailsUrl()} onClick={stopPropagation}>
              {cert.getSecretName()}
            </Link>,
                cert.getAge(),
                cert.getConditions().map(({ type, tooltip, isReady }) => {
                    return (<Badge key={type} label={type} tooltip={tooltip} className={cssNames({ [type.toLowerCase()]: isReady })}/>);
                })
            ];
        }} renderItemMenu={(item) => {
            return <CertificateMenu object={item}/>;
        }}/>);
    }
};
Certificates = __decorate([
    observer
], Certificates);
export { Certificates };
export function CertificateMenu(props) {
    return (<KubeObjectMenu {...props}/>);
}
apiManager.registerViews(certificatesApi, {
    List: Certificates,
    Menu: CertificateMenu,
});
//# sourceMappingURL=certificates.jsx.map