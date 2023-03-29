import React, { CSSProperties, ReactNode, ReactText } from "react";
import Group from "./Group";
export interface CheckboxProps<T extends React.ReactText = any> extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'onChange'> {
    style?: CSSProperties;
    className?: string | string[];
    /**
     *   是否禁用
     */
    disabled?: boolean;
    /**
     *   是否选中
     */
    checked?: boolean;
    /**
     *  默认是否选中
     */
    defaultChecked?: boolean;
    /**
     *  半选状态
     */
    indeterminate?: boolean;
    /**
     *   点击复选框的回调
     */
    onChange?: (checked: boolean, e: Event) => void;
    /**
     * 复选框的 value 属性
     */
    value?: T;
    checkboxGroupValue?: T[];
    onGroupChange?: (value: T, checked: boolean) => void;
    isCheckboxGroup?: boolean;
    children?: ReactNode | ((value: {
        checked: boolean;
        indeterminate: boolean;
    }) => ReactNode);
}
export declare function useMergeValue<T>(defaultStateValue: T, props: any): any[];
export interface CheckboxGroupContext {
    disabled?: boolean;
    isCheckboxGroup: boolean;
    onGroupChange: (_optionValue: any, _checked: boolean, e: Event) => void;
    checkboxGroupValue: ReactText[];
    registerValue: (value: ReactText) => void;
    unRegisterValue: (value: ReactText) => void;
}
interface ForwardRefCheckboxType extends React.ForwardRefExoticComponent<React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<unknown>> {
    <T extends React.ReactText = any>(props: React.PropsWithChildren<CheckboxProps<T>> & {
        ref?: React.Ref<unknown>;
    }): React.ReactElement;
    Group: typeof Group;
}
declare const CheckboxComponent: ForwardRefCheckboxType;
export default CheckboxComponent;
