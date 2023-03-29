import React from "react";
import { Card } from "../Card/card";
import  {Transfer}  from "./Transfer";
import { RenderTitle } from "../../utils/renterTitle";
import Icon from "../Icon";
import Button from "../Button";


export default {
  title: 'Transfer 穿梭框 ',
  component: Transfer,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const sourceArr = new Array(20).fill(null).map((item,index)=>({
  key : `${index+1}`,
  title : `title${index+1}`
}))
 
 

const Template = (args: any) => {

  return (
    <>


      <Card title={RenderTitle('基础用法','注入 dataSource')}   >
        <Transfer dataSource={sourceArr}   /> 
      </Card>
      <Card title={RenderTitle('分页模式','将pagination设置为true')}>
      <Transfer dataSource={sourceArr}  pagaintion pageSize={10} /> 
      </Card>
      <Card title={RenderTitle('自定义按钮','sourceBtn & targetBtn')}>
      <Transfer
      sourceBtn={
        <Button> to right <Icon icon={'angle-right'}></Icon></Button>
      }
      dataSource={sourceArr} 
       pagaintion pageSize={10} 
      targetBtn={<Button><Icon icon={'angle-left'}></Icon> to left </Button>
    }
      /> 
      </Card>
      <Card title={RenderTitle('自定义标题','sourceTitle & targetTitle')}>
      <Transfer
       dataSource={sourceArr} 
       pageSize={10} 
       targetTitle={'右边'}
       sourceTitle={'左边'}
      /> 
      </Card>


    </>

  )
}



export const Component = Template.bind({})




