import { is } from '@babel/types'
import React, { FC } from 'react'
import { useState } from 'react'
import { defaultType, styleType } from '../../utils/type'

export interface BackTopProps extends styleType,Pick<defaultType,'onClick'|'children'>{
  /**
   * @visibilityHight 滚动到此参数值才会出现BackTop
   */
  visibilityHight?:number  
}


/**
 * 可一键返回顶部
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { BackTop } from "@light3711/lightui"
 * ~~~
 */

export const BackTop = (props:BackTopProps) => {

  const {visibilityHight,onClick,className,children} = props
  const [show, setisShow] = useState(false);
 
  const backOnclick = ()=>{
    
     window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    onClick && onClick() 
  }
  
  const handle = ()=>{
    let tops = document.body.scrollTop || document.documentElement.scrollTop
    if (visibilityHight) {
      if (tops>= visibilityHight) {
        setisShow(true)
      }else{setisShow(false)}
    }
  }
  
  window.addEventListener('scroll',handle)

   return (
    <div onClick={backOnclick} className={`lig-backTop ${show ? 'show' : ''} ${className}`}>
      {props.children}
    </div>
   )
   
}


BackTop.defaultProps={
  visibilityHight:300
}
