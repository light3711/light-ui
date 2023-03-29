import React, { ReactElement, InputHTMLAttributes, FC, useState, ChangeEvent, ReactNode, useRef, useEffect, FocusEventHandler, createContext, useContext } from "react";
import classNames from "classnames";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon/Icon'
import { styleType } from "../../utils/type";
import useDebounce from "../../hooks/useDeboun";
library.add(fas)
type inputSize = 'lg' | 'sm'
type inputType = 'password' | 'text'

export interface InputProps extends styleType, Omit<InputHTMLAttributes<HTMLElement>,
    'onKeyDown' | 'onFocus' | 'size' | 'maxLength' | 'onChange' | 'onBlur'> {
    /**
     * @value 受控值
     */
    value?: string | string[] | number
    /**
     * @size 尺寸
     */
    /**
     * @type
     */
    type?: inputType
    size?: inputSize
    /**
     * @icon 图标
     */
    icon?: any
    /**
     * @onChange 回调事件
     */
    onChange?: (value: string | string[] | number, e?: Element, focus?: boolean) => void
    /**
     * @iconClick 图标回调
     */
    iconClick?: () => void
    /**
     * @onPressEnter 回车回调 
     */
    onPressEnter?: () => void
    /**
     * @prefix 前缀
     */
    prefix?: any
    /**
     * @suffix 后缀
     */
    suffix?: any
    /**
    * @addBefore 输入框前添加元素
    */
    addBefore?: ReactNode;
    /**
     * @addAfter 输入框后添加元素
     */
    addAfter?: ReactNode;
    /**
    * @beforeStyle 输入框前添加元素的样式
    */
    beforeStyle?: object;
    /**
     * @afterStyle 输入框后添加元素的样式
     */
    afterStyle?: object;
    /**
     * @allowClear 是否需要清除功能
     */
    allowClear?: boolean
    /**
     * @onClear 清除回调
     */
    onClear?: (value?: string | string[], e?: any) => void
    /**
     * @pointerEventFocus select组件专用
     */
    pointerEventFocus?: boolean,
    /**
     * @onKeyDown 键盘回调
     */
    onKeyDown?: (e) => void,
    /**
     * @mode inputTag模式
     */
    mode?: any
    inputCallback?: (current: HTMLInputElement) => void
    /**
     * 
     *  @onBlur 失焦回调
     *  
     */
    onBlur?: (value) => void

}

/**
 * 在原生控件基础上进行了功能扩展
 * ### 引用方法
 * 
 * ~~~js
 * import { Input } from "@light3711/lightui"
 * ~~~
 */
 
 
export const Input: FC<InputProps> = (props) => {

    const { disabled, className, size, icon, style,
        type = 'text',
        iconClick,
        onProgress,
        prefix,
        suffix,
        addBefore,
        addAfter,
        beforeStyle,
        afterStyle,
        allowClear,
        onChange,
        defaultValue,
        onKeyDown, mode, value,
        ...resProps } = props

    const [mfocus, setMfocus] = useState(false)
    const [inputValue, setinputValue] = useState<number | string | string[]>('')
    const [clearControl, setClearControl] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const fakerRef = useRef(null)
    const [width, setWidth] = useState('')

    const cx = classNames('lig-input', className, {
        size: props.size,
        'disabled': disabled,
        'button': props.pointerEventFocus
    })
   
    
    const contentcx = classNames('input-content', {
        'focus': mfocus,
        'blur': !mfocus,
        'pl-none': prefix || addBefore,
        'pr-none': !allowClear && (suffix || addAfter),
        'padding': !prefix && !suffix,
        'rl-none': addBefore,
        'rr-none': addAfter,
        'mode': 'mode' in props,
        'button': props.pointerEventFocus

    })
    const wrappercx = classNames('input-wrapper', {

    })
    const inputcx = classNames('minput', {
        'focus': mfocus,
        'blur': !mfocus,
        'button': props.pointerEventFocus
    })
    const ligInputRef = useRef(null)
    
    useEffect(() => {
        props.inputCallback && props.inputCallback(inputRef?.current)
    }, [])

    const blurChange = () => {
        'checked' in props ? setMfocus(props.checked) : setMfocus(false)
        inputRef.current?.blur()
        props.onBlur && props.onBlur(inputValue)
    }
    const focusChange = () => {
        !props.pointerEventFocus && inputRef.current?.focus()
        setMfocus(true)
    }

    useEffect(() => {
        'checked' in props ? setMfocus(props.checked) : setMfocus(false)
    }, [props.checked])

    const inputHandleChange = (e) => {
        setinputValue(props.value ? props.value : e.target.value)
        props.onChange && props.onChange(e.target.value, e, mfocus)
    }

    const onClear = (e) => {
        e.stopPropagation();
        if (inputRef.current && inputRef.current.focus && !props.pointerEventFocus) {
            inputRef.current.focus();
        }
        setinputValue('')
        setClearControl(true)
        props.onClear && props.onClear(inputValue as string, e)
    }

    const inputOnKeyDown = (e) => {
        if (e.keyCode === 13 && mode) {
            mode && setWidth('4px')
        } else {
            setinputValue(props.value ? props.value : e.target.value)
        }
        props.onKeyDown && props.onKeyDown(e)
    }

    useEffect(() => {
        if (mode && mode.length > 0) {
            setClearControl(false)
        } else {
            if (inputValue === undefined || inputValue === '') {
                setClearControl(true)
            } else {
                setClearControl(false)
            }
        }
    },
        [inputValue, mode])

    useEffect(() => {
        defaultValue && setinputValue(defaultValue as string)
    }, [])
    useEffect(() => {
        if (!defaultValue) {
            props.value ? setinputValue(props.value as string) : setinputValue('')
        }
    }, [props.value])

    const renderOrder = (child?: ReactNode, classname?: string) => {
        if (classname === 'input-clear' && allowClear) {
            return <div
                onClick={onClear}
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
                style={{
                    visibility: clearControl ? 'hidden' : 'visible',
                    cursor: 'pointer'
                }}
                className={classname}>{
                    <Icon style={{ color: '#adb5bd' }} icon={'times-circle'}></Icon>}
            </div>
        }
        else {
            return child && <div
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
                className={classname}>{child}</div>
        }
    }

 
    const mouseControl = (flag) => {
        if (mode && mode.length > 0) {
            setClearControl(false)
        } else {
            if (flag === 'enter') {
                if (inputValue === undefined || inputValue === '') {
                    setClearControl(true)
                } else {
                    setClearControl(false)
                }
            } else if (flag === 'leave') {
                setClearControl(true)
            }
        }

    }

    useEffect(() => {
        if (mode?.length <= 0 && (inputValue === '' || inputValue === undefined)) {
            setWidth('')
        }
        else {
            if (inputValue !== '' && inputValue !== undefined) {
                setWidth(`${fakerRef?.current?.offsetWidth}px`)
            } else if (mode && mode.length > 0 && (inputValue === '' || inputValue === undefined)) {
                setWidth('4px')
            }
        }

    }, [inputValue, mode])


    return (
        <>

            <div className={cx}
                onMouseEnter={() => mouseControl('enter')}
                onMouseLeave={() => mouseControl('leave')}
                style={{ ...props.style }}
                ref={ligInputRef}
            >

                <div className={wrappercx} >
                    {renderOrder(addBefore, 'input-addBefore')}
                    <div className={contentcx}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            focusChange()
                        }}
                    >
                        {renderOrder(prefix, 'input-prefix')}
                        {mode && mode}
                        <input
                            value={inputValue}
                            onKeyDown={inputOnKeyDown}
                            type={type === 'password' || type === 'text' ? type : 'text' }
                            className={inputcx}
                            ref={inputRef}
                            checked={null}
                            placeholder={props.placeholder && props.placeholder}
                            style={{
                                fontSize: `${style?.fontSize ? style.fontSize : inputRef.current?.clientHeight * 0.5}px`,
                                width: width,
                            }}
                            onChange={inputHandleChange}
                            onBlur={blurChange} onFocus={focusChange} />

                        {mode && <span className="input-faker"
                            style={{ fontSize: `${style?.fontSize ? style?.fontSize : inputRef.current?.clientHeight * 0.5}px` }}
                            ref={fakerRef}>{inputValue}</span>}
                        {allowClear ? renderOrder(suffix, 'input-clear') : renderOrder(suffix, 'input-suffix')}

                    </div>
                    {renderOrder(addAfter, 'input-addAfter')}
                </div>

            </div>

        </>
    )



}

export default Input

Input.defaultProps = {
    icon: 'coffee'
}


