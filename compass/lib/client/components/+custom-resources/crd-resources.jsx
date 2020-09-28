var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./crd-resources.scss";
import React from "react";
import jsonPath from "jsonpath";
import { disposeOnUnmount, observer } from "mobx-react";
import { KubeObjectListLayout } from "../kube-object";
import { KubeObjectMenu } from "../kube-object/kube-object-menu";
import { autorun, computed } from "mobx";
import { crdStore } from "./crd.store";
import { apiManager } from "../../api/api-manager";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["namespace"] = "namespace";
    sortBy["age"] = "age";
})(sortBy || (sortBy = {}));
let CrdResources = class CrdResources extends React.Component {
    componentDidMount() {
        disposeOnUnmount(this, [
            autorun(() => {
                const { store } = this;
                if (store && !store.isLoading && !store.isLoaded) {
                    store.loadAll();
                }
            })
        ]);
    }
    get crd() {
        const { group, name } = this.props.match.params;
        return crdStore.getByGroup(group, name);
    }
    get store() {
        if (!this.crd)
            return null;
        return apiManager.getStore(this.crd.getResourceApiBase());
    }
    render() {
        const { crd, store } = this;
        if (!crd)
            return null;
        const isNamespaced = crd.isNamespaced();
        const extraColumns = crd.getPrinterColumns(false); // Cols with priority bigger than 0 are shown in details
        const sortingCallbacks = {
            [sortBy.name]: (item) => item.getName(),
            [sortBy.namespace]: (item) => item.getNs(),
            [sortBy.age]: (item) => item.getAge(false),
        };
        extraColumns.forEach(column => {
            sortingCallbacks[column.name] = (item) => jsonPath.query(item, column.JSONPath.slice(1));
        });
        // todo: merge extra columns and other params to predefined view
        const { List } = apiManager.getViews(crd.getResourceApiBase());
        const ListView = List || KubeObjectListLayout;
        return (<ListView className="CrdResources" isClusterScoped={!isNamespaced} store={store} sortingCallbacks={sortingCallbacks} searchFilters={[
            (item) => item.getSearchFields(),
        ]} renderHeaderTitle={crd.getResourceTitle()} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            isNamespaced && { title: `Namespace`, className: "namespace", sortBy: sortBy.namespace },
            ...extraColumns.map(column => {
                const { name } = column;
                return {
                    title: name,
                    className: name.toLowerCase(),
                    sortBy: name
                };
            }),
            { title: `Age`, className: "age", sortBy: sortBy.age },
        ]} renderTableContents={(crdInstance) => [
            crdInstance.getName(),
            isNamespaced && crdInstance.getNs(),
            ...extraColumns.map(column => jsonPath.query(crdInstance, column.JSONPath.slice(1))),
            crdInstance.getAge(),
        ]} renderItemMenu={(item) => {
            return <CrdResourceMenu object={item}/>;
        }}/>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CrdResources.prototype, "crd", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], CrdResources.prototype, "store", null);
CrdResources = __decorate([
    observer
], CrdResources);
export { CrdResources };
export function CrdResourceMenu(props) {
    const { Menu } = apiManager.getViews(props.object.selfLink);
    if (Menu) {
        return <Menu {...props}/>;
    }
    return (<KubeObjectMenu {...props}/>);
}
//# sourceMappingURL=crd-resources.jsx.map