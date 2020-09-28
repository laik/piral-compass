var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { cssNames } from "../../utils";
import { getSelectedDetails, showDetails } from "../../navigation";
import { ItemListLayout } from "../item-object-list";
let KubeObjectListLayout = class KubeObjectListLayout extends React.Component {
    constructor() {
        super(...arguments);
        this.onDetails = (item) => {
            if (this.props.onDetails) {
                this.props.onDetails(item);
            }
            else {
                showDetails(item.selfLink);
            }
        };
    }
    get selectedItem() {
        return this.props.store.getByPath(getSelectedDetails());
    }
    render() {
        const _a = this.props, { className } = _a, layoutProps = __rest(_a, ["className"]);
        return (<ItemListLayout {...layoutProps} className={cssNames("KubeObjectListLayout", className)} detailsItem={this.selectedItem} onDetails={this.onDetails}/>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], KubeObjectListLayout.prototype, "selectedItem", null);
KubeObjectListLayout = __decorate([
    observer
], KubeObjectListLayout);
export { KubeObjectListLayout };
//# sourceMappingURL=kube-object-list-layout.jsx.map