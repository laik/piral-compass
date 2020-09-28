var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "./cluster-issues.scss";
import * as React from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { Icon } from "../icon";
import { SubHeader } from "../layout/sub-header";
import { Table, TableCell, TableHead, TableRow } from "../table";
import { nodesStore } from "../+nodes/nodes.store";
import { eventStore } from "../+events/event.store";
import { autobind, cssNames, prevDefault } from "../../utils";
import { getSelectedDetails, showDetails } from "../../navigation";
import { Spinner } from "../spinner";
import { themeStore } from "../../theme.store";
import { lookupApiLink } from "../../api/kube-api";
var sortBy;
(function (sortBy) {
    sortBy["type"] = "type";
    sortBy["object"] = "object";
})(sortBy || (sortBy = {}));
let ClusterIssues = class ClusterIssues extends React.Component {
    constructor() {
        super(...arguments);
        this.sortCallbacks = {
            [sortBy.type]: (warning) => warning.kind,
            [sortBy.object]: (warning) => warning.getName(),
        };
    }
    get warnings() {
        const warnings = [];
        // Node bad conditions
        nodesStore.items.forEach(node => {
            const { kind, selfLink, getId, getName } = node;
            node.getWarningConditions().forEach(({ message }) => {
                warnings.push({
                    kind,
                    getId,
                    getName,
                    selfLink,
                    message,
                });
            });
        });
        // Warning events for Workloads
        const events = eventStore.getWarnings();
        events.forEach(error => {
            const { message, involvedObject } = error;
            const { uid, name, kind } = involvedObject;
            warnings.push({
                getId: () => uid,
                getName: () => name,
                message,
                kind,
                selfLink: lookupApiLink(involvedObject, error),
            });
        });
        return warnings;
    }
    getTableRow(uid) {
        const { warnings } = this;
        const warning = warnings.find(warn => warn.getId() == uid);
        const { getId, getName, message, kind, selfLink } = warning;
        return (<TableRow key={getId()} sortItem={warning} selected={selfLink === getSelectedDetails()} onClick={prevDefault(() => showDetails(selfLink))}>
        <TableCell className="message">
          {message}
        </TableCell>
        <TableCell className="object">
          {getName()}
        </TableCell>
        <TableCell className="kind">
          {kind}
        </TableCell>
      </TableRow>);
    }
    renderContent() {
        const { warnings } = this;
        if (!eventStore.isLoaded) {
            return (<Spinner center/>);
        }
        if (!warnings.length) {
            return (<div className="no-issues flex column box grow gaps align-center justify-center">
          <div><Icon material="check" big sticker/></div>
          <div className="ok-title">No issues found</div>
          <span>Everything is fine in the Cluster</span>
        </div>);
        }
        return (<>
        <SubHeader>
          <Icon material="error_outline"/>{" "}
          Warnings: {warnings.length}
        </SubHeader>
        <Table items={warnings} virtual selectable sortable={this.sortCallbacks} sortByDefault={{ sortBy: sortBy.object, orderBy: "asc" }} sortSyncWithUrl={false} getTableRow={this.getTableRow} className={cssNames("box grow", themeStore.activeTheme.type)}>
          <TableHead nowrap>
            <TableCell className="message">Message</TableCell>
            <TableCell className="object" sortBy={sortBy.object}>Object</TableCell>
            <TableCell className="kind" sortBy={sortBy.type}>Type</TableCell>
          </TableHead>
        </Table>
      </>);
    }
    render() {
        return (<div className={cssNames("ClusterIssues flex column", this.props.className)}>
        {this.renderContent()}
      </div>);
    }
};
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ClusterIssues.prototype, "warnings", null);
__decorate([
    autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClusterIssues.prototype, "getTableRow", null);
ClusterIssues = __decorate([
    observer
], ClusterIssues);
export { ClusterIssues };
//# sourceMappingURL=cluster-issues.jsx.map