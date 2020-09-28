var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import "./event-details.scss";
import React from "react";
import kebabCase from "lodash/kebabCase";
import { DrawerItem, DrawerTitle } from "../drawer";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { eventApi } from "../../api/endpoints/events.api";
import { apiManager } from "../../api/api-manager";
import { KubeObjectMeta } from "../kube-object/kube-object-meta";
import { getDetailsUrl } from "../../navigation";
import { Table, TableCell, TableHead, TableRow } from "../table";
import { lookupApiLink } from "../../api/kube-api";
let EventDetails = class EventDetails extends React.Component {
    render() {
        const { object: event } = this.props;
        if (!event)
            return;
        const { message, reason, count, type, involvedObject } = event;
        const { kind, name, namespace, fieldPath } = involvedObject;
        return (<div className="EventDetails">
        <KubeObjectMeta object={event}/>

        <DrawerItem name={`Message`}>
          {message}
        </DrawerItem>
        <DrawerItem name={`Reason`}>
          {reason}
        </DrawerItem>
        <DrawerItem name={`Source`}>
          {event.getSource()}
        </DrawerItem>
        <DrawerItem name={`First seen`}>
          {event.getFirstSeenTime()} `ago` {event.firstTimestamp}
        </DrawerItem>
        <DrawerItem name={`Last seen`}>
          {event.getLastSeenTime()} `ago` {event.lastTimestamp}
        </DrawerItem>
        <DrawerItem name={`Count`}>
          {count}
        </DrawerItem>
        <DrawerItem name={`Type`} className="type">
          <span className={kebabCase(type)}>{type}</span>
        </DrawerItem>

        <DrawerTitle title={`Involved object`}/>
        <Table>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Namespace</TableCell>
            <TableCell>Kind</TableCell>
            <TableCell>Field Path</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>
              <Link to={getDetailsUrl(lookupApiLink(involvedObject, event))}>
                {name}
              </Link>
            </TableCell>
            <TableCell>{namespace}</TableCell>
            <TableCell>{kind}</TableCell>
            <TableCell>{fieldPath}</TableCell>
          </TableRow>
        </Table>
      </div>);
    }
};
EventDetails = __decorate([
    observer
], EventDetails);
export { EventDetails };
apiManager.registerViews(eventApi, {
    Details: EventDetails,
});
//# sourceMappingURL=event-details.jsx.map