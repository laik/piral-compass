var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import './menu-picker.scss';
import React, { useRef, useState } from "react";
import { cssNames } from "../../utils";
import { Menu } from "./menu";
import { Icon } from "../icon";
import { Button } from "../button";
import uniqueId from "lodash/uniqueId";
export function MenuPicker(props) {
    const id = useRef(uniqueId("menu_picker_")).current;
    const { className, title, waiting, children } = props, menuProps = __rest(props, ["className", "title", "waiting", "children"]);
    const [isOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!isOpen);
    return (<div className={cssNames("MenuPicker", className, { waiting })}>
      <Button primary id={id}>
        {title}
        <Icon material="arrow_drop_down"/>
      </Button>
      <Menu htmlFor={id} isOpen={isOpen} open={toggle} close={toggle} closeOnClickItem={false} {...menuProps}>
        <div className="menu-header flex gaps">
          <span className="box grow">{title}</span>
          <Icon small material="close" onClick={toggle}/>
        </div>
        {children}
      </Menu>
    </div>);
}
//# sourceMappingURL=menu-picker.jsx.map