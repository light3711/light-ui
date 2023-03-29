import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
  theme? : ThemeProps
  
}

/**
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { Icon } from "@light3711/lightui"
 * ~~~
 */

export const Icon: React.FC<IconProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('lig-icon', className, {
    [`icon-${theme}`]: theme
  })
 
  return (
   
    <FontAwesomeIcon   className={classes} {...restProps} />
    
  )
}

