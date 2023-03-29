import { InputHTMLAttributes, FC, ReactNode } from "react";
import { styleType } from "../../utils/type";
declare type inputSize = 'lg' | 'sm';
declare type inputType = 'password' | 'text';
export interface InputProps extends styleType, Omit<InputHTMLAttributes<HTMLElement>, 'onKeyDown' | 'onFocus' | 'size' | 'maxLength' | 'onChange' | 'onBlur'> {
    /**
     * @value 受控值
     */
    value?: string | string[] | number;
    /**
     * @size 尺寸
     */
    /**
     * @type
     */
    type?: inputType;
    size?: inputSize;
    /**
     * @icon 图标
     */
    icon?: any;
    /**
     * @onChange 回调事件
     */
    onChange?: (value: string | string[] | number, e?: Element, focus?: boolean) => void;
    /**
     * @iconClick 图标回调
     */
    iconClick?: () => void;
    /**
     * @onPressEnter 回车回调
     */
    onPressEnter?: () => void;
    /**
     * @prefix 前缀
     */
    prefix?: any;
    /**
     * @suffix 后缀
     */
    suffix?: any;
    /**
    * @addBefore 输入框前添加元素
    */
    addBefore?: ReactNode;
    /**
     * @addAfter 输入框后添加元素
     */
    addAfter?: ReactNode;
    /**
    * @beforeStyle 输入框前添加元素的样式
    */
    beforeStyle?: object;
    /**
     * @afterStyle 输入框后添加元素的样式
     */
    afterStyle?: object;
    /**
     * @allowClear 是否需要清除功能
     */
    allowClear?: boolean;
    /**
     * @onClear 清除回调
     */
    onClear?: (value?: string | string[], e?: any) => void;
    /**
     * @pointerEventFocus select组件专用
     */
    pointerEventFocus?: boolean;
    /**
     * @onKeyDown 键盘回调
     */
    onKeyDown?: (e: any) => void;
    /**
     * @mode inputTag模式
     */
    mode?: any;
    inputCallback?: (current: HTMLInputElement) => void;
    /**
     *
     *  @onBlur 失焦回调
     *
     */
    onBlur?: (value: any) => void;
}
/**
 * 在原生控件基础上进行了功能扩展
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from "@light3711/lightui"
 * ~~~
 */
export declare const Input: FC<InputProps>;
export default Input;
