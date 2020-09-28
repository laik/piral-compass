export interface CancelablePromise<T> extends Promise<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): CancelablePromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): CancelablePromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): CancelablePromise<T>;
    cancel(): void;
}
export declare function cancelableFetch(reqInfo: RequestInfo, reqInit?: RequestInit): CancelablePromise<Response>;
