import React from 'react';
import { RouteComponentProps } from 'react-router';
import './login.scss';
interface Props extends RouteComponentProps {
    history: any;
}
declare class LoginComponet extends React.Component<Props> {
    username: string;
    password: string;
    loading: boolean;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onFinish: () => void;
    render(): JSX.Element;
}
export declare const Login: React.ComponentClass<Pick<Props, never> & {
    wrappedComponentRef?: React.Ref<LoginComponet>;
}, any> & import("react-router").WithRouterStatics<typeof LoginComponet>;
export {};
