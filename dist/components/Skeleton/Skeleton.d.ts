/// <reference types="react" />
import { styleType } from '../../utils/type';
export interface SkeletonProps extends styleType {
    /**
     * @row 条目数量
     */
    row?: number;
    /**
     * @width 条目宽度
     */
    width?: Array<number | string>;
    img?: boolean;
    /**
     * @loading 开关
     */
    loading?: boolean;
}
/**
 * 将加载中的数据用灰色占位
 * ### 引用方法
 *
 * ~~~js
 * import { Skeleton } from "@light3711/lightui"
 * ~~~
 */
declare const Skeleton: (props: any) => JSX.Element;
export default Skeleton;
