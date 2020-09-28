import React, { ReactNode } from "react";
import { TooltipProps } from "./tooltip";
export interface TooltipDecoratorProps {
    tooltip?: ReactNode | Omit<TooltipProps, "htmlFor">;
}
export declare function withTooltip<T extends React.ComponentType<any>>(Target: T): T;
