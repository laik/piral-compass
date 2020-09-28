var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "./kube-event-details.scss";
import React from "react";
import { observer } from "mobx-react";
import { DrawerItem, DrawerTitle } from "../drawer";
import { cssNames } from "../../utils";
import { eventStore } from "./event.store";
let KubeEventDetails = class KubeEventDetails extends React.Component {
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            eventStore.loadAll();
        });
    }
    render() {
        const { object, title } = this.props;
        const events = eventStore.getEventsByObject(object);
        if (!events.length) {
            return null;
        }
        return (<>
        <DrawerTitle className="flex gaps align-center">
          <span>{title}</span>
        </DrawerTitle>
        <div className="KubeEventDetails">
          {events.map(evt => {
            const { message, count, lastTimestamp, involvedObject } = evt;
            return (<div className="event" key={evt.getId()}>
                <div className={cssNames("title", { warning: evt.isWarning() })}>
                  {message}
                </div>
                <DrawerItem name={`Source`}>
                  {evt.getSource()}
                </DrawerItem>
                <DrawerItem name={`Count`}>
                  {count}
                </DrawerItem>
                <DrawerItem name={`Sub-object`}>
                  {involvedObject.fieldPath}
                </DrawerItem>
                <DrawerItem name={`Last seen`}>
                  {lastTimestamp}
                </DrawerItem>
              </div>);
        })}
        </div>
      </>);
    }
};
KubeEventDetails.defaultProps = {
    title: `Events`
};
KubeEventDetails = __decorate([
    observer
], KubeEventDetails);
export { KubeEventDetails };
//# sourceMappingURL=kube-event-details.jsx.map