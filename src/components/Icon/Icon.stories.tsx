import React from "react";
import '../../style/index.scss'
import { Card } from "../Card/card";
import {Icon} from "./Icon";

export default {
    title: 'Icon 图标',
    component: Icon,
    argTypes: {
    
    },
    parameters: { 
      docs: { 
        page: null 
      } 
    },
  };

  const Template = (args: any)=>{
    
   return (
    <>
      <Card title={'Icon'} >
      <><div className="storyIcon" >
           <Icon  icon={'spinner'}/>
           <Icon  icon={'credit-card'}/>
           <Icon  icon={'reply'}/>
           <Icon  icon={'plus'}/>
           <Icon  icon={'accusoft'}/>
           <Icon  icon={'file'}/>
           <Icon  icon={'star'}/>
           <Icon  icon={'heart'}/>
           <Icon  icon={'usb'}/>
           <Icon  icon={'angellist'}/>
           <Icon  icon={'backward'}/>
           <Icon  icon={'mars'}/>
           <Icon  icon={'eject'}/>
           <Icon  icon={'plane'}/>
           <Icon  icon={'car'}/>
           <Icon  icon={'tty'}/>
           <Icon  icon={'bicycle'}/>
       </div>
<span> 更多样式前往<a href="https://fontawesome.dashgame.com/"> FontAwesomeIcon </a> </span>
</>
      </Card>
       </>
   )
}



export const Component = Template.bind({})



 
 