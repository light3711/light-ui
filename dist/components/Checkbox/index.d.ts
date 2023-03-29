import { FC } from "react";
import { CheckboxProps } from "./Checkbox";
import { CheckboxGroupProps } from "./Group";
export declare type CheckboxComponent = FC<CheckboxProps> & {
    Group: FC<CheckboxGroupProps<string>>;
};
declare const TransCheckbox: CheckboxComponent;
export default TransCheckbox;
