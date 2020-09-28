import './menu-picker.scss';
import React from "react";
import { MenuProps } from "./menu";
interface Props extends Partial<MenuProps> {
    title: React.ReactNode;
    waiting?: boolean;
}
export declare function MenuPicker(props: Props): JSX.Element;
export {};
