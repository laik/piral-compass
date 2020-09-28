export interface IStorageHelperOptions {
    addKeyPrefix?: boolean;
    useSession?: boolean;
}
export declare function createStorage<T>(key: string, defaultValue?: T, options?: IStorageHelperOptions): StorageHelper<T>;
export declare class StorageHelper<T> {
    protected key: string;
    protected defaultValue?: T;
    protected options?: IStorageHelperOptions;
    static keyPrefix: string;
    static defaultOptions: IStorageHelperOptions;
    constructor(key: string, defaultValue?: T, options?: IStorageHelperOptions);
    protected get storage(): Storage;
    get(): T;
    set(value: T): this;
    merge(value: Partial<T>): this;
    clear(): this;
    getDefaultValue(): T;
    restoreDefaultValue(): this;
}
