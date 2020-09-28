// Allow to cancel request for window.fetch()
export function cancelableFetch(reqInfo, reqInit = {}) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const cancel = abortController.abort.bind(abortController);
    const wrapResult = function (result) {
        if (result instanceof Promise) {
            const promise = result;
            promise.then = function (onfulfilled, onrejected) {
                const data = Object.getPrototypeOf(this).then.call(this, onfulfilled, onrejected);
                return wrapResult(data);
            };
            promise.cancel = cancel;
        }
        return result;
    };
    const req = fetch(reqInfo, Object.assign(Object.assign({}, reqInit), { signal }));
    return wrapResult(req);
}
//# sourceMappingURL=cancelableFetch.js.map