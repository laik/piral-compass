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
import { action, autorun, computed, observable, reaction } from "mobx";
import { autobind, createStorage } from "./utils";
import { Notifications } from "./components/notifications";
let ThemeStore = class ThemeStore {
    constructor() {
        this.style = document.createElement("style");
        this.defaultTheme = {
            name: "kontena-light",
            type: "light",
            colors: {},
        };
        this.activeThemeId = this.defaultTheme.name; // theme's filename without extension
        this.activeThemeType = this.defaultTheme.type;
        this.themes = observable.map([], { deep: false });
        this.onChange = (theme) => {
            let cssText = "\n";
            Object.entries(theme.colors).forEach(([propName, color]) => {
                cssText += `--${propName}: ${color} !important;\n`;
            });
            this.style.textContent = `:root {${cssText}} `;
        };
        const storage = createStorage("theme", this.activeThemeId);
        this.activeThemeId = storage.get();
        // init
        this.style.id = "lens-theme";
        document.head.prepend(this.style);
        this.setTheme(this.activeThemeId);
        // save active theme-id in local storage
        reaction(() => this.activeThemeId, themeId => storage.set(themeId), {
            fireImmediately: true
        });
        // auto-apply colors to dom from active theme
        reaction(() => this.activeTheme, this.onChange);
        // apply theme from configuration
        import("./config.store").then(({ configStore }) => {
            autorun(() => {
                const themeId = configStore.config.lensTheme;
                if (themeId && themeId !== this.activeThemeId) {
                    this.setTheme(themeId);
                }
            });
        });
    }
    get activeTheme() {
        return this.themes.get(this.activeThemeId) || this.defaultTheme;
    }
    load(themeId, { showErrorNotification = true } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.themes.has(themeId)) {
                return this.themes.get(themeId);
            }
            try {
                const theme = yield import(
                /* webpackMode: "lazy", webpackChunkName: "theme/[request]" */
                `./themes/${themeId}.json`);
                this.themes.set(themeId, theme);
                return theme;
            }
            catch (err) {
                if (showErrorNotification)
                    Notifications.error(err.toString());
                throw err;
            }
        });
    }
    setTheme(themeId = this.defaultTheme.name, themeType = this.defaultTheme.type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.load(themeId);
                this.activeThemeId = themeId;
                this.activeThemeType = themeType;
            }
            catch (err) {
                if (themeId !== this.defaultTheme.name) {
                    this.setTheme(); // fallback to default theme
                }
            }
        });
    }
};
__decorate([
    observable,
    __metadata("design:type", Object)
], ThemeStore.prototype, "activeThemeId", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ThemeStore.prototype, "activeThemeType", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], ThemeStore.prototype, "themes", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ThemeStore.prototype, "activeTheme", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThemeStore.prototype, "setTheme", null);
ThemeStore = __decorate([
    autobind(),
    __metadata("design:paramtypes", [])
], ThemeStore);
export { ThemeStore };
export const themeStore = new ThemeStore();
//# sourceMappingURL=theme.store.js.map