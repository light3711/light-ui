import React from "react";
import BackTop from ".";
import { RenderTitle } from "../../utils/renterTitle";
import { Card } from "../Card/card";
import Icon from "../Icon";


export default {
    title: 'BakcTop 回到顶部 ',
    component: BackTop,
    argTypes: {
    
    },
    parameters: { 
      docs: { 
        page: null 
      } 
    },
  };

  
  const backOnclick = ()=>{
    
  }

  const Template = (args: any)=>{
    
   return (
    <Card title={RenderTitle('基础用法','visibilityHight : 滚动到此参数值才会出现BackTop')}>
      <div className='BackTop-content' >
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
      <Icon icon={'arrow-down'} size="5x" ></Icon>
     <BackTop onClick={backOnclick}>
     <div className='lig-BackTop'  >
     <div className='Back-Icon' >
     <Icon icon={'arrow-up'} size='2x' ></Icon>
     </div>

    </div>
     </BackTop>
    </div> 
    </Card>
   )
}
 
export const Component = Template.bind({})



 
 