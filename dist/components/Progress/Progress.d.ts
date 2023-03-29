import React from "react";
import { styleType } from "../../utils/type";
import { ThemeProps } from "../Icon/Icon";
export interface ProgressProps extends styleType {
    percent: number;
    showText: boolean;
    theme?: ThemeProps;
}
export declare const Progress: React.FC<ProgressProps>;
