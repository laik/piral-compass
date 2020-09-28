import { IStorageHelperOptions } from "../utils";
export declare function useStorage<T>(key: string, initialValue?: T, options?: IStorageHelperOptions): [T, (value: T) => void];
