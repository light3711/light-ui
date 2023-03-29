import classNames from 'classnames'
import React from 'react'
import { useState } from 'react'
import { styleType } from '../../utils/type'
import { Imgcontrol } from './imgcontrol'

export interface ImgProps extends styleType {
  /**
   *  图片数据
   */
  src?:{id:number,src:string}[]
  onClose?:Function
}

/**
 * 展示和预览图片
 * ### 引用方法
 * 
 * ~~~js
 * import { Img } from "@light3711/lightui"
 * ~~~
 */

export const Img = (props:ImgProps) => {
  const {src,style} = props
 
    const [open,setopen] = useState(false)
    const handleclick = ()=>{
        setopen(!open)
    }
    const cx = classNames('lig-img',{

    },props.className)

  return (
    <div className={cx} style={style}>
        {
        src ?
        <img src={ src[0].src } className='img-wrapper' onClick={handleclick} />
        :
        <div style={{backgroundColor:'#adb5bd',color:'white'}}>
          暂无数据
        </div>
}
        {
          open &&  
          <Imgcontrol 
          onClose={() =>{
            setopen(!open)
            props.onClose && props.onClose()
          }} src={src ? src : []}    />
        }
    </div>
  )
}
