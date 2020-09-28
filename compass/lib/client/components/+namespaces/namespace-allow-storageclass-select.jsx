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
import "./namespace-allow-storageclass-select.scss";
import React from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import { Select } from "../select";
import { cssNames, noop } from "../../utils";
import { Icon } from "../icon";
import { namespaceStore } from "./namespace.store";
const defaultProps = {
    showIcons: true,
    showClusterOption: false,
    namespaceName: '',
    get clusterOptionLabel() {
        return `StorageClass`;
    },
};
let NamespaceAllowStorageClassSelect = class NamespaceAllowStorageClassSelect extends React.Component {
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
            if (!namespaceStore.isLoaded)
                yield namespaceStore.loadAll();
            this.unsubscribe = namespaceStore.subscribe();
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    get options() {
        const { customizeOptions, showClusterOption, clusterOptionLabel, namespaceName } = this.props;
        let options;
        if (namespaceName != '') {
            try {
                options = namespaceStore.items.find(item => item.getName() === namespaceName)
                    .getAnnotations().filter(item => item.startsWith("fuxi.kubernetes.io/default_storage_limit"))
                    .map(item => ({ value: JSON.parse(item.split('=')[1])[0] }));
            }
            catch (err) {
                options = [];
            }
        }
        else {
            options = [];
        }
        options = customizeOptions ? customizeOptions(options) : options;
        if (showClusterOption) {
            options.unshift({ value: null, label: clusterOptionLabel });
        }
        return options;
    }
    render() {
        const _a = this.props, { className, showIcons, showClusterOption, clusterOptionLabel, customizeOptions } = _a, selectProps = __rest(_a, ["className", "showIcons", "showClusterOption", "clusterOptionLabel", "customizeOptions"]);
        return (<Select className={cssNames("NamespaceAllowStorageClassSelect", className)} menuClass="NamespaceAllowStorageClassSelect" formatOptionLabel={this.formatOptionLabel} options={this.options} {...selectProps}/>);
    }
};
NamespaceAllowStorageClassSelect.defaultProps = defaultProps;
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], NamespaceAllowStorageClassSelect.prototype, "options", null);
NamespaceAllowStorageClassSelect = __decorate([
    observer
], NamespaceAllowStorageClassSelect);
export { NamespaceAllowStorageClassSelect };
//# sourceMappingURL=namespace-allow-storageclass-select.jsx.map