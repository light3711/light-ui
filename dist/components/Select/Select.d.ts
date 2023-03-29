import { CSSProperties, ReactNode } from "react";
import { styleType } from "../../utils/type";
import { InputProps } from "../Input/Input";
import { InputTagProps } from "../InputTag/InpuTag";
interface SelectProps extends styleType, InputTagProps, Omit<InputProps, 'prefix' | 'addBefore' | 'addAfter' | 'value'> {
    /**
     * @option选项
     */
    option?: any[];
    /**
     * @children 自定义option
     */
    children?: ReactNode[] | any;
    /**
     * @mode inputTag模式
     */
    mode?: boolean;
    defaultValue?: string;
    /**
     * @allowCreate 允许创建
     */
    allowCreate?: boolean;
    /**
     * @listStyle 自定义展开菜单样式
     */
    listStyle?: CSSProperties;
    /**
     *
     * @onClose tag关闭回调
     */
    onClose?: (value: string) => void;
    allowChange?: boolean;
}
/**
 * 选择器
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from "@light3711/lightui"
 * ~~~
 */
export declare const Select: (props: SelectProps) => JSX.Element;
interface OptionProps extends styleType, Pick<InputProps, 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
    disabled?: boolean;
    children?: any;
    keys?: number;
}
export declare const Option: (props: OptionProps) => JSX.Element;
export {};
