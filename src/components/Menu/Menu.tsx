import React, { createContext, useState } from "react";
import classNames from "classnames";
import {MenuItem, MenuItemProps } from "./MenuItem";
import { defaultType, styleType } from "../../utils/type";


export type MenuType = 'horizontal ' | 'vertical'


export interface MenuProps extends styleType,Pick<defaultType,'onClick'>{
    /**
     *  菜单类型
     */
    type?:MenuType
    // defaultIndex ?: string
    // defalutOpenSubMenu?:string[]
    /**
     * icon 
     */
    icon?:any
}

interface MyMenuContext {
    index:string
    itemClick ?: (selectedIndex:string)=>void
    type?:MenuType
    defalutOpenSubMenu?:string[]
    icon?:any
}

export const MenuContext = createContext<MyMenuContext>({index:'0'}) 
/**
 * 收纳、排列并展示一系列选项的列表。
 * ### 引用方法
 * 
 * ~~~js
 * import { Menu } from "@light3711/lightui"
 * ~~~
 */
export const Menu : React.FC<MenuProps>=(props) => {
    
    const {type,className,onClick,children,style} = props
    const [currentActive,setActive] = useState('') 
    const cx = classNames('lig-menu',className,{
        [`menu-${type}`] : type,   
    })
    
    const handleClick = (index:string)=>{
        setActive(index)
         onClick && onClick(index)
    }

    const passedContext : MyMenuContext = {
        index : currentActive ? currentActive : '0' 
        ,itemClick : handleClick 
        ,type:type
        // ,defalutOpenSubMenu:defalutOpenSubMenu
    }

    const renderChilden = ()=>{
        return React.Children.map(children,(child,index)=>{

            const childrenElement = child as React.FunctionComponentElement<MenuItemProps>

            const { displayName } = childrenElement.type

            if (displayName==='MenuItem' ) {

                return React.cloneElement(childrenElement,{
                    index:index.toString(),
                    className:'onlyMenuItem'
                })  

            }
            if (displayName==='SubMenu' ) {

                return React.cloneElement(childrenElement,{
                    index:index.toString(),
                }) //cloneElement 为每一个childrenElement添加index属性

            }
            
            else{console.log('err');
            }
        })
    }

    return(
        
        <ul className={cx} style={{...style}}  >
            <MenuContext.Provider value={passedContext} > 
            {renderChilden()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps={
    type:'horizontal ',
}

export default Menu