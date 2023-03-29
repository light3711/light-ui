import React from "react";
import '../../style/index.scss'
import Cascader from "./Cascaders";
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";

// interface honeyselectType{
//     value:string
//     number:number;
// }

const options = [
  {
    value: "1",
    label: "1",
    children: [
      {
        value: "1-1",
        label: "1-1",
        children: [
          {
            value: "1-1-1",
            label: "1-1-1",
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

export default {
  title: 'Cascader 次级联选 ',
  component: Cascader,
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
    <Card title={RenderTitle('基础用法','dataSource')} >
        <Cascader dataSource={options} />
    </Card>
    <Card title={RenderTitle('需要清除','allowClear')} >
        <Cascader  allowClear dataSource={options} />
    </Card>
    <Card style={{height:'200px'}} title={RenderTitle('inputTag模式','dataSource')} >
        <Cascader inputTag  />
    </Card>
     
    </>



  )
}





export const Component = Template.bind({})

