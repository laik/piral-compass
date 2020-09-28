import "./kube-event-icon.scss";
import React from "react";
import { Icon } from "../icon";
import { TooltipContent } from "../tooltip";
import { eventStore } from "./event.store";
import { cssNames } from "../../utils";
const defaultProps = {
    showWarningsOnly: true,
};
export class KubeEventIcon extends React.Component {
    render() {
        const { object, showWarningsOnly, namespace, filterEvents } = this.props;
        let events;
        namespace == ""
            ? events = eventStore.getEventsByObject(object)
            : events = eventStore.getEventsByNamespaceObject(namespace, object);
        let warnings = events.filter(evt => evt.isWarning());
        if (filterEvents)
            warnings = filterEvents(warnings);
        if (!events.length || (showWarningsOnly && !warnings.length)) {
            return null;
        }
        const event = [...warnings, ...events][0]; // get latest event
        return (<Icon material="warning" className={cssNames("KubeEventIcon", { warning: event.isWarning() })} tooltip={(<TooltipContent className="KubeEventTooltip">
            {event.message}
            <div className="age">
              <Icon material="access_time"/>
              {event.getAge(undefined, undefined, true)}
            </div>
          </TooltipContent>)}/>);
    }
}
KubeEventIcon.defaultProps = defaultProps;
//# sourceMappingURL=kube-event-icon.jsx.map