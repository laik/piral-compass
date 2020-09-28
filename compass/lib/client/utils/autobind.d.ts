declare type Constructor<T = {}> = new (...args: any[]) => T;
export declare function autobind(): (target: Constructor | object, prop?: string, descriptor?: PropertyDescriptor) => any;
export {};
