import classNames from 'classnames'
import React, { Children, createContext, ReactNode, RefObject, useContext, useEffect, useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnclickOutside';
import { defaultType, styleType } from '../../utils/type';
import Icon from '../Icon';
import Input, { InputProps } from '../Input/Input';
import Tag, { ligDesignColor } from '../Tag/Tag';

export interface InputTagProps extends styleType,Omit<InputProps,'value'> {
  /**
   *   tag色板颜色
   */
  tagColor?: ligDesignColor
   
  /**
   *   inputValue
   */
  inputValue?: string
  /**
   *   渲染tag的value数组
   */
  value?: string[] | string
  /**
   *   inputChecked
   */
  checked?: boolean
  /**
   *   输入框 placeholder
   */
  placeholder?: string
  /**
   *  tag的关闭回调 
   */
  onClose?:Function
  /**
   *   自定义render内容 
   */
  renderTag?:(onClose:Function,inputElement:ReactNode | ReactNode[],value)=> ReactNode  
  onKeyDowm?:Function
}

 
/**
 * 标签输入Input
 * ### 引用方法
 * 
 * ~~~js
 * import { InputTag } from "@light3711/lightui"
 * ~~~
 */
export const InputTag = (props: InputTagProps) => {

  const { value,mode,style } = props
  const [tagArray, setTagArray] = useState([])
  const [tagValue, setTagValue] = useState('')
  const [checked, setTagchecked] = useState(false)
  const [inputElement, setTagHeight] = useState(null)
  const [u, setU] = useState({})
  const inputTagRef = useRef(null)
  useEffect(()=>{
    value && setTagArray(value as string[])
  },[value])
  useEffect(()=>{
    props.checked && setTagchecked(props.checked)
  },[props.checked])

  const inputTagOnKeyDowm = (e) => {

    if (e.keyCode === 13 && tagValue !== '') {
      setTagArray((state) => {
        if (state.indexOf(tagValue) === -1) {
          state.push(tagValue)
        }
        return state
      })
    props.onChange && props.onChange(tagArray)
    props.onKeyDown && props.onKeyDown(tagArray)
    setTagValue('')

    }
    if (e.keyCode === 8 && tagArray.length !== 0 && (tagValue === undefined || tagValue === '')) {
      setTagArray((state) => {
        state.pop()
        return state
      })
      setTagValue('')
      setU({})
    props.onChange && props.onChange(tagArray)

    }
    props.onKeyDowm && props.onKeyDowm(e)
    
  }

  const onClose = (e, item) => {
    setTagArray((state) => {
      const result = state.filter((v) => v !== item)
      return result
    })
    props.onClose && props.onClose(item)
    props.onChange && props.onChange(tagArray)
  }

  const renderTag = () => {

    return  (

        props.renderTag ? tagArray?.map((value)=>{
          return props.renderTag(onClose,inputElement,value)
        }) 
        : 
         tagArray?.map((item) => {
            return (
              <Tag
                onClose={(e, c) => onClose(e, item)}
                key={item} children={item}
                color={props.color && props.color as ligDesignColor}
                style={{
                  color:'black',
                  backgroundColor: checked ? '#ecf2f7' : 'white',
                  margin:'3px 0',marginRight:'2px',marginLeft:'none',
                  height: `${inputElement?.offsetHeight * 0.75}px`,
                  fontSize: `${inputElement?.clientHeight * 0.5}px`,
                }} />
            )
          })
          
          )

  }
  
  const onClear = () => {
    
    setTagArray([])
    setTagValue('')
    props.onClear && props.onClear()
  }

  function inputCallback(e) {
    setTagHeight(e)
  }

  return (
    <div
    ref={inputTagRef}  style={{...props.style}}>
      <Input
        value={props.inputValue ? props.inputValue : tagValue}
        mode={renderTag()}
        checked={props.checked ? props.checked : checked}
        inputCallback={inputCallback}
        placeholder={(tagArray.length > 0) ? '' : props.placeholder ? props.placeholder : 'Press Enter'}
        suffix={<Icon color="#d4d4d4" icon={'times'}></Icon>}
        pointerEventFocus={props.pointerEventFocus ? props.pointerEventFocus : false}
        allowClear
        onClear={onClear}
        className={'lig-inputTag'}
        onKeyDown={inputTagOnKeyDowm}
        onChange={(e) => {setTagValue(e as string)}}
        addAfter={props.addAfter}
        addBefore={props.addBefore}
        onBlur={()=>setTagchecked(false)}
        
      /></div>

  )

}

 