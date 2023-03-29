import React from "react";
import { RenderTitle } from "../../utils/renterTitle";
import { Card } from "../Card/card";
import { Img } from "./Img";
import jpg1 from './img/1.jpg'
import jpg2 from './img/2.jpg'
import jpg3 from './img/3.jpg'
import jpg4 from './img/4.jpg'


export default {
    title: 'Img 图片展示',
    component: Img,
    argTypes: {
    
    },
    parameters: { 
      docs: { 
        page: null 
      } 
    },
  };


  const src =[
    {id:1,src:jpg1},
  ]
  const src2 =[
    {id:1,src:jpg2},
    {id:2,src:jpg1},
    {id:3,src:jpg3},
    {id:4,src:jpg4},
  ]


  const Template = (args: any)=>{
    
   return (
     <div>
       
    <Card title={RenderTitle('展示单张图片 点击图片🔍','src = [ { id , src } ]')} >
      <Img src={src}  ></Img>
    </Card>
    <Card title={`展示多张图片 点击图片🔍`} >
      <Img src={src2} ></Img>
    </Card>
    </div>
    
   )
}





export const Component = Template.bind({})



 
 