/// <reference types="react-addons-linked-state-mixin" />
import "./add-remove-buttons.scss";
import * as React from "react";
export interface AddRemoveButtonsProps extends React.HTMLAttributes<any> {
    onAdd?: () => void;
    onRemove?: () => void;
    addTooltip?: React.ReactNode;
    removeTooltip?: React.ReactNode;
}
export declare class AddRemoveButtons extends React.PureComponent<AddRemoveButtonsProps> {
    renderButtons(): JSX.Element[];
    render(): JSX.Element;
}
