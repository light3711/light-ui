import React, { useState } from "react";
import '../../style/index.scss'
import { Card } from "../Card/card";
import Icon from "../Icon";
import Input from "./Input";
import Select from "../Select";
import { Option } from "../Select/Select";
import { RenderTitle } from "../../utils/renterTitle";

export default {
  title: 'Input 输入框',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    docs: {
      // page: null 
    }
  },
};



const Template = (args: any) => {

  const [a,seta] = useState('text')

  const [value,setValue] = useState('')
  function onchange(value, e) {
    setValue(value)
  }
  console.log(value);
  

  return (
    <div>
      <Card title={RenderTitle('基础用法','type : text | password')} style={{width: '30rem' ,display:'flex'}} > 
      <Input {...args} 
      style={{width: '20rem'}}
      value={value}
      placeholder={'自定义placeholder'}
      onChange={(value) => onchange(value, 'username')} type={a}  ></Input>
      <Select style={{marginLeft:'10px'}} defaultValue={a} onChange={(e)=>seta(e as string)} >
        <Option>password</Option>
        <Option>text</Option>
      </Select>
      </Card>
      <Card title={RenderTitle('允许清除','allowClear')}  style={{width: '30rem' ,display:'flex'}} > 
      <Input {...args}  allowClear
      onChange={(value) => onchange(value, 'username')} type={a}  ></Input>
       
      </Card>

      <Card title={RenderTitle('前后缀','prefix & suffix')} style={{width: '30rem'}} > 
      <Input
          onChange={onchange}
          prefix={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'code'}></Icon>}
        ></Input>
        <div style={{margin:'30px'}} />
        <Input
          onChange={onchange}
          suffix={<Icon style={{ color: '#adb5bd' }} icon={'info'}></Icon>}
          prefix={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'code'}></Icon>}
        ></Input>
        <div style={{margin:'30px'}} />
         <Input
          onChange={onchange}
          addBefore={<div>www.</div>}
          addAfter={<div>.com</div>}
          suffix={<Icon style={{ color: '#adb5bd' }} icon={'info'}></Icon>}
          prefix={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'code'}></Icon>}

        ></Input>
      </Card>

      <Card title={RenderTitle('前后置标签','addBefor & addAfter')} style={{width: '30rem'}}  >
        <br style={{ margin: '20px' }} />
        <Input
          allowClear
          onChange={onchange}
          addAfter={<Icon icon={'search'} color='#495057'></Icon>}
        ></Input>
        <div style={{margin:'30px'}} />
        <Input
          onChange={onchange}
          addBefore={<div>www.</div>}
          addAfter={<div>.com</div>}
          suffix={<Icon style={{ color: '#adb5bd' }} icon={'info'}></Icon>}
          prefix={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'code'}></Icon>}

        ></Input>
        <div style={{margin:'30px'}} />

        <Input
          onChange={onchange}
          addBefore={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'angle-double-down'}></Icon>}
          addAfter={<Icon size={'1x'} style={{ color: '#adb5bd' }} icon={'coffee'}></Icon>}

        ></Input>
      </Card>
      <Card title={' '} >

      </Card>

    </div>
  )
}


export const Component = Template.bind({})





