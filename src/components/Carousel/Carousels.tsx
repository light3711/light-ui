import { useState } from "react";
import React, { FC, useEffect } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { styleType } from "../../utils/type";

interface CarouselProps extends styleType {
    /**
     * 间隔时间
     */
    step?: number,
    animationStep?: number
    children: any
    /**
     *   自动播放
     */
    autoplay?: boolean
    /**
     *  是否开启导航点
     */
    dots?: boolean
    /**
     *   链接数组
     */
    link?: string[]
    /**
     *  开启左右控制点
     */
    btnDirection?: boolean
    /**
     *   next控制按钮事件
     */
    nextChange?: Function
    /**
     * prev控制按钮事件
     */
    prevChange?: Function
}


/**
 * 用于展示多张图片的循环播放，支持自动播放或用户手动切换
 * ### 引用方法
 * 
 * ~~~js
 * import { Carousel } from "@light3711/lightui"
 * ~~~
 */

export const Carousel: FC<CarouselProps> = (props) => {

    const { step = 3000, animationStep = 1, children, link, className, dots = true, autoplay = true, btnDirection, prevChange, nextChange } = props
    const [current, setCurrent] = useState(0)
    const [animationSteps, setAnstep] = useState(1)
    const [steps, setSteps] = useState(step)
    const carouselcx = classNames('lig-carousel', className, {})
    var timeId: NodeJS.Timeout

    const _children = props.children ? props.children :
        [<div className='carouselImg' >1</div>,
        <div className='carouselImg' >2</div>,
        <div className='carouselImg' >3</div>,
        <div className='carouselImg' >4</div>]


    useEffect(() => {
        autoplay ? startCarousel() : nulls()
    })

    const startCarousel = () => {
        timeId = setTimeout(() => {
            handlerCarousel('')
        }, steps);
    }

    const handlerCarousel = (dir?: any) => {
        let direction = 1;
        if (dir === 'left') {
            direction = -1;
        }
        if (_children) {
            if (current % (_children.length + 1) !== _children.length && current >= 0) {

                step && setSteps(step)
                setCurrent(current + direction)
                animationStep && setAnstep(animationStep)
            }
        }
        stopCarousel()
    }

    const stopCarousel = () => {
        clearInterval(timeId);
    }

    const nulls = () => { }

    const handleTransitionEnd = () => {
        if (_children) {
            if (current % (_children.length + 1) === _children.length) {
                setAnstep(0)
                setSteps(step - (animationStep * 1000))
                setCurrent(0)
            } else if (current < 0) {
                setAnstep(0)
                setCurrent(_children.length - 1)
            }
        }
    }

    const getActive = (index: number) => {
        if (_children) {
            if (current === index || current === index + _children.length || current < 0 && index === _children.length - 1) {
                return 'active'
            }
            return ''
        }
    }

    const dotsClick = (index: number) => {
        setAnstep(animationStep)
        setCurrent(index)
        stopCarousel()
    }

    const renderDots = () => {
        return (
            <div className='carousel-footer '>
                <ul className='indicators-container'>
                    {_children.map((item: any, index: any) => {
                        let active = getActive(index)
                        return <li onClick={() => dotsClick(index)}
                            key={index}
                            className={`indicators-item ${active}`} ></li>
                    })}
                </ul>
            </div>
        )
    }
    const nextClick = () => {
        nextChange && nextChange(current)
        handlerCarousel()
    }
    const preClick = () => {
        prevChange && prevChange(current)
        handlerCarousel('left')
    }

    return (
        <div className={carouselcx} style={props.style}>
            <div className="carousel-body"
                onTransitionEnd={handleTransitionEnd}
                //在 CSS 完成过渡后修改 <div> 元素样式及文字
                style={{
                    transition: `transform ${animationSteps}s`,
                    width: `${(_children?.length + 2) * 100}%`,
                    transform: `translateX(${-100 / (_children?.length + 2) * (current + 1)}%)`
                }}
            >

                <div className="carousel-item"
                    style={{ width: `${100 / (_children?.length + 2)}%` }} key={'start'}
                > {_children && _children[_children?.length - 1]}</div>

                {_children?.map((item: any, index: number) => {
                    return (
                        link ? <a href={link[index]} key={index}>
                            <div className={'carousel-item'}
                                style={{ width: `${100 / (_children?.length + 2)}%` }}
                                key={index} >
                                {item}
                            </div>
                        </a>
                            :
                            <div className={'carousel-item'}
                                style={{ width: `${100 / (_children?.length + 2)}%` }}
                                key={index} >
                                {item}
                            </div>
                    )
                })}
                <div className={`carousel-item`}
                    style={{ width: `${100 / (_children?.length + 2)}%` }}
                    key={'end'} >{_children[0]}</div>
            </div>
            {dots ? renderDots() : null}
            {
                btnDirection && <div className="btn-container">
                    <div className="btn-direction pre" style={{ color: 'white' }} onClick={preClick}>
                        <Icon icon={'angle-left'}></Icon>
                    </div>
                    <div className="btn-direction next" style={{ color: 'white' }} onClick={nextClick}>
                        <Icon icon={'angle-right'}></Icon>

                    </div>
                </div>
            }



        </div>
    )
}

Carousel.defaultProps = {
    btnDirection: true

}