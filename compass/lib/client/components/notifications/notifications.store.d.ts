import * as React from "react";
import { JsonApiErrorParsed } from "../../api/json-api";
export declare type IMessageId = string | number;
export declare type IMessage = React.ReactNode | React.ReactNode[] | JsonApiErrorParsed;
export interface INotification {
    id?: IMessageId;
    message: IMessage;
    status?: "ok" | "error" | "info";
    timeout?: number;
}
export declare class NotificationsStore {
    notifications: import("mobx").IObservableArray<INotification>;
    protected autoHideTimers: Map<string | number, number>;
    addAutoHideTimer(notification: INotification): void;
    removeAutoHideTimer(notification: INotification): void;
    add(notification: INotification): void;
    remove(itemOrId: IMessageId | INotification): boolean;
}
export declare const notificationsStore: NotificationsStore;
