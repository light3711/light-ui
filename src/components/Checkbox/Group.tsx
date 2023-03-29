import classNames from "classnames";
import { isArray, isObject } from "lodash";
import React, { createContext, CSSProperties, PropsWithChildren, ReactNode, ReactText, useCallback, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useMergeValue } from "./Checkbox";


export interface CheckboxGroupProps<T extends React.ReactText> {
    style?: CSSProperties;
    className?: string | string[];
    children?:any
    disabled?: boolean;
    /**
     * @direction 方向
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * @defaultValue 默认选中的选项
     */
    defaultValue?: T[];
    /**
     * @options 可选项
     */
    options?: (T | { label: ReactNode; value: T; disabled?: boolean })[];
    /**
     * @value 受控模式
     */
    value?: T[];
    /**
     * @onChange 回调函数
     */
    onChange?: (value: T[], e: Event) => void;
  }
  
const defaultContextValue = {
    isCheckboxGroup: false,
    checkboxGroupValue: [],
    onGroupChange: () => { },
    registerValue: () => { },
    unRegisterValue: () => { },
};
export const CheckboxGroupContext = createContext<{
    disabled?: boolean;
    isCheckboxGroup: boolean;
    onGroupChange: (_optionValue, _checked: boolean, e: Event) => void;
    checkboxGroupValue: ReactText[];
    registerValue?: (value: ReactText) => void;
    unRegisterValue?: (value: ReactText) => void;
}>(defaultContextValue);


const Group = <T extends React.ReactText>(props:CheckboxGroupProps<T>
    //PropsWithChildren本身封装了 children 的类型声明
     ) => {

    const { children, disabled, className, options, direction = 'horizontal',   } = props

    const [value, setValue] = useMergeValue([], {
        defaultValue: 'defaultValue' in props ? props.defaultValue || [] : undefined,
        value: 'value' in props ? props.value || [] : undefined,
    });

    const [allOptionValues, setAllOptionValues] = useState([]);

    const cx = classNames('checkbox-Group', className, {
        [`${direction}`]: direction,
    })

   const onChange = useCallback(
    (optionValue, checked: boolean, e: Event) => {

        const newVal = value.slice();
      if (checked) {
        newVal.push(optionValue);
      } else {
        newVal.splice(value.indexOf(optionValue), 1);
      }

      setValue(newVal);

      props.onChange &&
        props.onChange(
          newVal.filter((v) => allOptionValues.indexOf(v) > -1),
          e
        );
    },
    [value, props.onChange, allOptionValues]
  );


    return (
        <span className={cx} style={props.style}>
            <CheckboxGroupContext.Provider
                value={{
                    isCheckboxGroup: true,
                    checkboxGroupValue: value,
                    onGroupChange: onChange,
                    disabled,
                    registerValue: (value) => {
                        setAllOptionValues((all) => {
                            return Array.from(new Set([...all, value]))
                        })
                    },
                    unRegisterValue: (value) => {
                        setAllOptionValues((all) => {
                            return all.filter((x) => x !== value)
                        })
                    }
                }}
            >
                {isArray(options)
                    ? options.map((option) => {
                        const label = isObject(option) ? option.label : option;
                        const checkValue = isObject(option) ? option.value : option;
                        return (
                            <Checkbox
                                disabled={disabled || (isObject(option) && option.disabled)}
                                key={checkValue}
                                value={checkValue}
                            >
                                {label}
                            </Checkbox>
                        )
                    }) : children
                }
            </CheckboxGroupContext.Provider>
        </span>
    )


}

Group.displayName = 'CheckboxGroup'

export default Group