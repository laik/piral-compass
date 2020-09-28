var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./crd-details.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { apiManager } from "../../api/api-manager";
import { crdApi } from "../../api/endpoints/crd.api";
import { cssNames } from "../../utils";
import { AceEditor } from "../ace-editor";
import { Badge } from "../badge";
import { DrawerItem, DrawerTitle } from "../drawer";
import { Table, TableCell, TableHead, TableRow } from "../table";
import { Input } from "../input";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";
let CRDDetails = class CRDDetails extends React.Component {
    render() {
        const { object: crd } = this.props;
        if (!crd)
            return null;
        const { plural, singular, kind, listKind } = crd.getNames();
        const printerColumns = crd.getPrinterColumns();
        const validation = crd.getValidation();
        return (<div className="CRDDetails">
        <KubeObjectMeta object={crd}/>

        <DrawerItem name={`Group`}>
          {crd.getGroup()}
        </DrawerItem>
        <DrawerItem name={`Version`}>
          {crd.getVersion()}
        </DrawerItem>
        <DrawerItem name={`Stored versions`}>
          {crd.getStoredVersions()}
        </DrawerItem>
        <DrawerItem name={`Scope`}>
          {crd.getScope()}
        </DrawerItem>
        <DrawerItem name={`Resource`}>
          <Link to={crd.getResourceUrl()}>
            {crd.getResourceTitle()}
          </Link>
        </DrawerItem>
        <DrawerItem name={`Conversion`} className="flex gaps align-flex-start">
          <Input multiLine theme="round-black" className="box grow" value={crd.getConversion()} readOnly/>
        </DrawerItem>
        <DrawerItem name={`Conditions`} className="conditions" labelsOnly>
          {crd.getConditions().map(condition => {
            const { type, message, lastTransitionTime, status } = condition;
            return (<Badge key={type} label={type} className={cssNames({ disabled: status === "False" }, type)} tooltip={(<>
                      <p>{message}</p>
                      <p>`Last transition time: {lastTransitionTime}`</p>
                    </>)}/>);
        })}
        </DrawerItem>
        <DrawerTitle title={`Names`}/>
        <Table selectable className="names box grow">
          <TableHead>
            <TableCell>`plural`</TableCell>
            <TableCell>`singular`</TableCell>
            <TableCell>`kind`</TableCell>
            <TableCell>`listKind`</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>{plural}</TableCell>
            <TableCell>{singular}</TableCell>
            <TableCell>{kind}</TableCell>
            <TableCell>{listKind}</TableCell>
          </TableRow>
        </Table>
        {printerColumns.length > 0 &&
            <>
          <DrawerTitle title={`Additional Printer Columns`}/>
          <Table selectable className="printer-columns box grow">
            <TableHead>
              <TableCell className="name">`Name`</TableCell>
              <TableCell className="type">`Type`</TableCell>
              <TableCell className="json-path">`JSON Path`</TableCell>
            </TableHead>
            {printerColumns.map((column, index) => {
                const { name, type, JSONPath } = column;
                return (<TableRow key={index}>
                    <TableCell className="name">{name}</TableCell>
                    <TableCell className="type">{type}</TableCell>
                    <TableCell className="json-path">
                      <Badge label={JSONPath}/>
                    </TableCell>
                  </TableRow>);
            })}
          </Table>
        </>}
        {validation &&
            <>
          <DrawerTitle title={`Validation`}/>
          <AceEditor mode="json" className="validation" value={validation} readOnly/>
        </>}
      </div>);
    }
};
CRDDetails = __decorate([
    observer
], CRDDetails);
export { CRDDetails };
apiManager.registerViews(crdApi, {
    Details: CRDDetails
});
//# sourceMappingURL=crd-details.jsx.map