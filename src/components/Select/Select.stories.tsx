import React, { useEffect, useState } from "react";
import '../../style/index.scss'
import { Card } from "../Card/card";
import { Option, Select } from "./Select";
import Checkbox from "../Checkbox";
import { RenderTitle } from "../../utils/renterTitle";
import Tag from "../Tag/Tag";
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'ShenZhen'];


const SelectData = [
  { key: 'Lucy', value: 'Lucy', disabled: false },
  { key: 'Jack', value: 'Jack', disabled: false },
  { key: 'Tom', value: 'Tom', disabled: false },
  { key: 'disabled', value: 'disabled', disabled: true },

]
const selectData = SelectData.map((i)=>i.value)

export default {
  title: 'Select 选择器',
  component: Select,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};
const checkoptions = [
  {
    label: 'option 1',
    value: 'option 1',
  },
  {
    label: 'option 2',
    value: 'option 2',
  },
  {
    label: 'option 3',
    value: 'option 3',
  },
  {
    label: 'option 4',
    value: 'option 4',
  },
];

const renderTag = (onClose: any, inputElement, value: any) => {

  return (
    <Tag
      color={'purple'}
      key={value}
      onClose={(e) => onClose(e, value)}
      style={{
        margin: '3px 0', marginRight: '4px', marginLeft: 'none',
        height: `${inputElement?.offsetHeight * 0.75}px`,
        fontSize: `${inputElement?.clientHeight * 0.5}px`,
      }}
    >{value}
    </Tag>
  )
}

const Template = (args: any) => {

 
  const [d, setD] = useState([])
  
  function checkboxChange(value, event) {
    // console.log(e,v);
    setD(value)
  }

  function checkClear(e) {
    setD(d.filter((v) => v !== e))

  }

  function clear() {
    setD([])

  }
  

  return (
    <>
      <Card title={RenderTitle('基础用法')} style={{width:'400px'}}>
        <Select defaultValue={'Beijing'} >
          {options.map((option, index) => {
            return <Option key={option} >
              {option}
            </Option>
          })}
        </Select>
      </Card>
 
      <Card title={RenderTitle('允许创建','allowCreate')} style={{width:'400px'}}>
        <Select allowCreate  >
          {options.map((option, index) => {
            return <Option key={option} >
              {option}
            </Option>
          })}
        </Select>
      </Card>

      <Card title={RenderTitle('允许清除','allowClear | allowCreate')} style={{width:'800px',display:'flex',justifyContent:'space-around'}}>
        <Select allowClear allowCreate placeholder="允许清除 & 允许创建"
        style={{width:'350px'}}
        >
          {SelectData.map((option, index) => {
            return <Option key={option.value}
              {...option} >
              {option.value}
            </Option>
          })}
        </Select>
        <Select allowClear style={{width:'350px'}}  >
          {SelectData.map((option, index) => {
            return <Option key={option.value}
              {...option} >
              {option.value}
            </Option>
          })}
        </Select>
      </Card>

      <Card title={RenderTitle('结合InputTag使用','mode模式')} style={{width:'400px'}}>
        <Select mode allowClear allowCreate option={selectData} >
          {SelectData.map((option, index) => {
            return <Option key={option.value}
              {...option} >
              {option.value}
            </Option>
          })}
        </Select>
      </Card>
     

    </>


  )
}



export const Component = Template.bind({})

