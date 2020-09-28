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
// Wrapper for <Slider/> component
// API docs: https://material-ui.com/lab/api/slider/
import "./slider.scss";
import React, { Component } from "react";
import { cssNames } from "../../utils";
import MaterialSlider from "@material-ui/core/Slider";
const defaultProps = {
    step: 1,
    min: 0,
    max: 100,
};
export class Slider extends Component {
    constructor() {
        super(...arguments);
        this.classNames = {
            track: "track",
            thumb: "thumb",
            disabled: "disabled",
            vertical: "vertical",
        };
    }
    render() {
        const _a = this.props, { className } = _a, sliderProps = __rest(_a, ["className"]);
        return (<MaterialSlider {...sliderProps} classes={Object.assign({ root: cssNames("Slider", className) }, this.classNames)}/>);
    }
}
Slider.defaultProps = defaultProps;
//# sourceMappingURL=slider.jsx.map