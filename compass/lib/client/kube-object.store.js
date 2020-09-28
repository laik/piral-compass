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
import { action, observable, reaction } from "mobx";
import { autobind } from "./utils";
import { kubeWatchApi } from "./api/kube-watch-api";
import { ItemStore } from "./item.store";
import { configStore } from "./config.store";
import { apiManager } from "./api/api-manager";
import { KubeApi } from "./api/kube-api";
import store from 'store';
let KubeObjectStore = class KubeObjectStore extends ItemStore {
    constructor() {
        super();
        // collect items from watch-api events to avoid UI blowing up with huge streams of data
        this.eventsBuffer = observable([], { deep: false });
        this.bindWatchEventsUpdater();
        kubeWatchApi.addListener(this, this.onWatchApiEvent);
    }
    getAllByNs(namespace, strict = false) {
        const namespaces = [].concat(namespace);
        if (namespaces.length) {
            return this.items.filter(item => namespaces.includes(item.getNs()));
        }
        else if (!strict) {
            return this.items;
        }
    }
    getByName(name, namespace) {
        return this.items.find(item => {
            return item.getName() === name && (namespace ? item.getNs() === namespace : true);
        });
    }
    getByPath(path) {
        return this.items.find(item => item.selfLink === path);
    }
    getByLabel(labels) {
        if (Array.isArray(labels)) {
            return this.items.filter((item) => {
                const itemLabels = item.getLabels();
                return labels.every(label => itemLabels.includes(label));
            });
        }
        else {
            return this.items.filter((item) => {
                const itemLabels = item.metadata.labels || {};
                return Object.entries(labels)
                    .every(([key, value]) => itemLabels[key] === value);
            });
        }
    }
    loadItems(namespaces) {
        return __awaiter(this, void 0, void 0, function* () {
            let isClusterAdmin = false;
            const userConfig = store.get('u_config');
            if (userConfig) {
                isClusterAdmin = userConfig.isClusterAdmin;
            }
            if (isClusterAdmin != true && !this.api.isNamespaced) {
                return [];
            }
            if (!namespaces || namespaces.length === 0) {
                const { limit } = this;
                const query = limit ? { limit } : {};
                return this.api.list({}, query);
            }
            else {
                return Promise
                    .all(namespaces.map(namespace => this.api.list({ namespace })))
                    .then(items => items.flat());
            }
        });
    }
    filterItemsOnLoad(items) {
        return items;
    }
    loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isLoading = true;
            let items;
            try {
                const { isClusterAdmin, allowedNamespaces } = configStore;
                items = yield this.loadItems(!isClusterAdmin ? allowedNamespaces : null);
                items = this.filterItemsOnLoad(items);
            }
            finally {
                if (items) {
                    items = this.sortItems(items);
                    this.items.replace(items);
                }
                this.isLoading = false;
                this.isLoaded = true;
            }
        });
    }
    loadItem(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.get(params);
        });
    }
    load(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, namespace } = params;
            let item = this.getByName(name, namespace);
            if (!item) {
                item = yield this.loadItem(params);
                const newItems = this.sortItems([...this.items, item]);
                this.items.replace(newItems);
            }
            return item;
        });
    }
    loadFromPath(resourcePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { namespace, name } = KubeApi.parseApi(resourcePath);
            return this.load({ name, namespace });
        });
    }
    createItem(params, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.create(params, data);
        });
    }
    create(params, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield this.createItem(params, data);
            // if the item already in store ignore replace
            if (this.items.findIndex(item => item.getId() === newItem.getId()) > 0) {
                return newItem;
            }
            const items = this.sortItems([...this.items, newItem]);
            this.items.replace(items);
            return newItem;
        });
    }
    apply(item, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.items.findIndex(item => { item.getName() == item.getName() && item.getNs() == item.getNs(); }) > 0) {
                return this.update(item, data);
            }
            return this.create({ name: item.getName(), namespace: item.getNs() }, data);
        });
    }
    update(item, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield item.update(data);
            const index = this.items.findIndex(item => item.getId() === newItem.getId());
            this.items.splice(index, 1, newItem);
            return newItem;
        });
    }
    remove(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield item.delete();
            this.items.remove(item);
            this.selectedItemsIds.delete(item.getId());
        });
    }
    removeSelectedItems() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.selectedItems.map(this.remove));
        });
    }
    bindWatchEventsUpdater(delay = 1000) {
        return reaction(() => this.eventsBuffer.toJS()[0], this.updateFromEventsBuffer, {
            delay: delay
        });
    }
    subscribe(apis = [this.api]) {
        apis = apis.filter(api => !configStore.isClusterAdmin ? api.isNamespaced : true);
        return KubeApi.watchAll(...apis);
    }
    onWatchApiEvent(evt) {
        if (!this.isLoaded)
            return;
        this.eventsBuffer.push(evt);
    }
    updateFromEventsBuffer() {
        if (!this.eventsBuffer.length) {
            return;
        }
        // create latest non-observable copy of items to apply updates in one action (==single render)
        let items = this.items.toJS();
        this.eventsBuffer.clear().forEach(({ type, object }) => {
            const { uid, selfLink } = object.metadata;
            const index = items.findIndex(item => item.getId() === uid);
            const item = items[index];
            const api = apiManager.getApi(selfLink);
            switch (type) {
                case "ADDED":
                case "MODIFIED":
                    const newItem = new api.objectConstructor(object);
                    if (!item) {
                        items.push(newItem);
                    }
                    else {
                        items.splice(index, 1, newItem);
                    }
                    break;
                case "DELETED":
                    if (item) {
                        items.splice(index, 1);
                    }
                    break;
            }
        });
        // slice to max allowed items
        if (this.limit && items.length > this.limit) {
            items = items.slice(-this.limit);
        }
        // update items
        this.items.replace(this.sortItems(items));
    }
};
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KubeObjectStore.prototype, "loadAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KubeObjectStore.prototype, "load", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KubeObjectStore.prototype, "loadFromPath", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KubeObjectStore.prototype, "updateFromEventsBuffer", null);
KubeObjectStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], KubeObjectStore);
export { KubeObjectStore };
//# sourceMappingURL=kube-object.store.js.map