var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./crd-list.scss";
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { stopPropagation } from "../../utils";
import { KubeObjectListLayout } from "../kube-object";
import { crdStore } from "./crd.store";
import { apiManager } from "../../api/api-manager";
import { crdApi } from "../../api/endpoints/crd.api";
import { KubeObjectMenu } from "../kube-object/kube-object-menu";
import { Select } from "../select";
import { navigation, setQueryParams } from "../../navigation";
import { Icon } from "../icon";
var sortBy;
(function (sortBy) {
    sortBy["kind"] = "kind";
    sortBy["group"] = "group";
    sortBy["version"] = "version";
    sortBy["scope"] = "scope";
    sortBy["age"] = "age";
})(sortBy || (sortBy = {}));
let CrdList = class CrdList extends React.Component {
    get groups() {
        return navigation.searchParams.getAsArray("groups");
    }
    onGroupChange(group) {
        const groups = [...this.groups];
        const index = groups.findIndex(item => item == group);
        if (index !== -1)
            groups.splice(index, 1);
        else
            groups.push(group);
        setQueryParams({ groups });
    }
    render() {
        const selectedGroups = this.groups;
        const sortingCallbacks = {
            [sortBy.kind]: (crd) => crd.getResourceKind(),
            [sortBy.group]: (crd) => crd.getGroup(),
            [sortBy.version]: (crd) => crd.getVersion(),
            [sortBy.scope]: (crd) => crd.getScope(),
        };
        return (<KubeObjectListLayout className="CrdList" isClusterScoped={true} store={crdStore} sortingCallbacks={sortingCallbacks} searchFilters={Object.values(sortingCallbacks)} filterItems={[
            (items) => {
                return selectedGroups.length ? items.filter(item => selectedGroups.includes(item.getGroup())) : items;
            }
        ]} renderHeaderTitle={`Custom Resources`} customizeHeader={() => {
            let placeholder = `All groups`;
            if (selectedGroups.length == 1)
                placeholder = "Group:" + selectedGroups[0];
            if (selectedGroups.length >= 2)
                placeholder = "Groups:" + selectedGroups.join(", ");
            return {
                // fixme: move to global filters
                filters: (<Select className="group-select" placeholder={placeholder} options={Object.keys(crdStore.groups)} onChange={({ value: group }) => this.onGroupChange(group)} controlShouldRenderValue={false} formatOptionLabel={({ value: group }) => {
                    const isSelected = selectedGroups.includes(group);
                    return (<div className="flex gaps align-center">
                      <Icon small material="folder"/>
                      <span>{group}</span>
                      {isSelected && <Icon small material="check" className="box right"/>}
                    </div>);
                }}/>)
            };
        }} renderTableHeader={[
            { title: `Resource`, className: "kind", sortBy: sortBy.kind },
            { title: `Group`, className: "group", sortBy: sortBy.group },
            { title: `Version`, className: "version", sortBy: sortBy.group },
            { title: `Scope`, className: "scope", sortBy: sortBy.scope },
            { title: `Age`, className: "age", sortBy: sortBy.age },
        ]} renderTableContents={(crd) => {
            return [
                <Link to={crd.getResourceUrl()} onClick={stopPropagation}>
              {crd.getResourceTitle()}
            </Link>,
                crd.getGroup(),
                crd.getVersion(),
                crd.getScope(),
                crd.getAge(),
            ];
        }} renderItemMenu={(item) => {
            return <CRDMenu object={item}/>;
        }}/>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CrdList.prototype, "groups", null);
CrdList = __decorate([
    observer
], CrdList);
export { CrdList };
export function CRDMenu(props) {
    return (<KubeObjectMenu {...props}/>);
}
apiManager.registerViews(crdApi, {
    Menu: CRDMenu,
});
//# sourceMappingURL=crd-list.jsx.map