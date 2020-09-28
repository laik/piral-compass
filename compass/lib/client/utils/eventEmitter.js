// Custom event emitter
export class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    addListener(callback, options = {}) {
        if (options.prepend) {
            const listeners = [...this.listeners];
            listeners.unshift([callback, options]);
            this.listeners = new Map(listeners);
        }
        else {
            this.listeners.set(callback, options);
        }
    }
    removeListener(callback) {
        this.listeners.delete(callback);
    }
    removeAllListeners() {
        this.listeners.clear();
    }
    emit(...data) {
        [...this.listeners].every(([callback, options]) => {
            if (options.once)
                this.removeListener(callback);
            const result = callback(...data);
            if (result === false)
                return; // break cycle
            return true;
        });
    }
}
//# sourceMappingURL=eventEmitter.js.map