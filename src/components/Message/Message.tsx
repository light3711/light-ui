import classNames from 'classnames'
import React, { ReactNode, useMemo, useEffect, useState, ReactChild } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import Icon from '../Icon'

export type MessageType = 'info' | 'success' | 'danger' | 'warning'
export interface MessageProps {
  className?: string,
  top?: string,
  /**
   * @MessageType message类型
   */
  MessageType?: MessageType,
  icon?: any,
  /**
   * @duration 消失时间
   */
  duration?: number,
  /**
     * @content message内容
     */
  content?: ReactNode
}


let wrap: HTMLElement


export const createMessage = () => {

  return (content: MessageProps) => {

    switch (content.MessageType) {
      case 'warning':
        content.icon = <Icon color={'#fd7e14 '} icon={'exclamation-triangle'} ></Icon>;
        break
      case 'danger':
        content.icon = <Icon color={'#dc3545'} icon={'times'} ></Icon>;
        break
      case 'success':
        content.icon = <Icon color={'#26b83a'} icon={'check-circle'} ></Icon>;
        break
      case 'info':
        content.icon = <Icon color={'#0d6efd'} icon={'info-circle'} ></Icon>;
    }

    if (!wrap) {
      wrap = document.createElement('div')
      wrap.style.cssText = `line-height:1.5;
      text-align:center;
      color: #333;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      position: fixed;
      z-index: 100000;
      width: 100%;
      top: ${content.top ? content.top : '10px'};
      left: 0;
      pointer-events: none;`

      if (wrap) {
        document.body && document.body.appendChild(wrap)
      }
    }

    const div = document.createElement('div')
    wrap.append(div)
    ReactDOM.render(
      <Message rootDom={wrap} parentDom={div} content={content} />,
      div
    );
  }

}
/**
 * 全局消息
 * ### 引用方法
 * 
 * ~~~js
 * import { createMessage } from "@light3711/lightui"
 * ~~~
 */
export const Message = (props: { rootDom: HTMLElement, parentDom: HTMLElement, content: MessageProps }) => {

  const { rootDom, parentDom, content } = props
  const [cx, setcx] = useState('')

  const messagecx = classNames('lig-message', content.className, cx)
  const unmont = useMemo(() => {
    return () => {
      if (parentDom && rootDom) {
        setcx('hidden')
        setTimeout(() => {
          unmountComponentAtNode(parentDom)
          rootDom.removeChild(parentDom)
        }, 200);
      }
    }
  }, [parentDom, rootDom])


  useEffect(() => {
    setTimeout(() => {
      unmont()
    }, content.duration ? content.duration : 3000);
  }, [unmont])



  return (
    <div className={messagecx}>
      <span>{content.icon && content.icon}</span>
      <span>{content.content}</span>
    </div>
  )
}


