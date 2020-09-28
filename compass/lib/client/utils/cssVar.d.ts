export declare function cssVar(elem: HTMLElement): {
    get(name: string): {
        toString: () => string;
        valueOf: () => number;
    };
    set(name: string, value: number | string): void;
};
