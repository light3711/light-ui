import React, { useEffect, useRef, useState}  from "react";
import { RenderTitle } from "../../utils/renterTitle";
import Button from "../Button";
import { Card } from "../Card/card";
import Icon from "../Icon";
import { createMessage, MessageProps } from "../Message/Message";
import Tag ,{ligDesignColor} from "./Tag";

export default {
  title: 'Tag 标签',
  component: Tag,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};


const colors:ligDesignColor[] = ['blue',  'purple', 'pink', 'red', 'orange', 'yellow', 'green','teal','cyan']

const Template = (args: any) => {

  const [state, setState] = useState('')

  const onChange = (checked: any, context: any) => {
    console.log(checked, context);
  }

  const inputRef = useRef(null)
  const onfocus = ()=>{
     inputRef.current.focus()
  }


  return (
    <>
    {/* {tags.map((v,i)=>{
      return (
        <Tag key={i} >
          {v}
        </Tag>
      )
    })} */}
     
      <Card title={RenderTitle('基础用法','色板 : ligDesignColor')} style={
        {display:'flex',flexWrap:'wrap' }} >
        {colors.slice(0,3).map((v, i) => {
          return (<>
            <Tag 
            style={{margin:'5px'}}
            color={v} border={false} 
            key={v}>{v}</Tag>
            </>
          )
        })}
 
      </Card>
      <Card title={RenderTitle('不需要关闭功能','allowClose 设置为 false')} style={
        {display:'flex',flexWrap:'wrap' }} >
        {colors.map((v, i) => {
          return (<>
            <Tag 
            allowClose={false}
            style={{margin:'5px'}}
            color={v} border={false} 
            key={v}>{v}</Tag>
            </>
          )
        })}
        
      </Card>
      <Card title={RenderTitle('带图标的标签','icon')}  >
      <div style={
      {display:'flex',flexWrap:'wrap' }}>
      {colors.slice(0,3).map((v, i) => {
          return (<>
            <Tag 
            style={{margin:'5px'}}
            color={v} icon={<Icon icon={'coffee'}></Icon>} border key={i}>{v}</Tag>
            </>
          )
        })}
      </div>
      </Card>
      <Card title={RenderTitle('异步关闭','onclose 返回 异步结果')} style={
        {display:'flex',flexWrap:'wrap' }} >
        {colors.map((v, i) => {
          return (<>
            <Tag 
            style={{margin:'5px'}}
            color={v} border={false} 
            onClose={() => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (Math.random() >= 0.5) {
                    resolve(1);
                  } else {
                    reject();
                  }
                }, 3000);
              });
            }}
            key={i}>{v}</Tag>
            </>
          )
        })}
      </Card>
    </>
    
  )
}

export const Component = Template.bind({})






