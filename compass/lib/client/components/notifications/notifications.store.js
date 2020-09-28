var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { action, observable } from "mobx";
import { autobind } from "../../utils";
import isObject from "lodash/isObject";
import uniqueId from "lodash/uniqueId";
let NotificationsStore = class NotificationsStore {
    constructor() {
        this.notifications = observable([], { deep: false });
        this.autoHideTimers = new Map();
    }
    addAutoHideTimer(notification) {
        this.removeAutoHideTimer(notification);
        const { id, timeout } = notification;
        if (timeout) {
            const timer = window.setTimeout(() => this.remove(id), timeout);
            this.autoHideTimers.set(id, timer);
        }
    }
    removeAutoHideTimer(notification) {
        const { id } = notification;
        if (this.autoHideTimers.has(id)) {
            clearTimeout(this.autoHideTimers.get(id));
            this.autoHideTimers.delete(id);
        }
    }
    add(notification) {
        if (!notification.id) {
            notification.id = uniqueId("notification_");
        }
        const index = this.notifications.findIndex(item => item.id === notification.id);
        if (index > -1)
            this.notifications.splice(index, 1, notification);
        else
            this.notifications.push(notification);
        this.addAutoHideTimer(notification);
    }
    remove(itemOrId) {
        if (!isObject(itemOrId)) {
            itemOrId = this.notifications.find(item => item.id === itemOrId);
        }
        return this.notifications.remove(itemOrId);
    }
};
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsStore.prototype, "add", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsStore.prototype, "remove", null);
NotificationsStore = __decorate([
    autobind()
], NotificationsStore);
export { NotificationsStore };
export const notificationsStore = new NotificationsStore();
//# sourceMappingURL=notifications.store.js.map