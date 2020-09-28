interface Options {
    once?: boolean;
    prepend?: boolean;
}
declare type Callback<D extends [...any[]]> = (...data: D) => void | boolean;
export declare class EventEmitter<D extends [...any[]]> {
    protected listeners: Map<Callback<D>, Options>;
    addListener(callback: Callback<D>, options?: Options): void;
    removeListener(callback: Callback<D>): void;
    removeAllListeners(): void;
    emit(...data: D): void;
}
export {};
