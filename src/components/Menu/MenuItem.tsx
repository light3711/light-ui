import React, {createContext, useContext, useRef, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
export interface MenuItemProps {
    index?:string
    className?:string
    disabled?:boolean
    children?:React.ReactNode
}

export const MenuItem : React.FC<MenuItemProps>=(props)=>{

    const { index,className,disabled,children}=props

    const context = useContext(MenuContext)

    const classes = classNames('menuItem',className,{
        'disabled' : disabled  
        ,'active' : context.index === index  && !disabled
    })

    const handleClick = ()=>{
        
        if (context.itemClick && !disabled && (typeof index ==='string' ) ) {
            context.itemClick(index)
        }
    }
    return(
        
        <li className={classes} onClick={handleClick} >
           
            {children}
            {<div className="line" 
            style={{ backgroundColor: context.index === index  &&
                 !disabled && className && 
                 className.indexOf('onlyMenuItem') !== -1 ? '#0d6efd' : '' 
            }} ></div>}
        </li>
        
    )
}
MenuItem.displayName='MenuItem'
