/// <reference types="react" />
import { defaultType, styleType } from '../../utils/type';
export interface BackTopProps extends styleType, Pick<defaultType, 'onClick' | 'children'> {
    /**
     * @visibilityHight 滚动到此参数值才会出现BackTop
     */
    visibilityHight?: number;
}
/**
 * 可一键返回顶部
 *
 * ### 引用方法
 *
 * ~~~js
 * import { BackTop } from "@light3711/lightui"
 * ~~~
 */
export declare const BackTop: {
    (props: BackTopProps): JSX.Element;
    defaultProps: {
        visibilityHight: number;
    };
};
