import React from "react";
import Button, { ButtonSize } from "./Button"
import '../../style/index.scss'
import { Card } from "../Card/card";
import Icon from "../Icon";
import { RenderTitle } from "../../utils/renterTitle";
import Select from "../Select";


export default {
    title: 'Button 按钮',
    component: Button,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
    parameters: { 
      docs: { 
        page: null 
      } 
    },
  };

  const Template = (args: any)=>{
    
   return (
     <div>

           <Card title={'默认的Button'} >
             <Button  style={{margin:'0 20px'}}  />
           </Card>  
           <Card         title={RenderTitle('不同大小的Button','size : lg | sm')} style={{width:'60%',display:'flex', }} >
             <Button  style={{margin:'0 20px'}}  size="sm" />
             <Button  style={{margin:'0 20px'}}  />
             <Button  style={{margin:'0 20px'}} size="lg" />
           </Card>  
           <Card         title={RenderTitle('不同状态的Button','btnType : primary | link | default | danger  | disabled')} style={{width:'100%',display:'flex', }} >
             <Button  style={{margin:'0 20px'}}  ></Button>
             <Button  style={{margin:'0 20px'}} btnType={'link'}  />
             <Button  style={{margin:'0 20px'}} btnType={'warning'} children={'warning'}  />
             <Button  style={{margin:'0 20px'}} btnType={'danger'} >danger</Button>
             <Button  style={{margin:'0 20px'}} disabled > disabled </Button>
           </Card>  
           <Card title={RenderTitle('不同形状的Button','shape : round | square | circle ')} style={{width:'100%',display:'flex', }} >
             <Button  style={{margin:'0 20px'}}  ></Button>
             <Button  style={{margin:'0 20px'}} btnType={'warning'} shape={'round'} ><Icon icon={'times'}></Icon></Button>
             <Button  style={{margin:'0 20px'}} btnType={'danger'} shape={'square'} ><Icon icon={'times'}></Icon></Button>
             <Button  style={{margin:'0 20px'}} shape={'circle'} ><Icon icon={'times'}></Icon></Button>
           </Card>
           </div>
   )
}

export const Component = Template.bind({})

