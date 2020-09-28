var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./crd-resource-details.scss";
import * as React from "react";
import jsonPath from "jsonpath";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { cssNames } from "../../utils";
import { Badge } from "../badge";
import { DrawerItem } from "../drawer";
import { apiManager } from "../../api/api-manager";
import { crdStore } from "./crd.store";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";
let CrdResourceDetails = class CrdResourceDetails extends React.Component {
    get crd() {
        return crdStore.getByObject(this.props.object);
    }
    get CustomDetailsViews() {
        return apiManager.getViews(this.props.object.selfLink).Details;
    }
    render() {
        var _a;
        const { object } = this.props;
        const { crd, CustomDetailsViews } = this;
        if (!object || !crd)
            return null;
        const className = cssNames("CrdResourceDetails", crd.getResourceKind());
        const extraColumns = crd.getPrinterColumns();
        const showStatus = !extraColumns.find(column => column.name == "Status") && ((_a = object.status) === null || _a === void 0 ? void 0 : _a.conditions);
        if (CustomDetailsViews) {
            return <CustomDetailsViews className={className} object={object}/>;
        }
        return (<div className={className}>
        <KubeObjectMeta object={object}/>
        {extraColumns.map(column => {
            const { name } = column;
            return (<DrawerItem key={name} name={name}>
              {jsonPath.query(object, column.JSONPath.slice(1))}
            </DrawerItem>);
        })}
        {showStatus && (<DrawerItem name={`Status`} className="status" labelsOnly>
            {object.status.conditions.map((condition) => {
            const { type, message, status } = condition;
            return (<Badge key={type} label={type} className={cssNames({ disabled: status === "False" }, type.toLowerCase())} tooltip={message}/>);
        })}
          </DrawerItem>)}
      </div>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CrdResourceDetails.prototype, "crd", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CrdResourceDetails.prototype, "CustomDetailsViews", null);
CrdResourceDetails = __decorate([
    observer
], CrdResourceDetails);
export { CrdResourceDetails };
//# sourceMappingURL=crd-resource-details.jsx.map