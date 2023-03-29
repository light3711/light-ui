/// <reference types="react" />
import { styleType } from '../../utils/type';
export interface ImgProps extends styleType {
    /**
     * @scr 图片数据
     */
    src?: {
        id: number;
        src: string;
    }[];
    onClose?: Function;
}
/**
 * 展示和预览图片
 * ### 引用方法
 *
 * ~~~js
 * import { Img } from "@light3711/lightui"
 * ~~~
 */
export declare const Img: (props: ImgProps) => JSX.Element;
