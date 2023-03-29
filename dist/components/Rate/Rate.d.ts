/// <reference types="react" />
import { defaultType, styleType } from '../../utils/type';
export interface RatateProp extends styleType, Pick<defaultType, 'children' | 'onClick'> {
    /**
     * @count 总分
     */
    count?: number;
    /**
     * @value 当前分数
     */
    value?: number;
    /**
     * @readOnly 只读模式
     */
    readOnly?: boolean;
}
/**
 *
 * 评分打星 ✨
 *
 * ### 引用方法
 *
 * ~~~js
 * import { Rate } from "@light3711/lightui"
 * ~~~
 */
export declare const Rate: (props: RatateProp) => JSX.Element;
