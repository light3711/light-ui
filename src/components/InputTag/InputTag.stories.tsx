import React, {  useState } from "react";
import { InputTag, } from "./InpuTag";
import { Card } from "../Card/card";
import Tag from "../Tag/Tag";
import { RenderTitle } from "../../utils/renterTitle";
import { createMessage } from "../Message/Message";
import Select from "../Select";
import Checkbox from "../Checkbox";

export default {
  title: 'InputTag 标签输入',
  component: InputTag,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const renderTag = (onClose: any, inputElement, value: any) => {

  return (
    <Tag
      color={['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan'].
        indexOf(value) > -1 ? value : 'blue'}
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

  const [newValue, setValue] = useState(null)
  const [d,setD] = useState([])

  function checkClear(e){
      setD(d.filter((v)=> v!== e))
  }

  function clear (){
    setD([])

  }

  function checkboxChange(value,event){
    setD(value)
  }
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
    },]

  return (
    <div  >
      <Card title={RenderTitle('基础用法')}   >
        <InputTag tagColor={'blue'} style={{ width: '400px' }} />
      </Card>
      <Card title={RenderTitle('自定义tagRender节点', 'renderTag , 色板 : ligDesignColor')}   >
        <InputTag renderTag={renderTag} value={['blue', 'orange', 'red']} style={{ width: '400px' }} />
      </Card>
      <Card title={RenderTitle('受控 / 非受控', 'value : string[ ] ')}   >
        <InputTag tagColor={'blue'} onChange={(value) => {
          createMessage()({ content: (value as string[]).map((v) => <span key={v}>{v},</span>) })
        }} value={newValue} style={{ width: '400px' }} />
      </Card>
      <Card title={RenderTitle('获取节点value', 'onChange(value, e, focus)')}   >
        <InputTag tagColor={'blue'} style={{ width: '400px' }} />
      </Card>
      <Card title={RenderTitle('组合使用')} style={{height:'300px'}}  >
        <Select
          allowClear
          mode
          option={d}
          placeholder={'点击添加'}
          onClear={() => clear()}
          onClose={(e) => checkClear(e)}
        >
          <Checkbox.Group className={'select-checkbox'} onChange={(v, e) => { checkboxChange(v, e) }} value={d} options={checkoptions}>
          </Checkbox.Group>
        </Select>
      </Card>

    </div>
  )
}



export const Component = Template.bind({})




