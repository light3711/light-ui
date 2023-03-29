import classNames from "classnames";
import React, { useState } from "react";
import { useEffect } from "react";
import { defaultType, styleType } from "../../utils/type";
import { Icon } from '../Icon/Icon'
import { InputProps } from "../Input/Input";
import Select from "../Select";


interface CarcaderData {
  value: string
  label: string
  children?: CarcaderData[]
}



interface CarcaderProps extends styleType, Pick<InputProps, 'placeholder' | 'onChange' | 'allowClear'> {
  /**
   * @dataSource 数据源
   */
  dataSource?: CarcaderData[]
  disabled?: boolean
  /**
   * @inputTag 开启inputTag模式
   */
  inputTag?: boolean
}
const options = [
  {
    value: "广东",
    label: "广东",
    children: [
      {
        value: "广州",
        label: "广州",
        children: [
          {
            value: "海珠",
            label: "海珠",
          },
        ],
      },
    ],
  },
  {
    value: "佛山",
    label: "佛山",
    children: [
      {
        value: "禅城",
        label: "禅城",
        children: [
          {
            value: "祖庙",
            label: "祖庙",
          },
        ],
      },
    ],
  },
];

/**
 * 指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔
 * ### 引用方法
 * 
 * ~~~js
 * import { Cascader } from "@light3711/lightui"
 * ~~~
 */

export const Cascader: React.FC<CarcaderProps> = (props) => {
  const { disabled, className, dataSource, placeholder, onChange } = props
  const _dataSource = props.dataSource ? props.dataSource : options

  const [firstOption, setFirseOption] = useState<CarcaderData[]>([])
  const [otherOption, setOtherOption] = useState<any[]>([])
  const [SelectValue, setSelectValue] = useState<string[]>([])
  const [clear, setClear] = useState(false)


  const cx = classNames('lig-cascader', className, {
    'disabled': disabled === false,
  })



  useEffect(() => {
    if (dataSource?.length) {
      setFirseOption(getOptionArr(dataSource))
    } else {
      setFirseOption(_dataSource)
    }
  }, [dataSource])


  const getOptionArr = function (
    option: Array<CarcaderData>): Array<CarcaderData> {
    return option.map((opt) => {
      const item: CarcaderData = {
        label: opt.label,
        value: opt.value,
        children: opt.children || [],
      };
      return item;
    });
  };


  const handleSelectOption = (e: CarcaderData, i: number) => {
    let nowSelectValue
    let currentLabel = e.label
    let firstFilterLabel = firstOption.map((e) => e.label)

    if (firstFilterLabel.includes(currentLabel)) {
      e.children && setOtherOption([e.children])
      setSelectValue([e.value])
    } 
    else {
      let nowSelectOption = otherOption.slice(0, i)
      e.children && nowSelectOption.push(e.children)
      setOtherOption(nowSelectOption)
      nowSelectValue = SelectValue.splice(0, i)
      nowSelectValue.push(e.value )
      setSelectValue(nowSelectValue)
    }
    if (!e.children) {
      onChange?.(nowSelectValue)
    }
  }

  return (

    <>
      <Select
        value={SelectValue}
        placeholder={placeholder}
        mode={props.inputTag}
        option={SelectValue}
        allowClear={props.allowClear}
        className={cx}
        onClear={() => {
          setClear(true)
          setOtherOption([])
        }}
        listStyle={{
          width: 'fit-content', display: 'flex'
        }}>
        <div className="cascader-wrapper">
          {
            firstOption.map((item, index) => {
              return <div key={item.value} className={
                `${!clear && SelectValue.includes(item.value) ?
                  'cascader-first active' : 'cascader-first'}`} onClick={() => {
                    setClear(false)
                    handleSelectOption(item, 0)
                  }
                  }  >
                <div className="first-value"
                > {item.label} </div>
                <div className="first-icon"><Icon color="#418dff" icon={'angle-right'}></Icon></div>
              </div>
            })

          }
        </div>
        <div className="cascader-wrapper" style={{ display: 'flex' }}>
          {otherOption.map((item, index) => {
            return <div key={index} className="cascader-content"
            >
              <div className='cascader-content-item' >
                {item?.map((item: CarcaderData) => {
                  return (
                    <div className={`${SelectValue.includes(item.value) ? ' cascader-item-span active' : 'cascader-item-span'}`} onClick={() => handleSelectOption(item, index + 1)} >
                      <div className="first-value"
                      > {item.label} </div>
                      <div className="first-icon"><Icon color="#418dff" icon={'angle-right'}></Icon></div>
                    </div>
                  )
                })}
              </div>
            </div>
          })}
        </div>


      </Select>
    </>

  )
}



export default Cascader

