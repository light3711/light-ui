import React, { CSSProperties, ReactNode, ReactText } from "react";
export interface CheckboxGroupProps<T extends React.ReactText> {
    style?: CSSProperties;
    className?: string | string[];
    children?: any;
    disabled?: boolean;
    /**
     * @direction 方向
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @defaultValue 默认选中的选项
     */
    defaultValue?: T[];
    /**
     * @options 可选项
     */
    options?: (T | {
        label: ReactNode;
        value: T;
        disabled?: boolean;
    })[];
    /**
     * @value 受控模式
     */
    value?: T[];
    /**
     * @onChange 回调函数
     */
    onChange?: (value: T[], e: Event) => void;
}
export declare const CheckboxGroupContext: React.Context<{
    disabled?: boolean;
    isCheckboxGroup: boolean;
    onGroupChange: (_optionValue: any, _checked: boolean, e: Event) => void;
    checkboxGroupValue: ReactText[];
    registerValue?: (value: ReactText) => void;
    unRegisterValue?: (value: ReactText) => void;
}>;
declare const Group: {
    <T extends React.ReactText>(props: CheckboxGroupProps<T>): JSX.Element;
    displayName: string;
};
export default Group;
