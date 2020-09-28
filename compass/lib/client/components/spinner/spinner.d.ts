import './spinner.scss';
import * as React from 'react';
interface Props extends React.HTMLProps<any> {
    singleColor?: boolean;
    center?: boolean;
}
export declare class Spinner extends React.Component<Props, {}> {
    private elem;
    static defaultProps: {
        singleColor: boolean;
        center: boolean;
    };
    render(): JSX.Element;
}
export {};
