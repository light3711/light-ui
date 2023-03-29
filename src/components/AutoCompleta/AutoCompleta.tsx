import React, { FC, useState, ChangeEvent, KeyboardEvent, useEffect, ReactElement, useRef } from "react";
import Icon from "../Icon";
import { InputProps } from "../Input/Input";
import useDebounce from "../../hooks/useDeboun";
import Select from "../Select";
import { Option } from "../Select/Select";
import useOnClickOutside from "../../hooks/useOnclickOutside";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * 
     * @fetchSuggestion 异步结果
     */
    fetchSuggestion?: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
    onSelect?: (item: DataSourceType) => void
    /**
     * @dataSource 数据源
     */
    dataSource?: any[]
}

export interface DataSourceObject {
    value: string
    number: number
}

export type DataSourceType<T = {}> = & DataSourceObject


/**
 * 输入框或自定义输入控件的自动补全功能。
 * 
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoCompleta } from "@light3711/lightui"
 * ~~~
 */

export const AutoCompleta: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestion, onSelect, value,  dataSource } = props
    const [InputVlaue, setInputValue] = useState(value as string)

    const [suggestion, setSugestions] = useState<DataSourceType[]>([])
    const [Loading, setLoading] = useState(false)
    const [heightLightIndex, setHeightLightIndex] = useState(-1)

    const SeachRef = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(InputVlaue, 300) //防抖

    
    useOnClickOutside(componentRef, () => { setSugestions([]) })

    useEffect(() => {
        if (fetchSuggestion && debounceValue && SeachRef.current) {
            const results = fetchSuggestion(debounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSugestions(data)
                })
            }
            else {
                setSugestions(results)
            }

        } else {
            setSugestions([])
        }
        setHeightLightIndex(-1)
    }, [debounceValue])

    useEffect(() => { })

    const handleChange = (e) => {
         
        setInputValue(e)
        SeachRef.current = true
        props.onChange && props.onChange(e)
    }

    function onMouse(e) {
        setHeightLightIndex(e)
    }


    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSugestions([])
        if (onSelect) {
            onSelect(item)
        }
        SeachRef.current = false
    }


    const heightLight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestion.length) {
            index = suggestion.length - 1
        }
        setHeightLightIndex(index)
    }
 

    return (
        <>
            <Select
                placeholder={props.placeholder}
                className="lig-autoComplete"
                value={InputVlaue}
                allowChange
                allowClear={props.allowClear}
                suffix={<Icon icon='spinner' color={Loading ? '#0d6efd' : 'transparent'}
                className="auto-loading" spin />}
                onChange={handleChange} 
                style={props.style}
                >
                {fetchSuggestion && !dataSource && suggestion?.map((item, index) => {

                    return (
                        <Option
                            onMouseEnter={() => onMouse(index)}
                            onMouseLeave={() => onMouse(index)}
                            onClick={() => handleSelect(item)} key={index} >
                            {item.value}
                        </Option>
                    )
                })
                    
                    }
            </Select>
        </>
    )
}


export default AutoCompleta;