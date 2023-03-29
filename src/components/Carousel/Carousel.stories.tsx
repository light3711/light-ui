import React from "react";

import '../../style/index.scss'
import { Carousel } from "./Carousels";
import Button from "../Button";
import { useState } from "react";
import { Card } from "../Card/card";
import { RenderTitle } from "../../utils/renterTitle";
import png1 from './png/1.png'
import png2 from './png/2.png'
import png3 from './png/3.png'
import png4 from './png/4.png'
const data = [png1, png2, png3, png4]
export default {
  title: 'Carousel 走马灯 ',
  component: Carousel,
  argTypes: {
    backgroundColor: { control: 'color' },

  },
  parameters: {
    docs: {
      page: null
    }
  },
};
const datas = [
  'http://www.baidu.com',
  'http://www.bilibili.com',
  'https://github.com/light3711',
  'https://ant.design/index-cn'
]
const Template = (args: any) => {


  const useRender = (type) => {

    const [a, seta] = useState(false)
    const [h, seth] = useState(false)
    const [d, setd] = useState(false)
    let value;

    switch (type) {
      case 'a': value = RenderTitle('自动播放', '通过 autoplay 设置是否自动播放')
        break
      case 'h': value = RenderTitle('导航点', '通过 dots 设置是否开启')
        break
      case 'd': value = RenderTitle('切换按钮', '通过 btnDirection 设置是否开启')
        break
    }

    return (
      <Card title={value} >
        {type === 'a' && <Button style={{ marginBottom: '30px' }} onClick={() => seta(!a)} >开启/关闭自动播放</Button>}
        {type === 'h' && <Button style={{ marginBottom: '30px' }} onClick={() => seth(!h)} >导航点隐藏/显示</Button>}
        {type === 'd' && <Button style={{ marginBottom: '30px' }} onClick={() => setd(!d)} >左右按钮隐藏/显示</Button>}

        <div className='wrapper-class' style={{ width: '430px', height: '200px' }}>
          <Carousel  autoplay={a} dots={h} btnDirection={d}  >
            <div className='carouselImg' >1</div>
            <div className='carouselImg' >2</div>
            <div className='carouselImg' >3</div>
            <div className='carouselImg' >4</div>
          </Carousel>
        </div>
      </Card>
    )

  }

  return (
    <>
      {useRender('a')}
      {useRender('h')}
      {useRender('d')}
        <Card title={RenderTitle('全部展示','附带链接 link')}>
        <Carousel link={datas}  style={{ width: '430px' }} >
          <div className='carouselImg' ><img src={png1} style={{ width: '430px' }} alt="" /> </div>
          <div className='carouselImg' ><img src={png2} style={{ width: '430px' }} alt="" /> </div>
          <div className='carouselImg' ><img src={png3} style={{ width: '430px' }} alt="" /> </div>
          <div className='carouselImg' ><img src={png4} style={{ width: '430px' }} alt="" /> </div>
        </Carousel>
        </Card>
    </>
  )
}



export const Component = Template.bind({})


