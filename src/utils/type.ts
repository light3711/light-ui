import { CSSProperties } from "react"

export interface styleType {
    className?: string
    style?: CSSProperties
    
}

export interface defaultType {
    children?: any
    /**
     * @visible 是否隐藏
     *  */
    visible?: boolean
    /**
     * @disabled 是否禁用
     */
    disabled?: boolean
    /**
     * @onChange 变化回调
     */
    onChange?: (e?: any) => void
    /**
     * @onClick 点击回调
     */
    onClick?: (e?: any) => void
    /**
     * @value 受控值
     */
}