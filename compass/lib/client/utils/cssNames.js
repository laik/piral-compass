// Helper for combining css classes inside components
export function cssNames(...args) {
    const map = {};
    args.forEach(className => {
        if (typeof className === "string" || Array.isArray(className)) {
            [].concat(className).forEach(name => map[name] = true);
        }
        else {
            Object.assign(map, className);
        }
    });
    return Object.entries(map)
        .filter(([className, isActive]) => !!isActive)
        .map(([className]) => className.trim())
        .join(' ');
}
//# sourceMappingURL=cssNames.js.map