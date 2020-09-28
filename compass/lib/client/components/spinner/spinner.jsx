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
import './spinner.scss';
import * as React from 'react';
import { cssNames } from "../../utils";
export class Spinner extends React.Component {
    render() {
        const _a = this.props, { center, singleColor } = _a, props = __rest(_a, ["center", "singleColor"]);
        let { className } = this.props;
        className = cssNames('Spinner', className, {
            singleColor: singleColor,
            center: center,
        });
        return <div {...props} className={className} ref={e => this.elem = e}/>;
    }
}
Spinner.defaultProps = {
    singleColor: true,
    center: false,
};
//# sourceMappingURL=spinner.jsx.map