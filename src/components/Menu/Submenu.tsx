import React, {CSSProperties, FunctionComponentElement,useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import { Icon } from "../Icon/Icon";

export interface SubMenuProps {
    className?: string
    , index?: string
    , title?: string
    , style?: CSSProperties
    , children?: any
    ,icon?:any
}


const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { className, title, index, children,icon } = props
    const context = useContext(MenuContext)

   
    const [menuShow, setShow] = useState(false)

    const cx = classNames('subMenu', className, {
        'active': context.index === index // 是否高亮
        // ,'is-Y': context.type === 'Y',

    })

    const openItemcx = classNames('openItem', className, {
        'show': menuShow
    })
 
    const handleClick = (e: React.MouseEvent,node?:string) => {
        console.log(node);
        
        e.preventDefault()
        if (context.type === "vertical") {
            setShow(!menuShow)
        } else {
            setShow(true)

        }
    }


    let time;
    const onMouseEnter = () => {
        if (context.type === 'vertical') {
            return
        } else {
            clearTimeout(time)
            setShow(true)
        }

    }
    const onMouseLeave = () => {
        if (context.type === 'vertical') {
            return
        } else {
            time = setTimeout(() => {
                setShow(false)
            }, 100);
        }

    }

    const renderChildren = () => {
        const chlildrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }
            else {
                console.log('SubMenuError');
            }
        })

        return (
            <div className={openItemcx} style={{height: (menuShow && children?.length >= 0) ? `${children?.length * 40}px` : '0'}} >
                {chlildrenComponent}
            </div>
        )

    }
 
   
    return (
        <>
            <div key={index} className={cx} 
            onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}  >
                <div className={`submenu-title ${menuShow ? 'show' : ''}`} onClick={(e)=>handleClick(e,'title')}>
                    <div className="title">
                   {icon ? icon : (context.type === 'vertical')  && ''}
                        {title}
                    {context.type === 'vertical' &&  <Icon className={`up ${menuShow ? 'show' : ''}`} icon={'angle-up'}></Icon> }
                        </div>
                </div>
                {context.type === 'horizontal ' &&<li className="line" style={{ backgroundColor: menuShow ? '#0d6efd' : '' }} ></li>}

                   {renderChildren()} 
                
                
            </div>

        </>
    )
}

 
SubMenu.displayName = 'SubMenu'
export default SubMenu