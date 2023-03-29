import { FC } from "react";
import { styleType } from "../../utils/type";
interface CarouselProps extends styleType {
    /**
     * @step 间隔时间
     */
    step?: number;
    animationStep?: number;
    children: any;
    /**
     * @autoplay 自动播放
     */
    autoplay?: boolean;
    /**
     * @dots 是否开启导航点
     */
    dots?: boolean;
    /**
     * @link 链接数组
     */
    link?: string[];
    /**
     * @btnDirection 开启左右控制点
     */
    btnDirection?: boolean;
    /**
     * @nextChange next控制按钮事件
     */
    nextChange?: Function;
    /**
     * @prevChange prev控制按钮事件
     */
    prevChange?: Function;
}
/**
 * 用于展示多张图片的循环播放，支持自动播放或用户手动切换
 * ### 引用方法
 *
 * ~~~js
 * import { Carousel } from "@light3711/lightui"
 * ~~~
 */
export declare const Carousel: FC<CarouselProps>;
export {};
