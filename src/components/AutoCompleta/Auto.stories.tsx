import React, {  useState } from "react";
import AutoCompleta from "./AutoCompleta";
import '../../style/index.scss'
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";

export default {
    title: 'AutoCompleta 自动完成 ',
    component: AutoCompleta,
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

  const [inputValue,setInputValue] = useState('')
 
  const select1 = [{value:'Api err'}] //备用数组

    const handleFetch =  (e:string)=>{
        return fetch(`https://api.github.com/search/users?q=${e}`)
        .then(res=>res.json())
        .then(({items})=>{
            return items ? 
            items.slice(0,10).map((item:any)=>({value:item.login,...item})) : 
            select1.slice(0,10).map((item:any)=>({value:item.login,...item}))
        })
    }
   return (
       <div style={{height:'500px'}} >
       
        <Card title={RenderTitle('异步加载','fetchSuggestion')}>
        <AutoCompleta  
        placeholder="数据来自github"
        fetchSuggestion={handleFetch}
        style={{width:'300px'}}

        />
        </Card>
        <Card title={RenderTitle('需要清除','allowClear')}>
        <AutoCompleta 
        onChange={(e)=>setInputValue(e as string)} 
        fetchSuggestion={handleFetch}
        value={inputValue}
        allowClear
        style={{width:'300px'}}

        />
 
        </Card>
        <Card title={RenderTitle('支持键盘事件','onKeyDown')} style={{height:'300px'}}>
        <AutoCompleta 
        onChange={(e)=>setInputValue(e as string)} 
        fetchSuggestion={handleFetch}
        value={inputValue}
        allowClear
        style={{width:'300px'}}

        />
 
        </Card>
       </div>
   )
}



export const Component = Template.bind({})



 