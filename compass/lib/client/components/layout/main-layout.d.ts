import "./main-layout.scss";
import * as React from "react";
import { RouteProps } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
export interface TabRoute extends RouteProps {
    title: React.ReactNode;
    url: string;
}
interface Props extends RouteComponentProps {
    className?: any;
    tabs?: TabRoute[];
    footer?: React.ReactNode;
    headerClass?: string;
    contentClass?: string;
    footerClass?: string;
}
interface State {
}
export declare class Layout extends React.Component<Props, State> {
    storage: import("../../utils").StorageHelper<{
        pinnedSidebar: boolean;
    }>;
    isPinned: boolean;
    isAccessible: boolean;
    syncPinnedStateWithStorage: import("mobx").IReactionDisposer;
    toggleSidebar: () => void;
    changeTheme(): void;
    loginout: () => void;
    ifLogin(): any;
    renderUserMenu(): JSX.Element;
    render(): JSX.Element;
}
export declare const MainLayout: React.ComponentClass<Pick<Props, "className" | "footer" | "contentClass" | "tabs" | "headerClass" | "footerClass"> & {
    wrappedComponentRef?: React.Ref<Layout>;
}, any> & import("react-router").WithRouterStatics<typeof Layout>;
export {};
