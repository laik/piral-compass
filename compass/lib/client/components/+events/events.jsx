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
import "./events.scss";
import React from "react";
import { observer } from "mobx-react";
import { MainLayout } from "../layout/main-layout";
import { eventStore } from "./event.store";
import { KubeObjectListLayout } from "../kube-object";
import { Tooltip, TooltipContent } from "../tooltip";
import { Link } from "react-router-dom";
import { cssNames, stopPropagation } from "../../utils";
import { Icon } from "../icon";
import { getDetailsUrl } from "../../navigation";
import { lookupApiLink } from "../../api/kube-api";
var sortBy;
(function (sortBy) {
    sortBy["namespace"] = "namespace";
    sortBy["object"] = "object";
    sortBy["type"] = "type";
    sortBy["count"] = "count";
    sortBy["age"] = "age";
})(sortBy || (sortBy = {}));
const defaultProps = {
    compactLimit: 10,
};
let Events = class Events extends React.Component {
    render() {
        const _a = this.props, { compact, compactLimit, className } = _a, layoutProps = __rest(_a, ["compact", "compactLimit", "className"]);
        const events = (<KubeObjectListLayout {...layoutProps} className={cssNames("Events", className, { compact })} store={eventStore} isSelectable={false} sortingCallbacks={{
            [sortBy.namespace]: (event) => event.getNs(),
            [sortBy.type]: (event) => event.involvedObject.kind,
            [sortBy.object]: (event) => event.involvedObject.name,
            [sortBy.count]: (event) => event.count,
            [sortBy.age]: (event) => event.getAge(false),
        }} searchFilters={[
            (event) => event.getSearchFields(),
            (event) => event.message,
            (event) => event.getSource(),
            (event) => event.involvedObject.name,
        ]} renderHeaderTitle={`Events`} customizeHeader={({ title, info }) => (compact ? title : ({
            info: (<>
                {info}
                <Icon small material="help_outline" className="help-icon" tooltip={`Limited to {eventStore.limit}`}/>
              </>)
        }))} renderTableHeader={[
            { title: `Message`, className: "message" },
            { title: `Namespace`, className: "namespace", sortBy: sortBy.namespace },
            { title: `Type`, className: "type", sortBy: sortBy.type },
            { title: `Involved Object`, className: "object", sortBy: sortBy.object },
            { title: `Source`, className: "source" },
            { title: `Count`, className: "count", sortBy: sortBy.count },
            { title: `Age`, className: "age", sortBy: sortBy.age },
        ]} renderTableContents={(event) => {
            const { involvedObject, type, message } = event;
            const { kind, name } = involvedObject;
            const tooltipId = `message-${event.getId()}`;
            const isWarning = type === "Warning";
            const detailsUrl = getDetailsUrl(lookupApiLink(involvedObject, event));
            return [
                {
                    className: {
                        warning: isWarning
                    },
                    title: (<>
                  <span id={tooltipId}>{message}</span>
                  <Tooltip htmlFor={tooltipId} following>
                    <TooltipContent narrow warning={isWarning}>
                      {message}
                    </TooltipContent>
                  </Tooltip>
                </>)
                },
                event.getNs(),
                kind,
                <Link to={detailsUrl} title={name} onClick={stopPropagation}>{name}</Link>,
                event.getSource(),
                event.count,
                event.getAge(),
            ];
        }} virtual={!compact} filterItems={[
            items => compact ? items.slice(0, compactLimit) : items,
        ]}/>);
        if (compact) {
            return events;
        }
        return (<MainLayout>
        {events}
      </MainLayout>);
    }
};
Events.defaultProps = defaultProps;
Events = __decorate([
    observer
], Events);
export { Events };
//# sourceMappingURL=events.jsx.map