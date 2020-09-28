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
import "./edit-resource.scss";
import React from "react";
import { autorun, observable } from "mobx";
import { disposeOnUnmount, observer } from "mobx-react";
import jsYaml from "js-yaml";
import { cssNames } from "../../utils";
import { editResourceStore } from "./edit-resource.store";
import { InfoPanel } from "./info-panel";
import { Badge } from "../badge";
import { EditorPanel } from "./editor-panel";
import { Spinner } from "../spinner";
import { apiManager } from "../../api/api-manager";
let EditResource = class EditResource extends React.Component {
    constructor() {
        super(...arguments);
        this.error = "";
        this.autoDumpResourceOnInit = autorun(() => {
            if (!this.tabData)
                return;
            if (this.tabData.draft === undefined && this.resource) {
                this.saveDraft(this.resource);
            }
        });
        this.onChange = (draft, error) => {
            this.error = error;
            this.saveDraft(draft);
        };
        this.save = () => __awaiter(this, void 0, void 0, function* () {
            if (this.error) {
                return;
            }
            const { resource, draft } = this.tabData;
            const store = apiManager.getStore(resource);
            const updatedResource = yield store.update(this.resource, jsYaml.safeLoad(draft));
            this.saveDraft(updatedResource); // update with new resourceVersion to avoid further errors on save
            const resourceType = updatedResource.kind;
            const resourceName = updatedResource.getName();
            return (<p>
        `{resourceType} <b>{resourceName}</b> updated.`
      </p>);
        });
    }
    get tabId() {
        return this.props.tab.id;
    }
    get tabData() {
        return editResourceStore.getData(this.tabId);
    }
    get resource() {
        const { resource } = this.tabData;
        const store = apiManager.getStore(resource);
        if (store) {
            return store.getByPath(resource);
        }
    }
    saveDraft(draft) {
        if (typeof draft === "object") {
            draft = draft ? jsYaml.dump(draft) : undefined;
        }
        editResourceStore.setData(this.tabId, Object.assign(Object.assign({}, this.tabData), { draft: draft }));
    }
    render() {
        const { tabId, resource, tabData, error, onChange, save } = this;
        const { draft } = tabData;
        if (!resource || draft === undefined) {
            return <Spinner center/>;
        }
        const { kind, getNs, getName } = resource;
        return (<div className={cssNames("EditResource flex column", this.props.className)}>
        <EditorPanel tabId={tabId} value={draft} onChange={onChange}/>
        <InfoPanel tabId={tabId} error={error} submit={save} submitLabel={`Save`} submittingMessage={`Applying..`} controls={(<div className="resource-info flex gaps align-center">
              <span>`Kind`:</span> <Badge label={kind}/>
              <span>`Name`:</span><Badge label={getName()}/>
              <span>`Namespace`:</span> <Badge label={getNs() || "global"}/>
            </div>)}/>
      </div>);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], EditResource.prototype, "error", void 0);
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], EditResource.prototype, "autoDumpResourceOnInit", void 0);
EditResource = __decorate([
    observer
], EditResource);
export { EditResource };
//# sourceMappingURL=edit-resource.jsx.map