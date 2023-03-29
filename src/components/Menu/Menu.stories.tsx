import React from "react";
import Menu from "./Menu"
import { MenuItem } from "./MenuItem"
import SubMenu from "./Submenu"
import { Card } from "../Card/card";
import Icon from "../Icon";
import { RenderTitle } from "../../utils/renterTitle";

export default {
  title: 'Menu 菜单',
  component: Menu,
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
    <div style={{ height: '1000px' }} >

      <Card title={RenderTitle('顶部导航菜单')} style={{ background: '#f2f5f8 ', }}  >
        <Menu>
          <MenuItem>Item1</MenuItem>
          <MenuItem>Item2</MenuItem>
          <MenuItem>Item3</MenuItem>
        </Menu>

      </Card>
      <Card title={RenderTitle('横向展开的菜单','type = horizontal')} style={{ background: '#f2f5f8 ', }}  >
        <Menu type='horizontal ' onClick={(e) => {
          console.log(e);
        }} defalutOpenSubMenu={['2']} style={{ width: '430px' }}  >
          <SubMenu title="Submenu1" >
            <MenuItem   >
              Item1
            </MenuItem>
            <MenuItem  >
              Item2
            </MenuItem>
            <MenuItem disabled >
              Item3
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu2" >
            <MenuItem   >
              Item1
            </MenuItem>
            <MenuItem disabled >
              Item2
            </MenuItem>
            <MenuItem>
              Item3
            </MenuItem>
            <MenuItem>
              Item4
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu3" >
            <MenuItem disabled  >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
          </SubMenu>
        </Menu>
      </Card>

      <Card title={RenderTitle('竖向展开的菜单','type = vertical')} 
      style={{ background: '#f2f5f8 ', height: 'fitContent'}} >
        <Menu type='vertical' defalutOpenSubMenu={['2']} style={{ width: '200px' }} >
          <SubMenu title="Submenu1" >
            <MenuItem disabled  >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
            <MenuItem>
              Item3
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu2" >
            <MenuItem disabled >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
            <MenuItem>
              Item3
            </MenuItem>
            <MenuItem>
              Item4
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu3" >
            <MenuItem disabled >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
          </SubMenu>
        </Menu>
        
      </Card>
      <Card title={RenderTitle('自定义icon','icon')} 
      style={{ background: '#f2f5f8 ',  height: 'fitContent'}} >
      <Menu  type='vertical' defalutOpenSubMenu={['2']} style={{ width: '200px'}} >
          <SubMenu title="Submenu1" icon={ <Icon icon={'hashtag'}  ></Icon>} >
            <MenuItem disabled  >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
            <MenuItem>
              Item3
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu2" icon={ <Icon icon={'file'} ></Icon>}>
            <MenuItem disabled >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
            <MenuItem>
              Item3
            </MenuItem>
            <MenuItem>
              Item4
            </MenuItem>
          </SubMenu>
          <SubMenu title="Submenu3" icon={ <Icon icon={'hashtag'}  ></Icon>}>
            <MenuItem disabled >
              Item1
            </MenuItem>
            <MenuItem>
              Item2
            </MenuItem>
          </SubMenu>
        </Menu>
      </Card>

    </div>
  )
}



export const Component = Template.bind({})




