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
import "./create-resource.scss";
import React from "react";
import jsYaml from "js-yaml";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { cssNames } from "../../utils";
import { createResourceStore } from "./create-resource.store";
import { EditorPanel } from "./editor-panel";
import { InfoPanel } from "./info-panel";
import { resourceApplierApi } from "../../api/endpoints/resource-applier.api";
import { Notifications } from "../notifications";
let CreateResource = class CreateResource extends React.Component {
    constructor() {
        super(...arguments);
        this.error = "";
        this.onChange = (value, error) => {
            createResourceStore.setData(this.tabId, value);
            this.error = error;
        };
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            if (this.error)
                return;
            const resources = jsYaml.safeLoadAll(this.data)
                .filter(v => !!v); // skip empty documents if "---" pasted at the beginning or end
            const createdResources = [];
            const errors = [];
            yield Promise.all(resources.map(data => {
                return resourceApplierApi.update(data)
                    .then(item => createdResources.push(item.getName()))
                    .catch((err) => errors.push(err.toString()));
            }));
            if (errors.length) {
                errors.forEach(Notifications.error);
                if (!createdResources.length)
                    throw errors[0];
            }
            return (<p>
                `<b>{createdResources.join(", ")}</b> successfully created`
            </p>);
        });
    }
    get tabId() {
        return this.props.tab.id;
    }
    get data() {
        return createResourceStore.getData(this.tabId);
    }
    render() {
        const { tabId, data, error, create, onChange } = this;
        const { className } = this.props;
        return (<div className={cssNames("CreateResource flex column", className)}>
                <EditorPanel tabId={tabId} value={data} onChange={onChange}/>
                <InfoPanel tabId={tabId} error={error} submit={create} submitLabel={`Create`} showNotifications={false}/>
            </div>);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], CreateResource.prototype, "error", void 0);
CreateResource = __decorate([
    observer
], CreateResource);
export { CreateResource };
//# sourceMappingURL=create-resource.jsx.map