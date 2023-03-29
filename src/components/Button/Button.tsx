import React,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes} from "react";
import classNames from "classnames";
import { defaultType, styleType } from "../../utils/type";
 
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'danger' | 'link' | 'warning' | 'info'
export type ButtonForm = 'round' | 'circle' | 'square'  
interface BaseButtonProps  extends styleType,Pick<defaultType,'disabled'>{
    /**
     *  按钮尺寸
     */
    size?: ButtonSize,
    /**
     * 按钮类型
     */
    btnType?: ButtonType,
    children?: React.ReactNode
    /**
     *  link链接
     */
    href?: string
    /**
     *  按钮形状
     */
    shape?:ButtonForm
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>  //React提供好的Button属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement> //React提供好的A链接属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> //Partial是ts的API，可以把所有变成可选的

/**
 * 按钮
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from "@light3711/lightui"
 * ~~~
 */


export const Button: FC<ButtonProps> = (props) => {
    const { btnType, disabled, size, className,children, href ,shape,...restProps } = props

    const classes = classNames('lig-btn', {
        'disabled': disabled,
        [`${size}`]: size,
        [`${btnType}`] : btnType,
        [`${shape}`]: shape
    }, className)
 
    if (btnType === btnType && href) {
        return (
            <a  className={classes}  href={href}{...restProps}>{children}</a>
        )
    }
    else {
        return (
            <button className={classes} {...restProps}>{children ? children : 'Button' }</button>
        )
    }
}
Button.defaultProps = {
    disabled: false,
    btnType: 'primary',
}


export default Button;