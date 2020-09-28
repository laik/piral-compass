import './notifications.scss';
import React from 'react';
import { IMessage, INotification } from "./notifications.store";
export declare class Notifications extends React.Component {
    elem: HTMLElement;
    static ok(message: IMessage): void;
    static error(message: IMessage): void;
    static info(message: IMessage): void;
    componentDidMount(): void;
    scrollToLastNotification(): void;
    getMessage(notification: INotification): (string | number | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal)[];
    render(): JSX.Element;
}
