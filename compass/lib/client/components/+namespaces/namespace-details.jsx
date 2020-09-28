var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./namespace-details.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { DrawerItem } from "../drawer";
import { cssNames } from "../../utils";
import { namespacesApi } from "../../api/endpoints";
import { apiManager } from "../../api/api-manager";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";
let NamespaceDetails = class NamespaceDetails extends React.Component {
    render() {
        const { object: namespace } = this.props;
        if (!namespace)
            return;
        const status = namespace.getStatus();
        return (<div className="NamespaceDetails">
        <KubeObjectMeta object={namespace}/>

        <DrawerItem name={`Status`}>
          <span className={cssNames("status", status.toLowerCase())}>{status}</span>
        </DrawerItem>

      </div>);
    }
};
NamespaceDetails = __decorate([
    observer
], NamespaceDetails);
export { NamespaceDetails };
apiManager.registerViews(namespacesApi, {
    Details: NamespaceDetails
});
//# sourceMappingURL=namespace-details.jsx.map