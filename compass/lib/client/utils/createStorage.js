// Helper to work with browser's local/session storage api
export function createStorage(key, defaultValue, options) {
    return new StorageHelper(key, defaultValue, options);
}
export class StorageHelper {
    constructor(key, defaultValue, options) {
        this.key = key;
        this.defaultValue = defaultValue;
        this.options = options;
        this.options = Object.assign({}, StorageHelper.defaultOptions, options);
        if (this.options.addKeyPrefix) {
            this.key = StorageHelper.keyPrefix + key;
        }
    }
    get storage() {
        if (this.options.useSession)
            return window.sessionStorage;
        return window.localStorage;
    }
    get() {
        const strValue = this.storage.getItem(this.key);
        if (strValue != null) {
            try {
                return JSON.parse(strValue);
            }
            catch (e) {
                console.error(`Parsing json failed for pair: ${this.key}=${strValue}`);
            }
        }
        return this.defaultValue;
    }
    set(value) {
        this.storage.setItem(this.key, JSON.stringify(value));
        return this;
    }
    merge(value) {
        const currentValue = this.get();
        return this.set(Object.assign(currentValue, value));
    }
    clear() {
        this.storage.removeItem(this.key);
        return this;
    }
    getDefaultValue() {
        return this.defaultValue;
    }
    restoreDefaultValue() {
        return this.set(this.defaultValue);
    }
}
StorageHelper.keyPrefix = "lens_";
StorageHelper.defaultOptions = {
    addKeyPrefix: true,
    useSession: false,
};
//# sourceMappingURL=createStorage.js.map