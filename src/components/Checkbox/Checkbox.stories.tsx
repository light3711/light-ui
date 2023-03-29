import React, { useEffect, useState } from "react";
import { RenderTitle } from "../../utils/renterTitle";
import Button from "../Button";
import { Card } from "../Card/card";
import Icon from "../Icon";
import { createMessage, MessageProps } from "../Message/Message";
import Tag from "../Tag/Tag";
import Checkbox from "./Checkbox";
const options = [
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

export default {
  title: 'Checkbox 多选框 ',
  component: Checkbox,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const Template = (args: any) => {

  const [state, setState] = useState({ checked: false, context: {} })
  const [disabled, setDisabled] = useState(true);
  const [city, setCity] = useState([]);
  const [w,setw] = useState([])

  useEffect(()=>{
    setCity(options)
  },[])
  const content: MessageProps = {
    className: 'coffect',
    top: '20px',
    duration: 3000,
    icon: !state.checked ? <Icon icon={'star'} /> : <Icon icon={'bicycle'} />,
    content: <span> {(!state.checked).toString()}</span>
  }

  const onChange = (checked: any, context: any) => {
     
     
  }

  return (
    <>

      <Card title={'基础用法'}  >
        <Checkbox onChange={onChange} value={true} >😋</Checkbox>
      </Card>

      <Card  title={RenderTitle('禁用多选框', 'disabled')}   >
        <Checkbox onChange={onChange} disabled={disabled}
        >disabled</Checkbox>
        <br />
        <Button
          btnType={disabled ? 'primary' : 'danger'}
          onClick={() => setDisabled(!disabled)}
        >切换 disabled</Button>
      </Card>

      <Card title={RenderTitle('多选框组合', '<CheckBox.Group> & options')}      >

        <Checkbox.Group
          direction={'horizontal'}
          onChange={onChange}
          options={options}
        />
        <br />
        <Tag color={'cyan'} size={'mini'} allowClose={false}>
          调整方向{'\u00A0\u00A0'}  direction =  horizontal{'\u00A0\u00A0'} | {'\u00A0\u00A0'}vertical
        </Tag>
        <br />
        <Checkbox.Group
          direction={'vertical'}
          onChange={onChange}
          options={options}
        />


      </Card>


      <Card title={RenderTitle('复选框组合', '<CheckBox.Group> & options')}
        
      >
        <Checkbox onChange={onChange} >全选</Checkbox>
        <br />
        
        <Checkbox.Group
          direction={'horizontal'}
          onChange={onChange}
          options={options}
        />

      </Card>



    </>

  )
}

export const Component = Template.bind({})






