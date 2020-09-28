import "./namespaces.scss";
import * as React from "react";
import { MenuItem } from "../menu";
import { Icon } from "../icon";
import { namespacesApi, NamespaceStatus } from "../../api/endpoints";
import { AddNamespaceDialog } from "./add-namespace-dialog";
import { MainLayout } from "../layout/main-layout";
import { Badge } from "../badge";
import { KubeObjectMenu } from "../kube-object/kube-object-menu";
import { KubeObjectListLayout } from "../kube-object";
import { namespaceStore } from "./namespace.store";
import { apiManager } from "../../api/api-manager";
import { NamespaceNodeRangeLimitDialog } from "./namespace-nodelimit-dialog";
var sortBy;
(function (sortBy) {
    sortBy["name"] = "name";
    sortBy["labels"] = "labels";
    sortBy["age"] = "age";
    sortBy["status"] = "status";
})(sortBy || (sortBy = {}));
export class Namespaces extends React.Component {
    render() {
        return (<MainLayout>
        <KubeObjectListLayout isClusterScoped className="Namespaces" store={namespaceStore} sortingCallbacks={{
            [sortBy.name]: (ns) => ns.getName(),
            [sortBy.labels]: (ns) => ns.getLabels(),
            [sortBy.age]: (ns) => ns.getAge(false),
            [sortBy.status]: (ns) => ns.getStatus(),
        }} searchFilters={[
            (item) => item.getSearchFields(),
            (item) => item.getStatus()
        ]} renderHeaderTitle={`Namespaces`} renderTableHeader={[
            { title: `Name`, className: "name", sortBy: sortBy.name },
            { title: `Labels`, className: "labels", sortBy: sortBy.labels },
            { title: `Age`, className: "age", sortBy: sortBy.age },
            { title: `Status`, className: "status", sortBy: sortBy.status },
        ]} renderTableContents={(item) => [
            item.getName(),
            item.getLabels().map(label => <Badge key={label} label={label}/>),
            item.getAge(),
            { title: item.getStatus(), className: item.getStatus().toLowerCase() },
        ]} renderItemMenu={(item) => {
            return <NamespaceMenu object={item}/>;
        }} addRemoveButtons={{
            addTooltip: `Add Namespace`,
            onAdd: () => AddNamespaceDialog.open(),
        }} customizeTableRowProps={(item) => ({
            disabled: item.getStatus() === NamespaceStatus.TERMINATING,
        })}/>
        <AddNamespaceDialog />
        <NamespaceNodeRangeLimitDialog />
      </MainLayout>);
    }
}
export function NamespaceMenu(props) {
    const { object, toolbar } = props;
    return (<KubeObjectMenu {...props}>
      <MenuItem onClick={() => { NamespaceNodeRangeLimitDialog.open(object); }}>
        <Icon material="settings_applications" title={`Allow Node`} interactive={toolbar}/>
        <span className="title">`Allow Node`</span>
      </MenuItem>
    </KubeObjectMenu>);
}
apiManager.registerViews(namespacesApi, {
    Menu: NamespaceMenu,
});
//# sourceMappingURL=namespaces.jsx.map