import classNames from "classnames";
import React, { createContext, CSSProperties, ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { defaultType, styleType } from "../../utils/type";
import { Icon } from '../Icon/Icon'
import Input from "../Input";
import { InputProps } from "../Input/Input";
import { InputTag, InputTagProps } from "../InputTag/InpuTag";
import useOnClickOutside from "../../hooks/useOnclickOutside";

const SelectContext = createContext<{
  setInputValue: Function, setShow: Function, inputValue?: string, setAddOption?: Function
  mode?: boolean, setUpdata: Function,
}>({
  setInputValue: () => { }, setShow: () => { }, inputValue: '',
  setAddOption: () => { }, mode: false,
  setUpdata: () => { },

});


interface SelectProps extends styleType, InputTagProps, Omit<InputProps, 'prefix' | 'addBefore' | 'addAfter' | 'value'> {
  /**
   * @option选项
   */
  option?: any[]
  /**
   * @children 自定义option
   */
  children?: ReactNode[] | any
  /**
   * @mode inputTag模式
   */
  mode?: boolean
  defaultValue?: string
  /**
   * @allowCreate 允许创建
   */
  allowCreate?: boolean
  /**
   * @listStyle 自定义展开菜单样式
   */
  listStyle?: CSSProperties
  /**
   * 
   * @onClose tag关闭回调
   */
  onClose?: (value: string) => void
  allowChange?: boolean
}
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'ShenZhen'];


/**
 * 选择器
 * ### 引用方法
 * 
 * ~~~js
 * import { Select } from "@light3711/lightui"
 * ~~~
 */

export const Select = (props: SelectProps) => {

  const { defaultValue, mode, className, children, style, ...rest } = props
  const _children = children ? children : []
  const option = props.option ? props.option : options
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [addOption, setAddOption] = useState([])
  const [update, setUpdata] = useState({})
  const [child, setChild] = useState([])
  const [heightLight, setHeightLight] = useState(0)
  const selectRef = useRef(null)

  useEffect(() => {
    mode && option && setAddOption(option)
  }, [option])

  const showDropdownHandler = () => {
    if (mode) {
      if (!showDropdown) {
        setShowDropdown(!showDropdown);
      } else return
    } else {
      setShowDropdown(!showDropdown);
    }


  }
  const clickOutsideHandler = () => setShowDropdown(false)


  const cx = classNames('lig-select', className, {
  })
  const listcx = classNames('select-list', {
    'show': showDropdown,
    'noChildren': _children.length === 0,
  })

  const onKeyDowm = (e) => {
    setShowDropdown(true)
    for (let i = 0; i < _children.length; i++) {
      if (_children[i].key === e.target.value) {
        return
      }
    }
    
    if (('className' in props && props.className.includes('lig-autoComplete')) && child &&
        child.length && (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13)) {
      if (e.keyCode === 38 && heightLight > 0) {
        setHeightLight(heightLight-1)
      }
      if (e.keyCode === 40 && heightLight < child.length - 1) {
        setHeightLight(heightLight+1)
      }
      if (e.keyCode === 13 && e.target.value !== '' && e.target.value !== undefined) {
        setInputValue(child[heightLight])
        setShowDropdown(false)
        setHeightLight(-1)
      }
    }
    
    if (props.allowCreate && e.keyCode === 13 && e.target.value !== '' && e.target.value !== undefined) {
      _children.push(
        <Option key={e.target.value} >{e.target.value}</Option>
      )
      setInputValue('')
      setUpdata({})
    }
    props.onKeyDown && props.onKeyDown(e)

  }

  useEffect(() => {
    child &&  (heightLight !== -1) && setInputValue(child[heightLight])
  }, [heightLight])
 
 

  function setInputValues(value) {
    setInputValue(value)
    props.onChange && props.onChange(value)
  }

  function onClear() {
    setInputValue('')
    setAddOption([])
    props.onClear && props.onClear([])
    setShowDropdown(true)
  }

  function onClose(e) {
    setAddOption(addOption.filter((v) => v !== e))
    props.onClose && props.onClose(e)
  }

  function onChange(value) {
    setInputValue(value)
    props.onChange && props.onChange(value)
  }



  useEffect(() => {
     props && props.children && props.children.length>0 && setChild(props.children?.map((item) => item.props.children))
  }, [props.children])


  useEffect(() => {
    setInputValue(props.value as string)
  }, [props.value])
  useOnClickOutside(selectRef, clickOutsideHandler)


  return (
    <>
      <div className={cx} ref={selectRef} style={{ cursor: 'pointer', ...style }}>
        <div className="select-wrapper"  >
          <div onClick={showDropdownHandler} >
            {!mode ?
              <Input
                value={inputValue}
                checked={showDropdown}
                pointerEventFocus={'allowCreate' in props || 'allowChange' in props ? false : true}
                placeholder={props.placeholder ? props.placeholder : 'Please Select'}
                suffix={props.suffix ? props.suffix : <Icon color="#d4d4d4" icon={'angle-down'}></Icon>}
                style={{ fontSize: '1rem' }}
                className={'select-input'}
                allowClear={props.allowClear}
                onClear={onClear}
                onKeyDown={onKeyDowm}
                onChange={(value) => onChange(value)}
              />
              :
              <InputTag
                value={addOption}
                checked={showDropdown}
                placeholder={props.placeholder ? (props.mode && addOption.length > 0 ? '' : props.placeholder) : ''}
                onClear={onClear}
                onClose={(e) => { onClose(e) }}
                onKeyDowm={onKeyDowm}
                {...rest}
              ></InputTag>}
          </div>

          <div className={listcx} style={props?.listStyle} >

            <SelectContext.Provider
              value={{
                setInputValue: setInputValues,
                inputValue: inputValue,
                setShow: setShowDropdown,
                setAddOption: setAddOption,
                mode: props.mode,
                setUpdata: setUpdata
              }}  >

              {_children && _children}

            </SelectContext.Provider>
          </div>

        </div>

      </div>
    </>
  )
}

interface OptionProps extends styleType, Pick<InputProps, 'onClick' | 'onMouseEnter' | 'onMouseLeave'> {
  disabled?: boolean
  children?: any
  keys?: number
}

export const Option = (props: OptionProps) => {

  const { setInputValue, setAddOption, setShow, inputValue, mode, setUpdata, } = useContext(SelectContext)

  const { children, disabled, className } = props

  const [hoverColor, setHoverColor] = useState(false)
  const optioncx = classNames('select-option', {
    'disabled': disabled,
    'hoverColor': hoverColor
  }, className)

  const labelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      mode ? setShow(true) : setShow(false)
      setAddOption((state) => {
        if (state.indexOf(children) !== -1) {
          return state
        } else {
          if (state) {
            state.push(children)
          }
          return state

        }
      })
      mode ? setInputValue('') : setInputValue(children)

    }
    props.onClick && props.onClick(e)
    setUpdata({})

  }


  useEffect(() => {
    if (inputValue === children) {
      setHoverColor(true)
    } else {
      setHoverColor(false)
    }
  }, [inputValue])

  return (
    <>
      <div className={`${optioncx}`}
        {...props}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          labelClick(e)
        }}
        onMouseEnter={(e) => {
          !disabled ? setHoverColor(true) : setHoverColor(false)
          props.onMouseEnter && props.onMouseEnter(e)
        }}
        onMouseLeave={(e) => {
          inputValue !== children && setHoverColor(false)
          props.onMouseLeave && props.onMouseLeave(e)
        }}
      >
        {children}
      </div>
    </>
  )

}

