// Helper for getting/setting css-variables
export function cssVar(elem) {
    return {
        get(name) {
            const value = window.getComputedStyle(elem).getPropertyValue(name).trim();
            return {
                toString: () => value,
                valueOf: () => parseFloat(value)
            };
        },
        set(name, value) {
            if (typeof value === "number")
                value = value + "px";
            elem.style.setProperty(name, value);
        }
    };
}
//# sourceMappingURL=cssVar.js.map