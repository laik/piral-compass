// Base class for all kubernetes objects
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
var KubeObject_1;
import moment from "moment";
import { autobind, formatDuration } from "../utils";
import { apiKube } from "./index";
import { resourceApplierApi } from "./endpoints/resource-applier.api";
let KubeObject = KubeObject_1 = class KubeObject {
    constructor(data) {
        Object.assign(this, data);
        // this.metadata.ownerReferences = [];
    }
    static create(data) {
        return new KubeObject_1(data);
    }
    static isNonSystem(item) {
        return !item.metadata.name.startsWith("system:");
    }
    static isJsonApiData(object) {
        return !object.items && object.metadata;
    }
    static isJsonApiDataList(object) {
        return object.items && object.metadata;
    }
    static stringifyLabels(labels) {
        if (!labels)
            return [];
        return Object.entries(labels).map(([name, value]) => `${name}=${value}`);
    }
    static mapperLablesOrAnnotations(data) {
        let result = new Map();
        if (data.length == 0)
            return result;
        data.map((item) => {
            const slice = item.split("=");
            result.set(slice[0], slice[1]);
        });
        return result;
    }
    get selfLink() {
        return this.metadata.selfLink;
    }
    getId() {
        return this.metadata.uid;
    }
    getResourceVersion() {
        return this.metadata.resourceVersion;
    }
    getName() {
        return this.metadata.name;
    }
    getNs() {
        return this.metadata.namespace || undefined;
    }
    getCreationTime() {
        return this.metadata.creationTimestamp;
    }
    // todo: refactor with named arguments
    getAge(humanize = true, compact = true, fromNow = false) {
        if (fromNow) {
            return moment(this.metadata.creationTimestamp).fromNow();
        }
        const diff = new Date().getTime() -
            new Date(this.metadata.creationTimestamp).getTime();
        if (humanize) {
            return formatDuration(diff, compact);
        }
        return diff;
    }
    getFinalizers() {
        return this.metadata.finalizers || [];
    }
    getLabels() {
        return KubeObject_1.stringifyLabels(this.metadata.labels);
    }
    copyLabels() {
        return Object.fromEntries(KubeObject_1.mapperLablesOrAnnotations(this.getLabels()));
    }
    copyAnnotations() {
        return Object.fromEntries(KubeObject_1.mapperLablesOrAnnotations(this.getAnnotations()));
    }
    addLabel(key, value) {
        this.metadata.labels = Object.fromEntries(KubeObject_1.mapperLablesOrAnnotations(this.getLabels()).set(key, value));
    }
    removeLable(key) {
        let result = KubeObject_1.mapperLablesOrAnnotations(this.getLabels());
        result.delete(key);
        this.metadata.labels = Object.fromEntries(result);
    }
    getValueFromLabels(key) {
        return (KubeObject_1.mapperLablesOrAnnotations(this.getLabels()).get(key) || "");
    }
    getAnnotations() {
        const labels = KubeObject_1.stringifyLabels(this.metadata.annotations);
        return labels.filter((label) => {
            const skip = resourceApplierApi.annotations.some((key) => label.startsWith(key));
            return !skip;
        });
    }
    addOwnerReferences(ownerReferences) {
        if (ownerReferences !== undefined) {
            Object.assign((this.metadata.ownerReferences = []), ownerReferences);
        }
    }
    addAnnotation(key, value) {
        this.metadata.annotations = Object.fromEntries(KubeObject_1.mapperLablesOrAnnotations(this.getLabels()).set(key, value));
    }
    removeAnnotation(key) {
        let result = KubeObject_1.mapperLablesOrAnnotations(this.getAnnotations());
        result.delete(key);
        this.metadata.annotations = Object.fromEntries(result);
    }
    getValueFromAnnotations(key) {
        return (KubeObject_1.mapperLablesOrAnnotations(this.getAnnotations()).get(key) || "");
    }
    getSearchFields() {
        const { getName, getId, getNs, getAnnotations, getLabels } = this;
        return [getName(), getNs(), getId(), ...getLabels(), ...getAnnotations()];
    }
    toPlainObject() {
        return JSON.parse(JSON.stringify(this));
    }
    // use unified resource-applier api for updating all k8s objects
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return resourceApplierApi.update(Object.assign(Object.assign({}, this.toPlainObject()), data));
        });
    }
    delete() {
        return apiKube.del(this.selfLink);
    }
};
KubeObject = KubeObject_1 = __decorate([
    autobind(),
    __metadata("design:paramtypes", [Object])
], KubeObject);
export { KubeObject };
//# sourceMappingURL=kube-object.js.map