import React, { forwardRef, PropsWithChildren, ReactElement, ReactText, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { styleType } from '../../utils/type';

 
export interface SkeletonProps extends styleType {
  /**
   * @row 条目数量
   */
    row?:number
    /**
     * @width 条目宽度
     */
    width?:Array<number | string>
    img?:boolean
    /**
     * @loading 开关
     */
    loading?:boolean
}
 
/**
 * 将加载中的数据用灰色占位
 * ### 引用方法
 * 
 * ~~~js
 * import { Skeleton } from "@light3711/lightui"
 * ~~~
 */
 
 const Skeleton = (props ) => {
    const { className, style, loading = true,   img, row, width = [], } = props;
  
    const cx = classNames(className);
  
    const lineHeight = useCallback(
      (i: number) => {
        if (width && width.length) {
          if (typeof width[i] === 'string') {
            return {
              width: width[i],
            };
          }
          if (typeof width[i] === 'number') {
            return {
              width: `${width[i]}px`,
            };
          }
        }
        return {};
      },
      [width]
    );
  
    return (
      <>
        {loading ? (
          <div className={cx} style={style}  >
            {img && <div className={`lig-skeleton-img`} />}
            <div className={`lig-skeleton-container`}>
              {row && new Array(row).fill('').map((r, i) => {
                return (
                  <div className={`lig-skeleton-line`} style={lineHeight(i)} key={i} />
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };
  
  export default Skeleton