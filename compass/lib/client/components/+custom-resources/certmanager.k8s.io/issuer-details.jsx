var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./issuer-details.scss";
import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { DrawerItem, DrawerTitle } from "../../drawer";
import { Badge } from "../../badge";
import { KubeEventDetails } from "../../+events/kube-event-details";
import { clusterIssuersApi, issuersApi } from "../../../api/endpoints/cert-manager.api";
import { autobind, cssNames } from "../../../utils";
import { getDetailsUrl } from "../../../navigation";
import { secretsApi } from "../../../api/endpoints";
import { apiManager } from "../../../api/api-manager";
import { KubeObjectMeta } from "../../kube-object/kube-object-meta";
let IssuerDetails = class IssuerDetails extends React.Component {
    renderSecretLink(secretName) {
        const namespace = this.props.object.getNs();
        if (!namespace) {
            return secretName;
        }
        const secretDetailsUrl = getDetailsUrl(secretsApi.getUrl({
            namespace: namespace,
            name: secretName,
        }));
        return (<Link to={secretDetailsUrl}>
        {secretName}
      </Link>);
    }
    render() {
        const { object: issuer, className } = this.props;
        if (!issuer)
            return;
        const { renderSecretLink } = this;
        const { spec: { acme, ca, vault, venafi }, status } = issuer;
        return (<div className={cssNames("IssuerDetails", className)}>
        <KubeObjectMeta object={issuer}/>

        <DrawerItem name={`Type`}>
          {issuer.getType()}
        </DrawerItem>

        <DrawerItem name={`Status`} labelsOnly>
          {issuer.getConditions().map(({ type, tooltip, isReady }) => {
            return (<Badge key={type} label={type} tooltip={tooltip} className={cssNames({ [type.toLowerCase()]: isReady })}/>);
        })}
        </DrawerItem>

        {acme && (() => {
            const { email, server, skipTLSVerify, privateKeySecretRef, solvers } = acme;
            return (<>
              <DrawerTitle title="ACME"/>
              <DrawerItem name={`E-mail`}>
                {email}
              </DrawerItem>
              <DrawerItem name={`Server`}>
                {server}
              </DrawerItem>
              {status.acme && (<DrawerItem name={`Status URI`}>
                  {status.acme.uri}
                </DrawerItem>)}
              <DrawerItem name={`Private Key Secret`}>
                {renderSecretLink(privateKeySecretRef.name)}
              </DrawerItem>
              <DrawerItem name={`Skip TLS Verify`}>
                {skipTLSVerify ? `Yes` : `No`}
              </DrawerItem>
            </>);
        })()}

        {ca && (() => {
            const { secretName } = ca;
            return (<>
              <DrawerTitle title="CA"/>
              <DrawerItem name={`Secret Name`}>
                {renderSecretLink(secretName)}
              </DrawerItem>
            </>);
        })()}

        {vault && (() => {
            const { auth, caBundle, path, server } = vault;
            const { path: authPath, roleId, secretRef } = auth.appRole;
            return (<>
              <DrawerTitle title="Vault"/>
              <DrawerItem name={`Server`}>
                {server}
              </DrawerItem>
              <DrawerItem name={`Path`}>
                {path}
              </DrawerItem>
              <DrawerItem name={`CA Bundle`} labelsOnly>
                <Badge label={caBundle}/>
              </DrawerItem>

              <DrawerTitle title={`Auth App Role`}/>
              <DrawerItem name={`Path`}>
                {authPath}
              </DrawerItem>
              <DrawerItem name={`Role ID`}>
                {roleId}
              </DrawerItem>
              {secretRef && (<DrawerItem name={`Secret`}>
                  {renderSecretLink(secretRef.name)}
                </DrawerItem>)}
            </>);
        })()}

        {venafi && (() => {
            const { zone, cloud, tpp } = venafi;
            return (<>
              <DrawerTitle title="CA"/>
              <DrawerItem name={`Zone`}>
                {zone}
              </DrawerItem>
              {cloud && (<DrawerItem name={`Cloud API Token Secret`}>
                  {renderSecretLink(cloud.apiTokenSecretRef.name)}
                </DrawerItem>)}
              {tpp && (<>
                  <DrawerTitle title="TPP"/>
                  <DrawerItem name={`URL`}>
                    {tpp.url}
                  </DrawerItem>
                  <DrawerItem name={`CA Bundle`} labelsOnly>
                    <Badge label={tpp.caBundle}/>
                  </DrawerItem>
                  <DrawerItem name={`Credentials Ref`}>
                    {renderSecretLink(tpp.credentialsRef.name)}
                  </DrawerItem>
                </>)}
            </>);
        })()}

        <KubeEventDetails object={issuer}/>
      </div>);
    }
};
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IssuerDetails.prototype, "renderSecretLink", null);
IssuerDetails = __decorate([
    observer
], IssuerDetails);
export { IssuerDetails };
apiManager.registerViews([issuersApi, clusterIssuersApi], {
    Details: IssuerDetails
});
//# sourceMappingURL=issuer-details.jsx.map