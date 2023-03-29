import React, { useState } from "react";
import { Pagination } from "./Pagination";
// import Pagination from "./Pagination copy";
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";


export default {
  title: 'Pagination 分页 ',
  component: Pagination,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const selectOption = [1,10, 20, 30, 50]


const Template = (args: any) => {
  const [pagesize, setPageSize] = useState(10)

  return (
    <div style={{height:'800px'}}  >
      
      <Card title={RenderTitle('基础用法',`数据总量 : total${'\u00A0\u00A0'} & ${'\u00A0\u00A0'}初始页 : currentPage `)}   >
        <Pagination total={50} currentPage={5}   />
      </Card>
      <Card title={RenderTitle(' 输入框跳转','inputJumper')}   >
        <Pagination total={20} inputJumper />
      </Card>
      <Card title={RenderTitle('选择器跳转','selectJumperOption')}   >
        <Pagination total={50}  pageSize={pagesize}  selectJumperOption={selectOption} />
      </Card>
      <Card title={RenderTitle('每页数据量','pageSize = 10')}   >
        <Pagination total={50} pageSize={pagesize}   />
      </Card>
      
      <Card title={RenderTitle('数据量选择器','pageSize & pageSelectOption')}   >
        <Pagination total={50} pageSize={pagesize} onClick={(e)=>{console.log(e);
        }} pageSelectOption={selectOption} />
      </Card>
      <Card title={RenderTitle('mini模式 , 空间有限时使用','将mini设置为true')} style={{height:'200px'}}  >
        <Pagination mini total={5}   />
      </Card>
    </div>
  )
}



export const Component = Template.bind({})




