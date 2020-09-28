import { RouteProps } from "react-router";
export declare const crdRoute: RouteProps;
export declare const crdDefinitionsRoute: RouteProps;
export declare const crdResourcesRoute: RouteProps;
export interface ICRDListQuery {
    groups?: string;
}
export interface ICRDRouteParams {
    group: string;
    name: string;
}
export declare const crdURL: ({ params, query }?: import("../../navigation").IURLParams<{}, ICRDListQuery>) => string;
export declare const crdResourcesURL: ({ params, query }?: import("../../navigation").IURLParams<ICRDRouteParams, object>) => string;
