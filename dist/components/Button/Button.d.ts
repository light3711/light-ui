import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { defaultType, styleType } from "../../utils/type";
export declare type ButtonSize = 'lg' | 'sm';
export declare type ButtonType = 'primary' | 'danger' | 'link' | 'warning' | 'info';
export declare type ButtonForm = 'round' | 'circle' | 'square';
interface BaseButtonProps extends styleType, Pick<defaultType, 'disabled'> {
    /**
     * @size 按钮尺寸
     */
    size?: ButtonSize;
    /**
     * @btnType 按钮类型
     */
    btnType?: ButtonType;
    children?: React.ReactNode;
    /**
     * @href link链接
     */
    href?: string;
    /**
     * @shape 按钮形状
     */
    shape?: ButtonForm;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 按钮
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from "@light3711/lightui"
 * ~~~
 */
export declare const Button: FC<ButtonProps>;
export default Button;
