import classNames from "classnames";
import { isFunction, isUndefined } from "lodash";
import React, {
  CSSProperties,
  ReactNode,
  ReactText,
   useCallback, useContext, useEffect, useRef, useState
} from "react";
import Group from "./Group";
import { CheckboxGroupContext } from "./Group";

export interface CheckboxProps<T extends React.ReactText = any>
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, 'children' | 'className' | 'onChange'> {
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
  onChange?: (checked: boolean, e: Event) => void;
  /**
   * 复选框的 value 属性
   */
  value?: T;
  checkboxGroupValue?: T[];
  onGroupChange?: (value: T, checked: boolean) => void;
  isCheckboxGroup?: boolean;
  children?: ReactNode | ((value: { checked: boolean; indeterminate: boolean }) => ReactNode);
}

export function useMergeValue<T>(defaultStateValue: T, props) {
  const { defaultValue, value } = props || {};
  const firstRenderRef = useRef(true);

  const [stateValue, setStateValue] = useState<T>(
    !isUndefined(value) ? value : !isUndefined(defaultValue) ? defaultValue : defaultStateValue);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    if (value === undefined) {
      setStateValue(value);
    }
  }, [value]);

  const mergedValue = isUndefined(value) ? stateValue : value;

  return [mergedValue, setStateValue, stateValue];
}


export interface CheckboxGroupContext {
  disabled?: boolean
  isCheckboxGroup: boolean
  onGroupChange: (_optionValue, _checked: boolean, e: Event) => void
  checkboxGroupValue: ReactText[];
  registerValue: (value: ReactText) => void;
  unRegisterValue: (value: ReactText) => void;
}


/**
 * 可通过复选框选择一个或多个数据
 * ### 引用方法
 * 
 * ~~~js
 * import { Checkbox } from "@light3711/lightui"
 * ~~~
 */
const Checkbox = <T extends React.ReactText>(props: CheckboxProps<T>, ref: any) => {


  const context = useContext(CheckboxGroupContext)
  const { onGroupChange } = context
  const _props = { ...props }

  if (context.isCheckboxGroup) {
    _props.checked = context.checkboxGroupValue.indexOf(props.value) !== -1
    _props.disabled = 'disabled' in props ? props.disabled : context.disabled
  }
  const { disabled, indeterminate, className, value } = _props

  const [checked, setChecked] = useMergeValue(false, {
    value: _props.checked,
    defaultValue: _props.defaultChecked
  })

  const cx = classNames('lig-checkbox', {
    'disabled': !!disabled,
    'indeterminate': !!indeterminate,
    'checked': checked,
  }, className)

  useEffect(() => {
    context.registerValue(value)

    return () => {
      context.unRegisterValue(value)
    }

  }, [value])

  const onChange = useCallback((e) => {
    e.persist();
    e.stopPropagation();
    setChecked(e.target.checked);
    if (context.isCheckboxGroup) {
      onGroupChange && onGroupChange(props.value, e.target.checked, e);
    }
    props.onChange && props.onChange(e.target.checked, e);

  }, [onGroupChange, context.isCheckboxGroup, props.onChange, props.value])

  return (
    <label className={cx}>
      <input
        type={'checkbox'}
        value={value}
        checked={!!checked}
        disabled={!!disabled}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
      <span >{props.children ? props.children : 'checkbox'}</span>
    </label>
  )

}



interface ForwardRefCheckboxType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<unknown>
  > {
  <T extends React.ReactText = any>(
    props: React.PropsWithChildren<CheckboxProps<T>> & {
      ref?: React.Ref<unknown>;
    }
  ): React.ReactElement;
  Group: typeof Group;
  // useCheckbox: typeof useCheckbox;
}
const CheckboxComponent = React.forwardRef(Checkbox) as ForwardRefCheckboxType

CheckboxComponent.displayName = 'Checkbox'
CheckboxComponent.Group = Group
// CheckboxComponent.useCheckbox = useCheckbox


export default CheckboxComponent





















