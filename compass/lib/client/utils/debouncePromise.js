// Debouncing promise evaluation
export const debouncePromise = function (promisedFunc, timeout = 0) {
    let timer;
    return (...params) => new Promise((resolve, reject) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => resolve(promisedFunc.apply(this, params)), timeout);
    });
};
//# sourceMappingURL=debouncePromise.js.map