/// <reference types="react" />
import { IconProps } from "../icon";
import { FilterType } from "./page-filters.store";
interface Props extends Partial<IconProps> {
    type: FilterType;
}
export declare function FilterIcon(props: Props): JSX.Element;
export {};
