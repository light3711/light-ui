import React from "react";
import { Rate } from "./Rate";
import Icon from "../Icon";
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";


export default {
  title: 'Rate 评分 ',
  component: Rate,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const Template = (args: any) => {

  return (
    <>
      

      <Card title={RenderTitle('基础用法','count = 10 & value = 3')} >
      <Rate  count={10} value={3} onClick={(e) => console.log(e)} ></Rate>
      </Card>

      <Card  title={RenderTitle('只读，无法进行鼠标交互','readOnly')} >
      <Rate count={5} readOnly ></Rate>
      </Card>

     <Card title={RenderTitle('可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文','chidren')} >
     <div>
          <Rate count={12}>A</Rate>
          <br />
          <Rate count={10} style={{fontSize:'20px',color:'#0d6efd'}}>田</Rate>
          <br />
          <Rate count={12}><Icon icon={'bicycle'}></Icon></Rate>
        </div>
     </Card>


    </>

  )
}



export const Component = Template.bind({})




