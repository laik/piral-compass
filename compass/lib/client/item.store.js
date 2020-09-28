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
import orderBy from "lodash/orderBy";
import { autobind, noop } from "./utils";
import { action, computed, observable, when } from "mobx";
let ItemStore = class ItemStore {
    constructor() {
        this.defaultSorting = (item) => item.getCreationTime();
        this.isLoading = false;
        this.isLoaded = false;
        this.items = observable.array([], { deep: false });
        this.selectedItemsIds = observable.map();
    }
    get selectedItems() {
        return this.items.filter((item) => this.selectedItemsIds.get(item.getId()));
    }
    getByName(name) {
        return this.items.find((item) => item.getName() === name);
    }
    sortItems(items = this.items, sorting, order) {
        return orderBy(items, sorting || this.defaultSorting, order = "desc");
    }
    createItem(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield request();
            const item = this.items.find((item) => item.getId() === newItem.getId());
            if (item) {
                return item;
            }
            else {
                const items = this.sortItems([...this.items, newItem]);
                this.items.replace(items);
                return newItem;
            }
        });
    }
    loadItems(request, sortItems = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLoading) {
                yield when(() => !this.isLoading);
                return;
            }
            this.isLoading = true;
            try {
                let items = yield request();
                if (sortItems)
                    items = this.sortItems(items);
                this.items.replace(items);
                this.isLoaded = true;
            }
            finally {
                this.isLoading = false;
            }
        });
    }
    loadItem(request, sortItems = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield request().catch(() => null);
            if (item) {
                const existingItem = this.items.find((el) => el.getId() === item.getId());
                if (existingItem) {
                    const index = this.items.findIndex((item) => item === existingItem);
                    this.items.splice(index, 1, item);
                }
                else {
                    let items = [...this.items, item];
                    if (sortItems)
                        items = this.sortItems(items);
                    this.items.replace(items);
                }
                return item;
            }
        });
    }
    updateItem(item, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedItem = yield request();
            const index = this.items.findIndex((i) => i.getId() === item.getId());
            this.items.splice(index, 1, updatedItem);
            return updatedItem;
        });
    }
    removeItem(item, request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield request();
            this.items.remove(item);
            this.selectedItemsIds.delete(item.getId());
        });
    }
    isSelected(item) {
        return !!this.selectedItemsIds.get(item.getId());
    }
    select(item) {
        this.selectedItemsIds.set(item.getId(), true);
    }
    unselect(item) {
        this.selectedItemsIds.delete(item.getId());
    }
    toggleSelection(item) {
        if (this.isSelected(item)) {
            this.unselect(item);
        }
        else {
            this.select(item);
        }
    }
    toggleSelectionAll(visibleItems = this.items) {
        const allSelected = visibleItems.every(this.isSelected);
        if (allSelected) {
            visibleItems.forEach(this.unselect);
        }
        else {
            visibleItems.forEach(this.select);
        }
    }
    isSelectedAll(visibleItems = this.items) {
        if (!visibleItems.length)
            return false;
        return visibleItems.every(this.isSelected);
    }
    resetSelection() {
        this.selectedItemsIds.clear();
    }
    reset() {
        this.resetSelection();
        this.items.clear();
        this.selectedItemsIds.clear();
        this.isLoaded = false;
        this.isLoading = false;
    }
    subscribe(...args) {
        return noop;
    }
    *[Symbol.iterator]() {
        yield* this.items;
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemStore.prototype, "isLoading", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemStore.prototype, "isLoaded", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemStore.prototype, "items", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ItemStore.prototype, "selectedItemsIds", void 0);
__decorate([
    computed,
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], ItemStore.prototype, "selectedItems", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Array, String]),
    __metadata("design:returntype", Array)
], ItemStore.prototype, "sortItems", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", Promise)
], ItemStore.prototype, "createItem", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], ItemStore.prototype, "loadItems", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", Promise)
], ItemStore.prototype, "loadItem", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], ItemStore.prototype, "updateItem", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], ItemStore.prototype, "removeItem", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "select", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "unselect", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "toggleSelection", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "toggleSelectionAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "resetSelection", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemStore.prototype, "reset", null);
ItemStore = __decorate([
    autobind()
], ItemStore);
export { ItemStore };
//# sourceMappingURL=item.store.js.map