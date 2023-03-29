import React from "react";
import { Message, createMessage, MessageProps, MessageType } from "./Message";
import Button from "../Button";
import { useState } from "react";
import Icon from "../Icon";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";
import { ButtonType } from "../Button/Button";


export default {
  title: 'Message 全局消息',
  component: Message,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const content: MessageProps = {
  className: 'coffect',
  top: '20px',
  duration: 3000,
  icon: <Icon color="#af6504 " icon={'coffee'} ></Icon>,
  content: <span>coffee</span>
}
const type : MessageType[] = ['warning','danger','success','info']
const duration : number[] = [1000,3000,5000]

const nData = type.map((item)=>{
  return {
    className: 'coffect',
    top: '20px',
    duration: 5000,
    MessageType: item,
    content: <span>{item}</span>
  }
})
const dData = duration.map((item)=>{
  return {
    className: 'coffect',
    top: '20px',
    duration: item,
    content: <span>{item}</span>,
  icon: <Icon color="#5b10e7 " icon={'bicycle'} ></Icon>
    
  }
})

const Template = (args: any) => {

  return (
    <div  >
      <Card title={RenderTitle('基础用法','createMessage( )(item)')}  >  
      {
       <Button
        style={{marginRight:'30px'}}
        onClick={() => createMessage()(content)}>Message
        </Button> 
      }
      </Card>
      <Card title={RenderTitle('四种不同状态','content.MessageType : warning | danger | success | info ')}  >  
       
      {
        nData.map((item)=><Button
        style={{marginRight:'30px'}}
        btnType={item.MessageType as ButtonType} onClick={() => createMessage()(item)}>
          {item.content}
        </Button>)
      }
      </Card>
      <Card title={RenderTitle('自定义Icon','content.icon')}  >  
      {
       <Button
        style={{marginRight:'30px'}}
        onClick={() => createMessage()(content)}>coffee
        </Button> 
      }
      </Card>
      <Card title={RenderTitle('设置持续时间','content.duration')}  >  
        
        {dData.map((item)=><Button
        style={{marginRight:'30px'}}
        onClick={() => createMessage()(item)}>{item.duration}
        </Button> )}
      </Card>

    </div>
  )
}



export const Component = Template.bind({})




