import { FC } from "react";
import Checkbox, { CheckboxProps } from "./Checkbox";
import Group, { CheckboxGroupProps } from "./Group";

export type CheckboxComponent = FC<CheckboxProps> & {
    Group:FC<CheckboxGroupProps<string>>
}

const TransCheckbox = Checkbox as CheckboxComponent

TransCheckbox.Group = Group

export default TransCheckbox

