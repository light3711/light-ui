import { ReactNode } from 'react';
import { styleType } from '../../utils/type';
import { InputProps } from '../Input/Input';
import { ligDesignColor } from '../Tag/Tag';
export interface InputTagProps extends styleType, Omit<InputProps, 'value'> {
    /**
     * @tagColor tag色板颜色
     */
    tagColor?: ligDesignColor;
    /**
     * @value inputValue
     */
    inputValue?: string;
    /**
     * @value 渲染tag的value数组
     */
    value?: string[] | string;
    /**
     * @checked inputChecked
     */
    checked?: boolean;
    /**
     * @placeholder input placeholder
     */
    placeholder?: string;
    /**
     * @onClose tag的关闭回调
     */
    onClose?: Function;
    /**
     * @renderTag 自定义render内容
     */
    renderTag?: (onClose: Function, inputElement: ReactNode | ReactNode[], value: any) => ReactNode;
    onKeyDowm?: Function;
}
/**
 * 标签输入Input
 * ### 引用方法
 *
 * ~~~js
 * import { InputTag } from "@light3711/lightui"
 * ~~~
 */
export declare const InputTag: (props: InputTagProps) => JSX.Element;
