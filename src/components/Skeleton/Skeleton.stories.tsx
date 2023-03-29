import React, { useState } from "react";
import { Card } from "../Card/card";
import Skeleton from "./Skeleton";
import Button from "../Button";
import { RenderTitle } from "../../utils/renterTitle";
import { InputTag } from "../InputTag/InpuTag";
import Menu from "../Menu";
import { MenuItem } from "../Menu/MenuItem";


export default {
  title: 'Skeleton 骨架屏 ',
  component: Skeleton,
  argTypes: {

  },
  parameters: {
    docs: {
      page: null
    }
  },
};

const Template = (args: any) => {

  const [l, setl] = useState(true)
  return (
    <>


      <Card title={RenderTitle('基本使用', " row = 4 ; width = ['30%','100%','100%','100%']")}   >
        <Skeleton loading row={4} width={['30%', '100%', '100%', '100%']} />
      </Card>

      <Card title={RenderTitle('loading控制', 'loading')}   >
        <Button btnType='warning' onClick={() => setl(!l)}>切换 loading</Button>
        {
          !l ?
            <>
              <Menu>
                <MenuItem>Item1</MenuItem>
                <MenuItem>Item2</MenuItem>
                <MenuItem>Item3</MenuItem>
              </Menu>
              <br />
              <InputTag></InputTag>
              <br />

              <Menu>
                <MenuItem>Item1</MenuItem>
                <MenuItem>Item2</MenuItem>
                <MenuItem>Item3</MenuItem>
              </Menu>
            </>
            :
            <Skeleton loading={l} row={4} width={['30%', '100%', '100%', '100%']} />
        }
      </Card>
      <Card title={'img'}   >
        <Skeleton loading img />
      </Card>

    </>

  )
}



export const Component = Template.bind({})




