import { CSSProperties } from "react"

export interface styleType {
    /**
     *  自定义className
     */
    className?: string
    /**
     *  自定义style
     */
    style?: CSSProperties
}

export interface defaultType {
    children?: any
    /**
     *  是否隐藏
     *  */
    visible?: boolean
    /**
     *   是否禁用
     */
    disabled?: boolean
    /**
     *   变化回调
     */
    onChange?: (e?: any) => void
    /**
     *   点击回调
     */
    onClick?: (e?: any) => void
    /**
     *   受控值
     */
}