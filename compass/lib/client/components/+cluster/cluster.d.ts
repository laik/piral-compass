import "./cluster.scss";
import React from "react";
export declare class Cluster extends React.Component {
    private watchers;
    private dependentStores;
    componentDidMount(): Promise<void>;
    get isLoaded(): boolean;
    render(): false | JSX.Element;
}
