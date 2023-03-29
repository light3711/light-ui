import React,{RefAttributes,forwardRef} from "react";
import Tag from "../components/Tag/Tag";

 
export  function RenderTitle(title,api?:string){
    return(
      <>
      <div style={{color:'gray'}}>{title}</div>
      <div style={{marginRight:'10px'}}></div>
      {api && <Tag size="mini" allowClose={false} color={'blue'}> {api} </Tag>}
      </>
    )
  }