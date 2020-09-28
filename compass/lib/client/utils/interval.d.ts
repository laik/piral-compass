declare type IntervalCallback = (count: number) => void;
export declare function interval(timeSec: number, callback: IntervalCallback, autoRun?: boolean): {
    start: (runImmediately?: boolean) => void;
    stop: () => void;
    restart: (runImmediately?: boolean) => void;
    readonly isRunning: boolean;
};
export {};
