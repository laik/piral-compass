var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
import "./node-select.scss";
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { Select } from "../select";
import { cssNames, noop } from "../../utils";
import { Icon } from "../icon";
import { nodesStore } from "./nodes.store";
const defaultProps = {
    showIcons: true,
    showClusterOption: false,
    get clusterOptionLabel() {
        return `Cluster`;
    },
};
let NodeSelect = class NodeSelect extends React.Component {
    constructor() {
        super(...arguments);
        this.unsubscribe = noop;
        this.formatOptionLabel = (option) => {
            const { showIcons } = this.props;
            const { value, label } = option;
            return label || (<>
                {showIcons && <Icon small material="layers"/>}
                {value}
            </>);
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nodesStore.isLoaded)
                yield nodesStore.loadAll();
            this.unsubscribe = nodesStore.subscribe();
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    get options() {
        const { customizeOptions, showClusterOption, clusterOptionLabel } = this.props;
        let options = nodesStore.items.map(node => ({ value: node.getName() }));
        options = customizeOptions ? customizeOptions(options) : options;
        if (showClusterOption) {
            options.unshift({ value: null, label: clusterOptionLabel });
        }
        return options;
    }
    render() {
        const _a = this.props, { className, showIcons, showClusterOption, clusterOptionLabel, customizeOptions } = _a, selectProps = __rest(_a, ["className", "showIcons", "showClusterOption", "clusterOptionLabel", "customizeOptions"]);
        return (<Select className={cssNames("NodeSelect", className)} menuClass="NodeSelectMenu" formatOptionLabel={this.formatOptionLabel} options={this.options} {...selectProps}/>);
    }
};
NodeSelect.defaultProps = defaultProps;
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], NodeSelect.prototype, "options", null);
NodeSelect = __decorate([
    observer
], NodeSelect);
export { NodeSelect };
//# sourceMappingURL=node-select.jsx.map