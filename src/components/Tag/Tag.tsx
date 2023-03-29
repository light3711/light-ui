import classNames from "classnames";
import { isFunction, isUndefined } from "lodash";
import React, {
  CSSProperties,
  ReactNode,
 useCallback, useContext, useEffect, useRef, useState
} from "react";
import { Icon } from "../Icon/Icon";



export type ligDesignColor = 'blue'|'purple'|'pink'|'red'|'orange'|'yellow'|'green'|'teal'|'cyan'|''

export interface TagProps  {
  style?: CSSProperties;
  children?: any
  className?: string | string[];
  size?: 'mini' | 'lg'
  /**
   *  需要清除
   */
  allowClose?:boolean
  /**
   *  设置标签背景颜色
   */
  color?: ligDesignColor;
  /**
   *  是否显示边框
   */
  border?: Boolean;
  /**
   *  设置标签显示隐藏
   */
  visible?: boolean;
  /**
   *  是否可关闭标签
   */
  closable?: boolean;
  /**
   *  是否支持选中
   */
  checkable?: boolean;
  /**
   *   是否默认选中
   */
  defaultChecked?: boolean;
  /**
   *  是否选中（受控模式）
   */
  checked?: boolean;
  /**
   *   设置图标
   */
  icon?: ReactNode;
  /**
   *  关闭标签回调函数
   */
  onClose?: (e,children) => Promise<any> | void;
  /**
   *   选中的回调
   */
  onCheck?: (checked: boolean) => void;
}
const colors = ['blue',  'purple', 'pink', 'red', 'orange', 'yellow', 'green','teal','cyan']

/**
 * 用于信息的选择、筛选、分类
 * ### 引用方法
 * 
 * ~~~js
 * import { Tag } from "@light3711/lightui"
 * ~~~
 */

 const Tag = (props: TagProps, ref: any) => {

  const { className, color, checkable, defaultChecked,style,size, ...rest } = props
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const tagRef = useRef<HTMLDivElement>(null)

  const onClose = (e?: any) => {
    const result = props.onClose && props.onClose(e,props.children)
     if (result && result.then) {
       setLoading(true)
       result.then(()=>{
        setLoading(false)
        setVisible(true)
       })
       .catch(()=>{
        setLoading(false)
       })
     }else{
      setVisible(true)
     }
  }

  const defaultColor = colors.indexOf(props.color) === -1  
 
  const cx = classNames('lig-tag', {
    [`${props.color}`]: props.color,
    'visible': visible,
    [`tag-border ${props.border}`] : props.border,
    'defaultColor' : defaultColor,
    [`${size}`] : size
  }, className)
   
  const cxc = classNames('tag-closebtn', {
    [`${props.color}`]: props.color,
    'visible': visible,
  })

  const iconClick = useCallback((e) => {
    
  }, [])

  return (
    <div className={cx}  
     ref = {tagRef}
     style={{
      ...props.style}}
     onKeyDown={iconClick}
     
    >
      <div className="tag-content">
        <div className="tag-icon" >{props.icon}</div>
        <div className="tag-children">{props.children ? props.children : 'tag'} </div>
        <div>
         {props.allowClose && <div className={cxc} onClick={onClose} >
            {
              loading ? <Icon icon='spinner' spin  ></Icon> :
              <Icon icon="times" />
            }
          </div>}
        </div>
      </div>
    </div>
  )

}

Tag.defaultProps = {
  allowClose:true
}

export default Tag





















