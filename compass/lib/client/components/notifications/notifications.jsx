var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './notifications.scss';
import React from 'react';
import { reaction } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import { JsonApiErrorParsed } from "../../api/json-api";
import { cssNames, prevDefault } from "../../utils";
import { notificationsStore } from "./notifications.store";
import { Animate } from "../animate";
import { Icon } from "../icon";
let Notifications = class Notifications extends React.Component {
    static ok(message) {
        notificationsStore.add({
            message: message,
            timeout: 2500,
            status: "ok"
        });
    }
    static error(message) {
        notificationsStore.add({
            message: message,
            timeout: 10000,
            status: "error"
        });
    }
    static info(message) {
        return notificationsStore.add({
            message: message,
            timeout: 5000,
            status: "info"
        });
    }
    componentDidMount() {
        disposeOnUnmount(this, [
            reaction(() => notificationsStore.notifications.length, () => {
                this.scrollToLastNotification();
            }, { delay: 250 }),
        ]);
    }
    scrollToLastNotification() {
        if (!this.elem) {
            return;
        }
        this.elem.scrollTo({
            top: this.elem.scrollHeight,
            behavior: "smooth"
        });
    }
    getMessage(notification) {
        let { message } = notification;
        if (message instanceof JsonApiErrorParsed) {
            message = message.toString();
        }
        return React.Children.toArray(message);
    }
    render() {
        const { notifications, remove, addAutoHideTimer, removeAutoHideTimer } = notificationsStore;
        return (<div className="Notifications flex column align-flex-end" ref={e => this.elem = e}>
        {notifications.map(notification => {
            const { id, status } = notification;
            const msgText = this.getMessage(notification);
            return (<Animate key={id}>
              <div className={cssNames("notification flex align-center", status)} onMouseLeave={() => addAutoHideTimer(notification)} onMouseEnter={() => removeAutoHideTimer(notification)}>
                <div className="box center">
                  <Icon material="info_outline"/>
                </div>
                <div className="message box grow">{msgText}</div>
                <div className="box center">
                  <Icon material="close" className="close" onClick={prevDefault(() => remove(notification))}/>
                </div>
              </div>
            </Animate>);
        })}
      </div>);
    }
};
Notifications = __decorate([
    observer
], Notifications);
export { Notifications };
//# sourceMappingURL=notifications.jsx.map