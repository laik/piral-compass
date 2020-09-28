export function autobind() {
    return function (target, prop, descriptor) {
        if (target instanceof Function)
            return bindClass(target);
        else
            return bindMethod(target, prop, descriptor);
    };
}
function bindClass(constructor) {
    const proto = constructor.prototype;
    const descriptors = Object.getOwnPropertyDescriptors(proto);
    const skipMethod = (methodName) => {
        return methodName === "constructor"
            || typeof descriptors[methodName].value !== "function";
    };
    Object.keys(descriptors).forEach(prop => {
        if (skipMethod(prop))
            return;
        const boundDescriptor = bindMethod(proto, prop, descriptors[prop]);
        Object.defineProperty(proto, prop, boundDescriptor);
    });
}
function bindMethod(target, prop, descriptor) {
    if (!descriptor || typeof descriptor.value !== "function") {
        throw new Error(`@autobind() must be used on class or method only`);
    }
    const { value: func, enumerable, configurable } = descriptor;
    const boundFunc = new WeakMap();
    return Object.defineProperty(target, prop, {
        enumerable,
        configurable,
        get() {
            if (this === target)
                return func; // direct access from prototype
            if (!boundFunc.has(this))
                boundFunc.set(this, func.bind(this));
            return boundFunc.get(this);
        }
    });
}
//# sourceMappingURL=autobind.js.map