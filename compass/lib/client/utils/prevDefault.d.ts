import * as React from "react";
export declare function prevDefault<E extends React.SyntheticEvent | Event>(callback: (evt: E) => any): (evt: E) => any;
export declare function stopPropagation(evt: Event | React.SyntheticEvent): void;
