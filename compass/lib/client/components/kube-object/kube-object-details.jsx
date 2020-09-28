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
import "./kube-object-details.scss";
import React from "react";
import { disposeOnUnmount, observer } from "mobx-react";
import { computed, observable, reaction } from "mobx";
import { getDetails, hideDetails } from "../../navigation";
import { Drawer } from "../drawer";
import { Spinner } from "../spinner";
import { apiManager } from "../../api/api-manager";
import { crdStore } from "../+custom-resources/crd.store";
import { CrdResourceDetails, CrdResourceMenu } from "../+custom-resources";
let KubeObjectDetails = class KubeObjectDetails extends React.Component {
    constructor() {
        super(...arguments);
        this.isLoading = false;
        this.loader = reaction(() => [
            this.path,
            this.object,
            crdStore.items.length,
        ], () => __awaiter(this, void 0, void 0, function* () {
            this.loadingError = "";
            const { path, object } = this;
            if (!object) {
                const store = apiManager.getStore(path);
                if (store) {
                    this.isLoading = true;
                    try {
                        yield store.loadFromPath(path);
                    }
                    catch (err) {
                        this.loadingError = (`
                Resource loading has failed: <b>{err.toString()}</b>
              `);
                    }
                    finally {
                        this.isLoading = false;
                    }
                }
            }
        }));
    }
    get path() {
        return getDetails();
    }
    get object() {
        const store = apiManager.getStore(this.path);
        if (store) {
            return store.getByPath(this.path);
        }
    }
    get isCrdInstance() {
        return !!crdStore.getByObject(this.object);
    }
    render() {
        const { object, isLoading, loadingError, isCrdInstance } = this;
        let isCrdInstanceLocal = isCrdInstance;
        const isOpen = !!(object || isLoading || loadingError);
        let title = "";
        let apiComponents;
        if (object) {
            const { kind, getName, selfLink } = object;
            title = `${kind}: ${getName()}`;
            apiComponents = apiManager.getViews(selfLink);
            //  ingore nuwa/fuxi/tekton use crd details
            if (kind == "StatefulSet" ||
                kind == "Stone" ||
                kind == "Injector" ||
                kind == "Water" ||
                kind == "Workloads" ||
                kind == "Field" ||
                kind == "Form" ||
                kind == "Page" ||
                kind == "Pipeline" ||
                kind == "PipelineRun" ||
                kind == "PipelineResource" ||
                kind == "Task" ||
                kind == "TaskRun" ||
                kind == "BaseUser" ||
                kind == "BaseRole" ||
                kind == "BaseDepartment" ||
                kind == "BaseRoleUser" ||
                kind == "TektonStore" ||
                kind == "TektonWebHook") {
                isCrdInstanceLocal = false;
            }
            if (isCrdInstanceLocal) {
                apiComponents.Details = CrdResourceDetails;
                apiComponents.Menu = CrdResourceMenu;
            }
        }
        return (<Drawer className="KubeObjectDetails flex column" open={isOpen} title={title} toolbar={apiComponents &&
            apiComponents.Menu && <apiComponents.Menu object={object} toolbar/>} onClose={hideDetails}>
        {isLoading && <Spinner center/>}
        {loadingError && <div className="box center">{loadingError}</div>}
        {apiComponents && apiComponents.Details && (<apiComponents.Details object={object}/>)}
      </Drawer>);
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], KubeObjectDetails.prototype, "isLoading", void 0);
__decorate([
    observable.ref,
    __metadata("design:type", Object)
], KubeObjectDetails.prototype, "loadingError", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], KubeObjectDetails.prototype, "path", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], KubeObjectDetails.prototype, "object", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], KubeObjectDetails.prototype, "isCrdInstance", null);
__decorate([
    disposeOnUnmount,
    __metadata("design:type", Object)
], KubeObjectDetails.prototype, "loader", void 0);
KubeObjectDetails = __decorate([
    observer
], KubeObjectDetails);
export { KubeObjectDetails };
//# sourceMappingURL=kube-object-details.jsx.map