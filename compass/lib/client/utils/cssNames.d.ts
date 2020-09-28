export declare type IClassName = string | string[] | IClassNameMap;
export declare type IClassNameMap = {
    [className: string]: boolean | any;
};
export declare function cssNames(...args: IClassName[]): string;
