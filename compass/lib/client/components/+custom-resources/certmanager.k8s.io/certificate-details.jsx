var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./certificate-details.scss";
import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { DrawerItem, DrawerTitle } from "../../drawer";
import { Badge } from "../../badge";
import { KubeEventDetails } from "../../+events/kube-event-details";
import { certificatesApi } from "../../../api/endpoints/cert-manager.api";
import { cssNames } from "../../../utils";
import { apiManager } from "../../../api/api-manager";
import { KubeObjectMeta } from "../../kube-object/kube-object-meta";
let CertificateDetails = class CertificateDetails extends React.Component {
    render() {
        const { object: cert, className } = this.props;
        if (!cert)
            return;
        const { spec, status } = cert;
        const { acme, isCA, commonName, secretName, dnsNames, duration, ipAddresses, keyAlgorithm, keySize, organization, renewBefore } = spec;
        const { lastFailureTime, notAfter } = status;
        return (<div className={cssNames("CertificateDetails", className)}>
        <KubeObjectMeta object={cert}/>

        <DrawerItem name={`Issuer`}>
          <Link to={cert.getIssuerDetailsUrl()}>
            {cert.getIssuerName()}
          </Link>
        </DrawerItem>

        <DrawerItem name={`Secret Name`}>
          <Link to={cert.getSecretDetailsUrl()}>
            {secretName}
          </Link>
        </DrawerItem>

        <DrawerItem name="CA">
          {isCA ? `Yes` : `No`}
        </DrawerItem>

        {commonName && (<DrawerItem name={`Common Name`}>
            {commonName}
          </DrawerItem>)}
        {dnsNames && (<DrawerItem name={`DNS names`} labelsOnly>
            {dnsNames.map(name => <Badge key={name} label={name}/>)}
          </DrawerItem>)}
        {ipAddresses && (<DrawerItem name={`IP addresses`}>
            {ipAddresses.join(", ")}
          </DrawerItem>)}
        {organization && (<DrawerItem name={`Organization`}>
            {organization.join(", ")}
          </DrawerItem>)}
        {duration && (<DrawerItem name={`Duration`}>
            {duration}
          </DrawerItem>)}
        {renewBefore && (<DrawerItem name={`Renew Before`}>
            {renewBefore}
          </DrawerItem>)}
        {keySize && (<DrawerItem name={`Key Size`}>
            {keySize}
          </DrawerItem>)}
        {keyAlgorithm && (<DrawerItem name={`Key Algorithm`}>
            {keyAlgorithm}
          </DrawerItem>)}

        <DrawerItem name={`Not After`}>
          {moment(notAfter).format("LLL")}
        </DrawerItem>

        {lastFailureTime && (<DrawerItem name={`Last Failure Time`}>
            {lastFailureTime}
          </DrawerItem>)}
        <DrawerItem name={`Status`} labelsOnly>
          {cert.getConditions().map(({ type, tooltip, isReady }) => {
            return (<Badge key={type} label={type} tooltip={tooltip} className={cssNames({ [type.toLowerCase()]: isReady })}/>);
        })}
        </DrawerItem>

        {acme && (<>
            <DrawerTitle title="ACME"/>
            {acme.config.map(({ domains, http01, dns01 }, index) => {
            return (<div key={index} className="acme-config">
                  <DrawerItem name={`Domains`} labelsOnly>
                    {domains.map(domain => <Badge key={domain} label={domain}/>)}
                  </DrawerItem>
                  <DrawerItem name={`Http01`}>
                    {Object.entries(http01).map(([key, val]) => `${key}: ${val}`)[0]}
                  </DrawerItem>
                  {dns01 && (<DrawerItem name={`DNS Provider`} labelsOnly>
                      {dns01.provider}
                    </DrawerItem>)}
                </div>);
        })}
          </>)}

        <KubeEventDetails object={cert}/>
      </div>);
    }
};
CertificateDetails = __decorate([
    observer
], CertificateDetails);
export { CertificateDetails };
apiManager.registerViews(certificatesApi, {
    Details: CertificateDetails
});
//# sourceMappingURL=certificate-details.jsx.map