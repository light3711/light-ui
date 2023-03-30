import classNames from "classnames";
import React, {
  createContext,
  CSSProperties,
  ReactNode,
  ReactText,
  useContext, useEffect, useRef, useState
} from "react";
import { styleType } from "../../utils/type";

export interface CheckboxProps<T extends React.ReactText = any>
  extends Omit<React.HTMLAttributes<HTMLLabelElement>,
    'children' | 'className' | 'onChange'> {

  style?: CSSProperties;
  className?: string | string[];
  /**
   *   是否禁用
   */
  disabled?: boolean;
  /**
   *   是否选中
   */
  checked?: boolean;
  /**
   *  默认是否选中
   */
  defaultChecked?: boolean;
  /**
   *  半选状态
   */
  indeterminate?: boolean;
  /**
   *   点击复选框的回调
   */
  onChange?: (checked: boolean | boolean[], e?: Event) => void;
  /**
   * 复选框的 value 属性
   */
  value?: T;
  // checkboxGroupValue?: T[];
  // onGroupChange?: (value: T, checked: boolean) => void;
  children?: any
}

export interface CheckboxGroupContext {
  checkChange: (value?: ReactText, checked?: boolean) => void
}
export const defaultCheckboxGroupContext = {
  checkChange: () => { }
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext>(defaultCheckboxGroupContext);


/**
 * 可通过复选框选择一个或多个数据
 * ### 引用方法
 * 
 * ~~~js
 * import { Checkbox } from "@light3711/lightui"
 * ~~~
 */
const Checkbox = <T extends React.ReactText>(props: CheckboxProps<T>, ref: any) => {


  const { children, defaultChecked = false, value, } = props;

  const [_checked, setcheckedValue] = useState<boolean>(defaultChecked);

  const inputRef = useRef(null);

  const { checkChange } = useContext(CheckboxGroupContext);
  useEffect(() => {
    props.checked ? setcheckedValue(props.checked) : setcheckedValue(defaultChecked);
  }, [props.checked]);

  const handleCheckboxChange = function (e) {
    setcheckedValue(e.target.checked);
    checkChange && checkChange(value, e.target.checked);
    props.onChange && props.onChange(e.target.checked, e);
  };
  const cx = classNames('lig-checkbox', {
    'disabled': props.disabled,
  })

  return (
    <label className={cx} >
      <input
        type="checkbox"
        disabled={props.disabled}
        ref={inputRef}
        checked={_checked}
        onChange={handleCheckboxChange}
        value={value}
      />
      <span >{children}</span>
    </label>
  );
}

interface GroupProps extends styleType, Pick<CheckboxProps, 'onChange' | 'disabled'> {
  defaultValue?: any
  options?: any
  direction?: 'horizontal' | 'vertical'
  value?: any
}

function Group(props: GroupProps) {
  const { options, className, direction } = props;

  const [gValue, setgroupValue] = useState([]);

 
  const checkChange = (value, checked: boolean) => {

    if (checked && !gValue.includes(value)) {
      setgroupValue([...gValue, value]);
      props.onChange && props.onChange([...gValue, value])

    }
    if (!checked && gValue.includes(value)) {
      setgroupValue(gValue.filter((item) => item !== value));
      props.onChange && props.onChange(gValue.filter((item) => item !== value))
    }

  }

  useEffect(() => {
    props.value && setgroupValue(props.value)
  }, [props.value])

  const cx = classNames('checkbox-Group', {
    [`${direction}`]: direction
  }, className)
  return (
    <div className={cx} >
      <CheckboxGroupContext.Provider
        value={{ checkChange: checkChange }}
      >
        {options.map((item) => {
          return (
            <Checkbox
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              checked={gValue.includes(item.value)}
            >
              {item.label}
            </Checkbox>
          );
        })}
      </CheckboxGroupContext.Provider>
    </div>
  );

}
Checkbox.Group = Group

export default Checkbox






















